const API_KEY = process.env.GEMINI_API_KEY || '';

async function listProjects() {
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
        name: 'list_projects',
        arguments: {}
      }
    })
  });

  const data = await res.json();
  console.log('List Projects Result:', JSON.stringify(data, null, 2));
}

listProjects().catch(console.error);
