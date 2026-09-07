import { IPNSession } from './ipn_session.mjs';
import * as fs from 'fs';

async function stepThroughNotifications() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');
  console.log('Login done.');

  let currentRes = await session.fetch('/notifications.asp');
  let currentHtml = await currentRes.text();

  let loopCount = 0;
  while (loopCount < 5) {
    loopCount++;
    console.log(`\n--- Notification Step ${loopCount} ---`);
    console.log('HTML length:', currentHtml.length);

    // check if we are still on notifications
    const notifIdMatch = currentHtml.match(/name="notificationID"\s+id="[^"]+"\s+value="([^"]+)"/i);
    const notifNameMatch = currentHtml.match(/name="notificationName"\s+id="[^"]+"\s+value="([^"]+)"/i);

    if (!notifIdMatch) {
      console.log('No notificationID found, reached destination page!');
      fs.writeFileSync('data/ipn_dump/after_notifications.html', currentHtml);
      break;
    }

    const notifId = notifIdMatch[1];
    const notifName = notifNameMatch ? notifNameMatch[1] : '';
    console.log(`Dismissing notification: ${notifId} - ${notifName.trim()}`);

    const params = new URLSearchParams();
    params.append('doAction', '1'); // 1 = Continuar
    params.append('notificationID', notifId);
    params.append('notificationName', notifName);
    params.append('lastViewTimeSpend', '00:00:05');

    currentRes = await session.fetch('/notifications.asp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://app.ipn.com.ar/notifications.asp'
      },
      body: params.toString()
    });

    currentHtml = await currentRes.text();
    console.log('Response URL status:', currentRes.status);
  }

  // Now try fetching index.asp or default.asp
  const indexRes = await session.fetch('/index.asp');
  const indexHtml = await indexRes.text();
  fs.writeFileSync('data/ipn_dump/index_after_notif.html', indexHtml);
  console.log('index.asp length:', indexHtml.length);
}

stepThroughNotifications().catch(console.error);
