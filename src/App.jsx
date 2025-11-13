import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Play, Check, Star, Mail, LogIn, LogOut, Shield, Video } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Navbar({ authed, onLogout, onOpenAuth }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-400 to-orange-400 grid place-items-center text-white"><Video size={18}/></div>
          <span className="font-semibold text-emerald-900">CutCraft Studio</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-emerald-800">
          <a href="#services" className="hover:text-emerald-600">Services</a>
          <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
          <a href="#testimonials" className="hover:text-emerald-600">Testimonials</a>
          <a href="#contact" className="hover:text-emerald-600">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          {authed ? (
            <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"><LogOut size={16}/> Logout</button>
          ) : (
            <button onClick={onOpenAuth} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-emerald-300 text-emerald-800 hover:bg-emerald-50"><LogIn size={16}/> Login</button>
          )}
          <button className="md:hidden p-2 rounded-md border border-emerald-200"><Menu size={18}/></button>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="pt-28 bg-gradient-to-b from-emerald-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="text-4xl md:text-5xl font-extrabold text-emerald-900 leading-tight">
            Video edits that turn views into value
          </motion.h1>
          <p className="mt-4 text-emerald-800/80">Clean, conversion-focused editing for brands, creators, and startups. From snappy shorts to cinematic ads, we cut what matters.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#pricing" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"><Play size={18}/> Explore Plans</a>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-orange-300 text-orange-700 hover:bg-orange-50"><Mail size={18}/> Get a Quote</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-emerald-700">
            <div className="inline-flex items-center gap-2"><Shield size={16} className="text-emerald-500"/> NDA available</div>
            <div className="inline-flex items-center gap-2"><Star size={16} className="text-orange-500"/> 4.9 average rating</div>
          </div>
        </div>
        <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{delay:0.2}} className="relative">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-emerald-200 to-orange-200 shadow-lg"/>
          <div className="absolute -bottom-5 -right-5 bg-white/80 backdrop-blur px-4 py-3 rounded-lg shadow border border-emerald-100 text-emerald-900">
            <div className="text-xs uppercase tracking-wider text-emerald-600">Turnaround</div>
            <div className="font-semibold">48 hours</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Pricing() {
  const [tiers, setTiers] = useState([])
  useEffect(() => {
    fetch(`${API}/pricing`).then(r=>r.json()).then(setTiers)
  }, [])

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-900 text-center">Straightforward pricing</h2>
        <p className="text-emerald-700/80 text-center mt-2">Pick a plan that fits your content goals.</p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div key={i} className="rounded-xl border border-emerald-100 p-6 shadow-sm hover:shadow-md transition bg-gradient-to-b from-emerald-50 to-white">
              <div className="text-sm uppercase tracking-wider text-emerald-700">{t.name}</div>
              <div className="mt-2 text-4xl font-extrabold text-emerald-900">${t.price}</div>
              <p className="mt-2 text-emerald-700/80">{t.description}</p>
              <ul className="mt-4 space-y-2">
                {t.features?.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-emerald-800"><Check className="text-emerald-500" size={18}/> {f}</li>
                ))}
              </ul>
              <button className="mt-6 w-full px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">Choose {t.name}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const [items, setItems] = useState([])
  useEffect(() => { fetch(`${API}/testimonials`).then(r=>r.json()).then(setItems) }, [])

  return (
    <section id="testimonials" className="py-20 bg-emerald-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-900 text-center">What clients say</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="rounded-xl bg-white p-6 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-300 to-emerald-300"/>
                <div>
                  <div className="font-semibold text-emerald-900">{t.name}</div>
                  <div className="text-sm text-emerald-700/80">{t.role}</div>
                </div>
              </div>
              <p className="mt-4 text-emerald-800">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: ''})
  const [status, setStatus] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${API}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.ok) setStatus('sent')
      else setStatus('error')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-emerald-900 text-center">Tell us about your project</h2>
        <form onSubmit={submit} className="mt-8 grid gap-4">
          <input className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Your name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input type="email" className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
          <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="What do you need edited?" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
          <button className="px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 inline-flex items-center gap-2"><Mail size={18}/> Send message</button>
          {status === 'sent' && <div className="text-emerald-700">Thanks! We’ll get back within 24h.</div>}
          {status === 'error' && <div className="text-orange-700">Something went wrong. Try again.</div>}
        </form>
      </div>
    </section>
  )
}

function AuthSheet({ open, onClose, onAuthed }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    const form = new URLSearchParams(); form.append('username', email); form.append('password', password)
    const url = mode === 'login' ? `${API}/auth/login` : `${API}/auth/register`
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form })
      const data = await res.json()
      if (data.access_token) { localStorage.setItem('token', data.access_token); onAuthed(); onClose() }
    } finally { setLoading(false) }
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur grid place-items-center">
      <div className="w-full max-w-md bg-white rounded-xl p-6 border border-emerald-100 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-emerald-900">{mode === 'login' ? 'Login' : 'Create account'}</h3>
        </div>
        <form onSubmit={submit} className="mt-4 grid gap-3">
          <input type="email" placeholder="Email" className="px-4 py-3 rounded-lg border border-emerald-200" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="px-4 py-3 rounded-lg border border-emerald-200" value={password} onChange={e=>setPassword(e.target.value)} />
          <button disabled={loading} className="mt-2 px-4 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 inline-flex items-center gap-2"><LogIn size={18}/> {loading ? 'Please wait…' : (mode==='login'?'Login':'Register')}</button>
        </form>
        <div className="mt-3 text-sm text-emerald-700">
          {mode==='login' ? (
            <button onClick={()=>setMode('register')} className="underline">New here? Create an account</button>
          ) : (
            <button onClick={()=>setMode('login')} className="underline">Have an account? Log in</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [authOpen, setAuthOpen] = useState(false)
  const [authed, setAuthed] = useState(!!localStorage.getItem('token'))
  const logout = () => { localStorage.removeItem('token'); setAuthed(false) }

  return (
    <div className="min-h-screen bg-white text-emerald-900">
      <Navbar authed={authed} onLogout={logout} onOpenAuth={()=>setAuthOpen(true)} />
      <Hero />
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {["Short-form", "Long-form", "Ads"].map((t,i)=>(
            <div key={i} className="rounded-xl border border-emerald-100 p-6 shadow-sm bg-gradient-to-b from-white to-emerald-50">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-emerald-400 mb-4"/>
              <div className="font-semibold">{t} Editing</div>
              <p className="text-emerald-700/80 mt-2">Clean cuts, seamless pacing, tasteful motion and color work, delivered fast.</p>
            </div>
          ))}
        </div>
      </section>
      <Pricing />
      <Testimonials />
      <Contact />
      <footer className="py-10 text-center text-emerald-700/80 bg-emerald-50">© {new Date().getFullYear()} CutCraft Studio · Soft green + orange vibes</footer>
      <AuthSheet open={authOpen} onClose={()=>setAuthOpen(false)} onAuthed={()=>setAuthed(true)} />
    </div>
  )
}
