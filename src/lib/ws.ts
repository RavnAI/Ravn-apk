type MsgHandler = (msg: any) => void
type StatusHandler = (status: 'connecting'|'open'|'closed'|'error') => void

export class RavnWS {
  private url: string
  private ws: WebSocket | null = null
  private reconnectMs = 1500
  private outbox: any[] = []
  private onMsg: MsgHandler = () => {}
  private onStatus: StatusHandler = () => {}
  private aliveTimer: number | null = null

  constructor(url: string) { this.url = url }

  setHandlers(onMsg: MsgHandler, onStatus?: StatusHandler) {
    this.onMsg = onMsg
    if (onStatus) this.onStatus = onStatus
  }

  connect() {
    this.onStatus('connecting')
    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      this.onStatus('open')
      this.outbox.forEach(m => this.ws?.send(JSON.stringify(m)))
      this.outbox = []
      this.pingLoop()
    }

    this.ws.onmessage = (e) => {
      try { this.onMsg(JSON.parse(e.data)) }
      catch { this.onMsg({ type: 'raw', data: e.data }) }
    }

    this.ws.onerror = () => this.onStatus('error')

    this.ws.onclose = () => {
      this.onStatus('closed')
      if (this.aliveTimer) window.clearTimeout(this.aliveTimer)
      setTimeout(() => this.connect(), this.reconnectMs)
    }
  }

  send(message: any) {
    const payload = { ts: Date.now(), ...message }
    if (this.ws && this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(payload))
    else this.outbox.push(payload)
  }

  private pingLoop() {
    if (this.aliveTimer) window.clearTimeout(this.aliveTimer)
    this.aliveTimer = window.setTimeout(() => {
      this.send({ type: 'ping' })
      this.pingLoop()
    }, 15000)
  }
}
