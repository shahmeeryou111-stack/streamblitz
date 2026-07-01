import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { Play, Radio, Volume2, Maximize2, Settings, Share2, Heart, Zap, Eye } from 'lucide-react'
import { getMatchBySlug, matches } from '../data/matches.js'
import MatchCard from '../components/MatchCard.jsx'

export default function Match() {
  const { slug } = useParams()
  const m = getMatchBySlug(slug)
  const [playing, setPlaying] = useState(false)
  const [quality, setQuality] = useState('1080p')
  useEffect(()=>{ setPlaying(false) }, [slug])
  if (!m) return <Navigate to="/" replace/>
  const related = matches.filter(x=>x.sport===m.sport && x.id!==m.id).slice(0,4)
  const live = m.status==='live'

  return (
    <>
      <Helmet>
        <title>{`${m.home} vs ${m.away} Live Stream Free — ${m.competition} | StreamBlitz`}</title>
        <meta name="description" content={`Watch ${m.home} vs ${m.away} live stream free in HD. ${m.competition} at ${m.venue} — no sign up, instant HD access on StreamBlitz.`}/>
        <script type="application/ld+json">{JSON.stringify({
          '@context':'https://schema.org','@type':'SportsEvent',
          name:`${m.home} vs ${m.away} — ${m.competition}`,
          sport:m.sport, startDate:m.startDate,
          location:{'@type':'Place',name:m.venue},
          competitor:[{'@type':'SportsTeam',name:m.home},{'@type':'SportsTeam',name:m.away}],
          url:`https://streamblitz.tv/#/match/${m.slug}`
        })}</script>
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="text-textSecondary text-sm mb-3"><Link to="/" className="hover:text-accent">Home</Link> / <Link to={`/sport/${m.sport}`} className="hover:text-accent capitalize">{m.sport}</Link> / <span className="text-textPrimary">{m.home} vs {m.away}</span></div>
        <div className="flex items-center gap-3 mb-2">
          {live && <span className="chip chip-live"><span className="live-dot animate-pulseLive"/> LIVE</span>}
          <span className="chip chip-hd">HD</span>
          <span className="text-textSecondary text-sm">{m.competition}</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl leading-none">
          <span>{m.home}</span> <span className="text-heat">VS</span> <span>{m.away}</span>
        </h1>
        <div className="text-textSecondary mt-2 text-sm">{format(new Date(m.startDate),'EEEE d MMMM • HH:mm')} · {m.venue}</div>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          {/* Player */}
          <div className="player-shell">
            {!playing ? (
              <motion.button onClick={()=>{setPlaying(true); toast.success(`Streaming ${m.home} vs ${m.away} in ${quality}`)}} whileHover={{scale:1.05}} whileTap={{scale:.95}}
                className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-heat flex items-center justify-center shadow-glow">
                <Play size={36} className="text-white ml-1" fill="white"/>
              </motion.button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="text-accent animate-pulseLive"/>
                  <span className="font-display text-3xl">STREAMING LIVE</span>
                </div>
                <div className="font-mono text-textSecondary text-sm">{quality} · Adaptive Bitrate</div>
                {m.score && <div className="font-mono text-5xl font-bold mt-4">{m.score}</div>}
              </div>
            )}
            {live && (
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="chip chip-live"><span className="live-dot animate-pulseLive"/> LIVE</span>
                {m.viewers && <span className="chip chip-up"><Eye size={11}/> {(m.viewers/1000).toFixed(0)}k watching</span>}
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent">
              <button className="text-white/80 hover:text-white"><Volume2 size={18}/></button>
              <div className="flex-1"/>
              <select value={quality} onChange={e=>setQuality(e.target.value)} className="bg-surface2 border border-borderc text-xs rounded px-2 py-1">
                <option>1080p</option><option>720p</option><option>480p</option>
              </select>
              <button className="text-white/80 hover:text-white"><Settings size={18}/></button>
              <button className="text-white/80 hover:text-white"><Maximize2 size={18}/></button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={()=>{navigator.clipboard?.writeText(window.location.href); toast.success('Link copied')}} className="btn-ghost"><Share2 size={16}/> Share</button>
            <button onClick={()=>toast.success('Added to favorites')} className="btn-ghost"><Heart size={16}/> Favorite</button>
            {!playing && <button onClick={()=>setPlaying(true)} className="btn-primary"><Radio size={16}/> Watch {live?'Live':'Now'}</button>}
          </div>

          <div className="card p-6 mt-6">
            <h2 className="font-display text-2xl mb-3">About This Match</h2>
            <p className="text-textSecondary leading-relaxed">
              Watch {m.home} vs {m.away} live stream free in HD on StreamBlitz. The {m.competition} clash takes place at {m.venue}. No sign up, no payment — press play and the HD stream loads instantly with multiple quality options, adaptive bitrate and full-screen support on desktop and mobile.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-display text-xl mb-2">Match Info</h3>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between"><dt className="text-textSecondary">Competition</dt><dd>{m.competition}</dd></div>
              <div className="flex justify-between"><dt className="text-textSecondary">Kickoff</dt><dd className="font-mono">{format(new Date(m.startDate),'HH:mm')}</dd></div>
              <div className="flex justify-between"><dt className="text-textSecondary">Date</dt><dd>{format(new Date(m.startDate),'d MMM yyyy')}</dd></div>
              <div className="flex justify-between"><dt className="text-textSecondary">Venue</dt><dd className="text-right max-w-[60%]">{m.venue}</dd></div>
              <div className="flex justify-between"><dt className="text-textSecondary">Quality</dt><dd>HD 1080p</dd></div>
            </dl>
          </div>
          <div className="card p-5">
            <h3 className="font-display text-xl mb-3">More {m.sport}</h3>
            <div className="space-y-3">
              {related.map(r => (
                <Link key={r.id} to={`/match/${r.slug}`} className="block text-sm hover:text-accent">
                  <div className="font-semibold">{r.home} vs {r.away}</div>
                  <div className="text-textMuted text-xs">{r.competition}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="font-display text-3xl mb-5">More Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((r,i)=><MatchCard key={r.id} m={r} index={i}/>)}
        </div>
      </section>
    </>
  )
}
