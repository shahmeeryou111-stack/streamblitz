import { Link } from 'react-router-dom'
import { Logo } from './Navbar.jsx'
import { sports } from '../data/matches.js'
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-borderc bg-surface1">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="text-textSecondary text-sm mt-4 leading-relaxed">Every Match. Every Moment. Live. Free HD sports streaming — no sign up, no payment, instant access.</p>
          <div className="flex gap-3 mt-4 text-textSecondary">
            <a href="#" aria-label="Twitter" className="hover:text-accent"><Twitter size={18}/></a>
            <a href="#" aria-label="Facebook" className="hover:text-accent"><Facebook size={18}/></a>
            <a href="#" aria-label="Instagram" className="hover:text-accent"><Instagram size={18}/></a>
            <a href="#" aria-label="Youtube" className="hover:text-accent"><Youtube size={18}/></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-xl mb-3">Sports</h4>
          <ul className="space-y-2 text-sm text-textSecondary">
            {sports.map(s => <li key={s.slug}><Link to={`/sport/${s.slug}`} className="hover:text-accent">Watch {s.name} Live Free</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-textSecondary">
            <li><Link to="/" className="hover:text-accent">Live Now</Link></li>
            <li><Link to="/schedule" className="hover:text-accent">Full Schedule</Link></li>
            <li><Link to="/sport/football" className="hover:text-accent">Premier League Free Stream</Link></li>
            <li><Link to="/sport/nba" className="hover:text-accent">NBA Live Free</Link></li>
            <li><Link to="/sport/cricket" className="hover:text-accent">IPL Live Cricket</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-xl mb-3">About</h4>
          <p className="text-sm text-textSecondary leading-relaxed">StreamBlitz is a demonstration streaming interface for showcasing a modern sports streaming UX. All match data on this site is simulated.</p>
        </div>
      </div>
      <div className="border-t border-borderc py-5 text-center text-xs text-textMuted">© {new Date().getFullYear()} StreamBlitz — Every Match. Every Moment. Live.</div>
    </footer>
  )
}
