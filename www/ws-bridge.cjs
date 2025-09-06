// ws-bridge.cjs
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8787 });
console.log("✅ WebSocket-bro kjører på ws://127.0.0.1:8787");

wss.on('connection', (ws) => {
  console.log("🔌 Ny klient koblet til");
  ws.on('message', (msg) => {
    console.log("📩 Melding mottatt:", msg.toString());
    // Echo tilbake
    ws.send(`Echo fra ws-bridge: ${msg}`);
  });
});
