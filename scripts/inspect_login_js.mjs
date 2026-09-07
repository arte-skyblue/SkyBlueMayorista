async function inspectLoginPageJs() {
  const res = await fetch('https://app.ipn.com.ar/login.asp');
  const html = await res.text();
  console.log('Login HTML scripts:');
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const s of scripts) {
    console.log('\n--- SCRIPT BLOCK ---');
    console.log(s);
  }
}

inspectLoginPageJs().catch(console.error);
