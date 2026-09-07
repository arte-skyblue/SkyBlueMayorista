const API_KEY = process.env.GEMINI_API_KEY || '';
const PROJECT_ID = '14522040208529830513';

async function listScreens() {
  const res = await fetch('https://stitch.googleapis.com/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'list_screens',
        arguments: {
          projectId: PROJECT_ID
        }
      }
    })
  });

  const data = await res.json();
  console.log('Screens in Stitch Project:', JSON.stringify(data, null, 2));
}

listScreens().catch(console.error);
