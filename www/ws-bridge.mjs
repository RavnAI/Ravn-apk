import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8787 });
const clients = new Set();

function broadcast(obj) {
  const s = JSON.stringify(obj);
  for (const c of clients) if (c.readyState === 1) c.send(s);
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type:'system', text:'WS tilkoblet' }));
  ws.on('message', (d) => {
    let msg;
    try { msg = JSON.parse(d.toString()); }
    catch { msg = { type:'chat', from:'unknown', text:d.toString() }; }
    broadcast(msg);   // echo/broadcast til alle klienter
  });
});

console.log('✅ WS bridge på ws://127.0.0.1:8787');
