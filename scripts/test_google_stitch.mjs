const API_KEY = process.env.GEMINI_API_KEY || '';

async function testGoogleStitchEndpoints() {
  const urls = [
    'https://stitch.withgoogle.com/api/projects',
    'https://stitch.withgoogle.com/_/api/projects',
    'https://stitch.googleapis.com/v1alpha/projects?key=' + API_KEY,
    'https://stitch.googleapis.com/v1/projects?key=' + API_KEY
  ];

  for (const u of urls) {
    try {
      const res = await fetch(u, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'x-goog-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      });
      console.log(`URL: ${u} -> Status: ${res.status}`);
      const t = await res.text();
      console.log(`Body: ${t.slice(0, 200)}\n`);
    } catch (e) {
      console.log(`URL: ${u} -> Error: ${e.message}\n`);
    }
  }
}

testGoogleStitchEndpoints().catch(console.error);
