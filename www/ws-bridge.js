const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8787 })
const clients = new Set()
function broadcast(obj){ const s=JSON.stringify(obj); for (const c of clients) if(c.readyState===1) c.send(s) }
wss.on('connection', (ws) => {
  clients.add(ws)
  ws.send(JSON.stringify({ type:'system', text:'WS tilkoblet' }))
  ws.on('message', (d) => { try { broadcast(JSON.parse(d.toString())) } catch { ws.send(JSON.stringify({type:'system',text:'Ugyldig JSON'})) } })
  ws.on('close', () => clients.delete(ws))
})
console.log('Ravn WS-bridge på ws://127.0.0.1:8787')
