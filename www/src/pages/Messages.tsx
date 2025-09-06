import { useEffect, useMemo, useState } from 'react'
import { RavnWS } from '../lib/ws'

type Msg = { id: number, from: string, text: string, ts: number }

export default function Messages() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id:1, from:'N13', text:'WebSocket-klient aktiv. Venter på 7B…', ts: Date.now() },
  ])
  const [text, setText] = useState('')
  const [status, setStatus] = useState<'connecting'|'open'|'closed'|'error'>('connecting')

  const ws = useMemo(() => new RavnWS('ws://127.0.0.1:8787'), [])

  useEffect(() => {
    ws.setHandlers((data) => {
      if (data?.type === 'chat') {
        setMsgs(m => [...m, { id: Date.now(), from: data.from || '7B', text: data.text || '', ts: Date.now() }])
      } else if (data?.type === 'system') {
        setMsgs(m => [...m, { id: Date.now(), from: 'System', text: data.text || JSON.stringify(data), ts: Date.now() }])
      }
    }, setStatus)
    ws.connect()
  }, [ws])

  const send = () => {
    if (!text.trim()) return
    const mine = { id: Date.now(), from: 'Meg', text, ts: Date.now() }
    setMsgs(m => [...m, mine])
    ws.send({ type: 'chat', from: 'Client', text })
    setText('')
  }

  const badge = {
    connecting: 'bg-yellow-500/20 text-yellow-400',
    open: 'bg-green-500/20 text-green-400',
    closed: 'bg-white/10 text-white/70',
    error: 'bg-red-500/20 text-red-400',
  }[status]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Meldinger (WS)</h2>
        <span className={`badge ${badge}`}>WS: {status}</span>
      </div>

      <div className="space-y-2 max-h-[50vh] overflow-auto pr-1">
        {msgs.map(m => (
          <div key={m.id} className={`flex ${m.from==='Meg' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-2xl ${m.from==='Meg' ? 'bg-primary' : 'bg-white/10'}`}>
              <div className="text-xs opacity-70">{m.from}</div>
              <div>{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 rounded-xl bg-white/10 px-3 py-2 outline-none"
          placeholder="Skriv en melding til 7B…"
          value={text}
          onChange={e=>setText(e.target.value)}
        />
        <button className="btn" onClick={send}>Send</button>
      </div>

      <p className="mt-2 text-xs text-white/60">
        * Live WS mot <code>ws://127.0.0.1:8787</code>. 7B/Termux kan sende meldinger (type: "chat").
      </p>
    </div>
  )
}
