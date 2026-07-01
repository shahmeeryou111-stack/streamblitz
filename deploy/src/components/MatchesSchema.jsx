import { Helmet } from 'react-helmet-async'
import { matches } from '../data/matches.js'

export default function MatchesSchema({ list }) {
  const data = (list || matches).map(m => ({
    '@context':'https://schema.org','@type':'SportsEvent',
    name: `${m.home} vs ${m.away} — ${m.competition}`,
    sport: m.sport,
    startDate: m.startDate,
    location: { '@type':'Place', name: m.venue },
    competitor: [
      { '@type':'SportsTeam', name: m.home },
      { '@type':'SportsTeam', name: m.away },
    ],
    url: `https://streamblitz.tv/#/match/${m.slug}`,
    eventStatus: m.status==='live' ? 'https://schema.org/EventScheduled' : 'https://schema.org/EventScheduled',
  }))
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
