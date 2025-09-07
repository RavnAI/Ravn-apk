import { useState } from 'react'

export default function Tips() {
  const [phone, setPhone] = useState('')
  const [copied, setCopied] = useState(false)

  const inviteLink = `${location.origin}/?ref=${btoa('ravn-invite')}`

  const copy = async () => {
    await navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(()=>setCopied(false), 1200)
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Tips en venn</h2>
      <p className="text-white/80">Del lenken under for å invitere venner. I fullversjonen belønnes du med K-token.</p>
      <div className="mt-3 flex gap-2 items-center">
        <input className="flex-1 rounded-xl bg-white/10 px-3 py-2 outline-none" value={inviteLink} readOnly />
        <button className="btn" onClick={copy}>{copied ? 'Kopiert!' : 'Kopier'}</button>
      </div>

      <div className="mt-6">
        <label className="text-sm text-white/70">Send SMS-invitasjon (demo, lokal):</label>
        <div className="mt-2 flex gap-2">
          <input className="flex-1 rounded-xl bg-white/10 px-3 py-2 outline-none" placeholder="+47…" value={phone} onChange={e=>setPhone(e.target.value)} />
          <a className="btn" href={`sms:${phone}?body=${encodeURIComponent('Bli med i Ravn – offline AI-kommunikasjon: ' + inviteLink)}`}>Åpne SMS</a>
        </div>
      </div>
    </div>
  )
}
