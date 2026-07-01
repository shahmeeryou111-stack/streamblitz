import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { sports, getMatchesBySport } from '../data/matches.js'
import MatchCard from '../components/MatchCard.jsx'
import MatchesSchema from '../components/MatchesSchema.jsx'

const seo = {
  football: {title:'Live Football Streaming Free HD — Premier League, Champions League | StreamBlitz', desc:'Watch live football streaming free in HD — Premier League, Champions League, La Liga, Bundesliga, Serie A. No sign up.'},
  nba:      {title:'Watch NBA Live Stream Free HD Online — Every Game | StreamBlitz', desc:'Every NBA regular season and playoff game live free in HD. Lakers, Celtics, Warriors and more.'},
  cricket:  {title:'Live Cricket Streaming Free HD — ICC, IPL, T20 World Cup | StreamBlitz', desc:'Free cricket live streaming — IPL, T20 World Cup, ODI, Tests. HD with ball-by-ball commentary.'},
  tennis:   {title:'Live Tennis Streaming Free — Grand Slams, ATP, WTA | StreamBlitz', desc:'Australian Open, Roland Garros, Wimbledon, US Open — live tennis streaming free in HD.'},
  ufc:      {title:'Watch UFC Live Stream Free — PPV Events HD | StreamBlitz', desc:'UFC pay-per-view main cards, Fight Night and prelims — free HD live streaming.'},
  f1:       {title:'Watch Formula 1 Live Stream Free HD — Every Race | StreamBlitz', desc:'F1 practice, qualifying and race live streaming free in HD with live timing.'},
}

export default function Sport() {
  const { slug } = useParams()
  const sport = sports.find(s=>s.slug===slug)
  if (!sport) return <Navigate to="/" replace/>
  const list = getMatchesBySport(slug)
  const s = seo[slug]

  return (
    <>
      <Helmet>
        <title>{s.title}</title>
        <meta name="description" content={s.desc}/>
        <script type="application/ld+json">{JSON.stringify({
          '@context':'https://schema.org','@type':'BreadcrumbList',
          itemListElement:[
            {'@type':'ListItem',position:1,name:'Home',item:'https://streamblitz.tv/'},
            {'@type':'ListItem',position:2,name:sport.name,item:`https://streamblitz.tv/#/sport/${slug}`},
          ]
        })}</script>
      </Helmet>
      <MatchesSchema list={list}/>

      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="text-textSecondary text-sm mb-2"><Link to="/" className="hover:text-accent">Home</Link> / {sport.name}</div>
        <h1 className="font-display text-5xl md:text-7xl"><span className="text-heat">{sport.name}</span> Live Free</h1>
        <p className="text-textSecondary mt-3 max-w-3xl">{sport.tagline}. Every match streamed free in HD, no sign up required.</p>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((m,i)=><MatchCard key={m.id} m={m} index={i}/>)}
        </div>
        {list.length===0 && <div className="card p-8 text-center text-textSecondary">No matches scheduled for {sport.name} right now.</div>}
      </section>
    </>
  )
}
