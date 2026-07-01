import { Helmet } from 'react-helmet-async'
import { useState, useMemo } from 'react'
import { matches, sports } from '../data/matches.js'
import MatchCard from '../components/MatchCard.jsx'
import MatchesSchema from '../components/MatchesSchema.jsx'

export default function Schedule() {
  const [filter, setFilter] = useState('all')
  const [status, setStatus] = useState('all')
  const list = useMemo(()=> matches
    .filter(m => filter==='all' || m.sport===filter)
    .filter(m => status==='all' || m.status===status)
    .sort((a,b)=> new Date(a.startDate) - new Date(b.startDate)),
  [filter,status])
  return (
    <>
      <Helmet>
        <title>Live Sports Schedule Today — All Matches & Times | StreamBlitz</title>
        <meta name="description" content="Complete live sports schedule — football, NBA, cricket, tennis, UFC, F1. See what's live now and upcoming today in HD, free."/>
      </Helmet>
      <MatchesSchema list={list}/>
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-4">
        <h1 className="font-display text-5xl md:text-6xl">Live Sports <span className="text-heat">Schedule</span></h1>
        <p className="text-textSecondary mt-2">Every match, every time, every channel — all free in HD.</p>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <Chip active={filter==='all'} onClick={()=>setFilter('all')}>All Sports</Chip>
          {sports.map(s=><Chip key={s.slug} active={filter===s.slug} onClick={()=>setFilter(s.slug)}>{s.emoji} {s.name}</Chip>)}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {['all','live','upcoming','finished'].map(x=><Chip key={x} active={status===x} onClick={()=>setStatus(x)}>{x.toUpperCase()}</Chip>)}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m,i)=><MatchCard key={m.id} m={m} index={i}/>)}
        </div>
      </section>
    </>
  )
}
function Chip({active,onClick,children}) {
  return <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${active?'bg-heat border-transparent text-white':'bg-surface2 border-borderc text-textSecondary hover:text-white hover:border-accent'}`}>{children}</button>
}
