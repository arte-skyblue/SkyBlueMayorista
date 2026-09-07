const STITCH_API_KEY = process.env.GEMINI_API_KEY || '';

async function testStitchEndpoints() {
  const endpoints = [
    'https://stitch.withgoogle.com/api/v1/projects',
    'https://stitch.dev/api/v1/projects',
    'https://api.stitch.dev/v1/projects',
    'https://stitch.design/api/v1/projects',
    'https://stitch.googleapis.com/v1/projects'
  ];

  console.log('Testing Stitch API key against potential endpoints...');

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        headers: {
          'Authorization': `Bearer ${STITCH_API_KEY}`,
          'x-goog-api-key': STITCH_API_KEY,
          'Content-Type': 'application/json'
        }
      });
      console.log(`Endpoint: ${ep} -> Status: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log(`Response snippet: ${text.slice(0, 150)}`);
    } catch (err) {
      console.log(`Endpoint: ${ep} -> Error: ${err.message}`);
    }
  }
}

testStitchEndpoints().catch(console.error);
