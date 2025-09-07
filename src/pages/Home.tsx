export default function Home() {
  const isOnline = navigator.onLine
  return (
    <div className="grid gap-6">
      <section className="card">
        <h1 className="text-2xl font-semibold">Ravn • Offline-first AI-kommunikasjon</h1>
        <p className="mt-2 text-white/80">
          Meldinger og tale som fungerer selv uten mobilnett. Fallback via Bluetooth, WiFi Direct, VHF/DAB. 
          Integrert AI-assistent og K-token økonomi.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="badge">{isOnline ? 'Online' : 'Offline'}</span>
          <button className="btn" onClick={() => (window as any).__ravnInstall?.()}>Installer som app</button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold">Meldinger</h3>
          <p className="text-white/70">Kryptert chat med offline fallback.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Tale</h3>
          <p className="text-white/70">Direkte tale node-til-node når nettet er nede.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">K-token</h3>
          <p className="text-white/70">1 mrd tokens • koblet til 10% av konsernet.</p>
        </div>
      </section>
    </div>
  )
}
