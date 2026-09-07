import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';

async function exploreCompany() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');
  
  // dismiss notifs if needed
  let res = await session.fetch('/notifications.asp');
  let html = await res.text();
  let loop = 0;
  while (loop < 5) {
    loop++;
    const notifIdMatch = html.match(/name="notificationID"\s+id="[^"]+"\s+value="([^"]+)"/i);
    const notifNameMatch = html.match(/name="notificationName"\s+id="[^"]+"\s+value="([^"]+)"/i);
    if (!notifIdMatch) break;
    const params = new URLSearchParams();
    params.append('doAction', '1');
    params.append('notificationID', notifIdMatch[1]);
    params.append('notificationName', notifNameMatch ? notifNameMatch[1] : '');
    params.append('lastViewTimeSpend', '00:00:05');
    res = await session.fetch('/notifications.asp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });
    html = await res.text();
  }

  // Fetch defaultSelectedCompany.asp
  const compRes = await session.fetch('/defaultSelectedCompany.asp');
  const compHtml = await compRes.text();
  fs.writeFileSync('data/ipn_dump/defaultSelectedCompany.html', compHtml);
  console.log('defaultSelectedCompany.asp saved. Length:', compHtml.length);

  // Extract form/links
  const links = compHtml.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi);
  for (const l of links) {
    console.log('Company page link:', l[1], '-->', l[2].replace(/<[^>]+>/g, '').trim());
  }

  const forms = compHtml.match(/<form[\s\S]*?<\/form>/gi) || [];
  console.log('Forms on company page:', forms.length);
  for (const f of forms) {
    console.log(f);
  }
}

exploreCompany().catch(console.error);
