const API_KEY = process.env.GEMINI_API_KEY || '';

async function checkOurProject() {
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
  const projects = data.result?.structuredContent?.projects || [];
  console.log(`Total projects in Stitch account: ${projects.length}`);

  const ourProject = projects.find(p => p.name.includes('14522040208529830513') || p.title.includes('SkyBlue'));
  console.log('Our SkyBlue Project in Stitch:', JSON.stringify(ourProject, null, 2));
}

checkOurProject().catch(console.error);
