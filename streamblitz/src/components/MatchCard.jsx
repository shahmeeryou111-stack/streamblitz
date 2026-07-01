import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format, formatDistanceToNow } from 'date-fns'
import { Radio, Clock, Eye, Play, Trophy } from 'lucide-react'

export default function MatchCard({ m, index=0 }) {
  const live = m.status === 'live'
  const upcoming = m.status === 'upcoming'
  const start = new Date(m.startDate)
  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:index*0.03}}>
      <Link to={`/match/${m.slug}`} className="card card-hover block p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wider text-textSecondary flex items-center gap-1.5"><Trophy size={12} className="text-amber"/> {m.competition}</span>
          {live && <span className="chip chip-live"><span className="live-dot animate-pulseLive"/> LIVE</span>}
          {upcoming && <span className="chip chip-up"><Clock size={11}/> {formatDistanceToNow(start,{addSuffix:true})}</span>}
          {m.status==='finished' && <span className="chip chip-fin">FT</span>}
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="text-right">
            <div className="font-display text-2xl leading-tight">{m.home}</div>
          </div>
          <div className="font-mono text-textSecondary text-sm px-2">
            {m.score ? <span className="text-white font-bold text-lg">{m.score}</span> : 'VS'}
          </div>
          <div className="text-left">
            <div className="font-display text-2xl leading-tight">{m.away}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-textMuted">
          <span>{format(start,'EEE d MMM • HH:mm')}</span>
          <div className="flex items-center gap-2">
            {m.hd && <span className="chip chip-hd">HD</span>}
            {live && m.viewers && <span className="flex items-center gap-1"><Eye size={12}/>{(m.viewers/1000).toFixed(0)}k</span>}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-textMuted truncate">{m.venue}</span>
          <span className="text-accent text-xs font-semibold inline-flex items-center gap-1">
            {live ? <><Radio size={12}/> Watch Live</> : <><Play size={12}/> View</>}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
