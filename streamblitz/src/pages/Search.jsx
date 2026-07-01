import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { matches } from '../data/matches.js'
import MatchCard from '../components/MatchCard.jsx'

export default function Search() {
  const [sp] = useSearchParams()
  const q = (sp.get('q')||'').toLowerCase()
  const results = matches.filter(m =>
    [m.home,m.away,m.competition,m.sport,m.venue].join(' ').toLowerCase().includes(q))
  return (
    <>
      <Helmet><title>Search "{q}" — StreamBlitz</title></Helmet>
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="font-display text-4xl md:text-5xl">Search: <span className="text-heat">{q}</span></h1>
        <p className="text-textSecondary mt-1">{results.length} result(s)</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {results.map((m,i)=><MatchCard key={m.id} m={m} index={i}/>)}
        </div>
        {results.length===0 && <div className="card p-8 text-center text-textSecondary mt-6">No matches found for "{q}".</div>}
      </section>
    </>
  )
}
