import { createServer } from 'vite';

async function testVite() {
  const server = await createServer({
    server: { middlewareMode: true }
  });

  try {
    const mod = await server.ssrLoadModule('/src/App.jsx');
    console.log('App.jsx loaded successfully!', Object.keys(mod));
    const React = await server.ssrLoadModule('react');
    const ReactDOMServer = await server.ssrLoadModule('react-dom/server');
    const html = ReactDOMServer.renderToString(React.createElement(mod.default));
    console.log('HTML rendered cleanly, length:', html.length);
  } catch (e) {
    console.error('SSR ERROR ENCOUNTERED:', e);
  } finally {
    await server.close();
  }
}

testVite();
