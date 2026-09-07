async function inspectFormTag() {
  const res = await fetch('https://app.ipn.com.ar/login.asp');
  const html = await res.text();
  const forms = html.match(/<form[^>]*>([\s\S]*?)<\/form>/gi) || [];
  for (const f of forms) {
    console.log('\n--- FORM TAG ---');
    console.log(f.slice(0, 500));
  }
}

inspectFormTag().catch(console.error);
