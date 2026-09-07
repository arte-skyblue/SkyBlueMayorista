const API_KEY = process.env.GEMINI_API_KEY || '';

async function testMcpDirect() {
  console.log('Testing direct JSON-RPC to Stitch MCP endpoint...');
  try {
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
          name: 'create_project',
          arguments: {
            title: 'SkyBlue ERP Enterprise'
          }
        }
      })
    });

    console.log('Status:', res.status, res.statusText);
    const data = await res.text();
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testMcpDirect().catch(console.error);
