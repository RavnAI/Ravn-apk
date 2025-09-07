import { useEffect, useRef, useState } from 'react'

export default function Voice() {
  const [recording, setRecording] = useState(false)
  const [chunks, setChunks] = useState<Blob[]>([])
  const mediaRef = useRef<MediaRecorder | null>(null)
  const audioUrl = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (audioUrl.current) URL.revokeObjectURL(audioUrl.current)
    }
  }, [])

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const rec = new MediaRecorder(stream)
    const c: Blob[] = []
    rec.ondataavailable = e => c.push(e.data)
    rec.onstop = () => setChunks(c.slice())
    rec.start()
    mediaRef.current = rec
    setRecording(true)
  }

  const stop = () => {
    mediaRef.current?.stop()
    setRecording(false)
  }

  const makeUrl = () => {
    const blob = new Blob(chunks, { type: 'audio/webm' })
    audioUrl.current = URL.createObjectURL(blob)
    return audioUrl.current
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Tale (demo)</h2>
      <div className="flex items-center gap-3">
        {!recording ? <button className="btn" onClick={start}>Start opptak</button> : <button className="btn" onClick={stop}>Stopp</button>}
        <span className="badge">{recording ? 'Opptak pågår' : 'Klar'}</span>
      </div>
      {chunks.length>0 && (
        <div className="mt-4">
          <audio controls src={makeUrl()} />
          <p className="text-xs text-white/60 mt-1">* Lokalt opptak (demo). Distribusjon over mesh/radio kan kobles på.</p>
        </div>
      )}
    </div>
  )
}
