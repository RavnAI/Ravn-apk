import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Messages from './pages/Messages'
import Voice from './pages/Voice'
import Tips from './pages/Tips'

export default function App() {
  const loc = useLocation()
  return (
    <div className="min-h-screen bg-ink text-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-ink/70 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-xl bg-card shadow-soft relative">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primary rotate-0 clip-path-k" />
            </span>
            <span className="font-semibold tracking-wide">Ravn</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link className={`px-3 py-1 rounded-full ${loc.pathname==='/'?'bg-white/10':''}`} to="/">Hjem</Link>
            <Link className={`px-3 py-1 rounded-full ${loc.pathname.startsWith('/messages')?'bg-white/10':''}`} to="/messages">Meldinger</Link>
            <Link className={`px-3 py-1 rounded-full ${loc.pathname.startsWith('/voice')?'bg-white/10':''}`} to="/voice">Tale</Link>
            <Link className={`px-3 py-1 rounded-full ${loc.pathname.startsWith('/tips')?'bg-white/10':''}`} to="/tips">Tips en venn</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Norvegen • Ravn • K-token
      </footer>
      <style>{`
        .clip-path-k { 
          clip-path: polygon(35% 0, 55% 0, 55% 45%, 85% 20%, 100% 35%, 65% 55%, 100% 80%, 85% 95%, 55% 70%, 55% 100%, 35% 100%, 35% 55%, 15% 55%, 15% 45%, 35% 45%);
        }
      `}</style>
    </div>
  )
}
