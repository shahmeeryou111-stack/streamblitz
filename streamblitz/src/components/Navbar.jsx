import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Zap, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { sports } from '../data/matches.js'

export function Logo({ className='' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display text-3xl leading-none logo-glow ${className}`}>
      <Zap className="w-6 h-6 text-accent" fill="#ff3b3b" />
      <span className="text-white">STREAM</span>
      <span className="text-heat">BLITZ</span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const submit = (e) => { e.preventDefault(); if (q.trim()) { nav(`/search?q=${encodeURIComponent(q)}`); setOpen(false) } }
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-bg/85 border-b border-borderc">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <NavLink to="/" end className={({isActive})=>`px-3 py-2 rounded-md ${isActive?'text-accent':'text-textPrimary hover:text-accent'}`}>Home</NavLink>
          <NavLink to="/schedule" className={({isActive})=>`px-3 py-2 rounded-md ${isActive?'text-accent':'text-textPrimary hover:text-accent'}`}>Schedule</NavLink>
          {sports.map(s => (
            <NavLink key={s.slug} to={`/sport/${s.slug}`} className={({isActive})=>`px-3 py-2 rounded-md ${isActive?'text-accent':'text-textSecondary hover:text-accent'}`}>{s.name}</NavLink>
          ))}
        </nav>
        <form onSubmit={submit} className="hidden md:flex items-center bg-surface2 border border-borderc rounded-lg px-3 h-9 w-64">
          <Search className="w-4 h-4 text-textMuted" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search matches, teams…" className="bg-transparent outline-none px-2 text-sm w-full placeholder:text-textMuted"/>
        </form>
        <button className="lg:hidden text-textPrimary" onClick={()=>setOpen(!open)} aria-label="Menu">
          {open ? <X/> : <Menu/>}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-borderc px-4 py-4 space-y-2 bg-surface1">
          <form onSubmit={submit} className="flex items-center bg-surface2 border border-borderc rounded-lg px-3 h-10">
            <Search className="w-4 h-4 text-textMuted" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" className="bg-transparent outline-none px-2 text-sm w-full"/>
          </form>
          <NavLink onClick={()=>setOpen(false)} to="/" end className="block py-2">Home</NavLink>
          <NavLink onClick={()=>setOpen(false)} to="/schedule" className="block py-2">Schedule</NavLink>
          {sports.map(s => (
            <NavLink key={s.slug} onClick={()=>setOpen(false)} to={`/sport/${s.slug}`} className="block py-2 text-textSecondary">{s.emoji} {s.name}</NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
