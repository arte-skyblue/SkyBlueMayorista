import { IPNSession } from './ipn_session.mjs';
import fs from 'fs';
import path from 'path';

async function scrapeFullCatalog() {
  const session = new IPNSession();
  await session.login('46792-juli', 'chicha1992');

  // Dismiss notifications
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

  // Select company 1
  const compParams = new URLSearchParams();
  compParams.append('companyID', '1');
  compParams.append('companyName', 'DANIEL ALEJANDRO GRASSO');
  compParams.append('doAction', '1');
  await session.fetch('/defaultSelectedCompany.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: compParams.toString()
  });

  // Let's inspect how the products search form is structured
  const searchFormRes = await session.fetch('/control/products/default.asp');
  const searchFormHtml = await searchFormRes.text();
  
  // Find all input names in the search form
  const inputMatches = searchFormHtml.matchAll(/<input[^>]+name="([^"]+)"[^>]*>/gi);
  const inputNames = Array.from(inputMatches, m => m[1]);
  console.log('Search form inputs:', Array.from(new Set(inputNames)));

  // Submit search for all active products
  const postParams = new URLSearchParams();
  postParams.append('doAction', '1');
  postParams.append('action', 'search');
  postParams.append('quickSearch', '');
  postParams.append('productCode', '');
  postParams.append('trademarkID', '0');
  postParams.append('seasonID', '0');
  postParams.append('productTypeID', '0');
  postParams.append('categoryID', '0');
  postParams.append('materialID', '0');
  postParams.append('lineID', '0');
  postParams.append('providerID', '0');
  postParams.append('productStatusID', '1'); // Active
  postParams.append('viewOnlyStock', '0');
  postParams.append('resultsPerPage', '500');

  const resultsRes = await session.fetch('/control/products/default.asp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: postParams.toString()
  });

  const resultsHtml = await resultsRes.text();
  console.log('Search results HTML size:', resultsHtml.length);
  fs.writeFileSync('data/real_ipn_export/products_search_results.html', resultsHtml);

  // Check product links e.g. /control/products/edit.asp?productID=... or details.asp
  const productLinks = resultsHtml.match(/\/control\/products\/(?:edit|details|view)\.asp\?productID=\d+/gi) || [];
  console.log('Found product links in search results:', productLinks.length);
  console.log('Sample product links:', productLinks.slice(0, 10));
}

scrapeFullCatalog().catch(console.error);
