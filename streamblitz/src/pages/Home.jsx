import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Radio, Zap, Tv, Shield, Smartphone, DollarSign, Check, X } from 'lucide-react'
import { matches, sports, liveMatches, upcomingMatches } from '../data/matches.js'
import MatchCard from '../components/MatchCard.jsx'
import MatchesSchema from '../components/MatchesSchema.jsx'

export default function Home() {
  const today = matches.filter(m => {
    const d = new Date(m.startDate); const now = new Date();
    return d.toDateString() === now.toDateString();
  })
  const week = upcomingMatches.slice(0, 8)

  return (
    <>
      <Helmet>
        <title>StreamBlitz — Watch Live Sports Streaming Free HD | Football, NBA, Cricket 2025</title>
        <meta name="description" content="Watch live sports streaming free in HD on StreamBlitz. Premier League, Champions League, NBA, IPL cricket, Grand Slam tennis, UFC, F1 — no sign up, instant HD access."/>
      </Helmet>
      <MatchesSchema />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-70"
          style={{background:'radial-gradient(60% 60% at 20% 20%, rgba(255,59,59,.25), transparent 60%), radial-gradient(50% 50% at 90% 30%, rgba(255,107,53,.18), transparent 60%)'}}/>
        <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 md:pt-20 md:pb-16">
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
            <div className="inline-flex items-center gap-2 chip chip-live mb-5"><span className="live-dot animate-pulseLive"/> {liveMatches.length} MATCHES LIVE NOW</div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-5xl">
              Watch <span className="text-heat">Live Sports</span> Streaming Free in HD — Every Match, Every Moment
            </h1>
            <p className="mt-6 text-textSecondary max-w-2xl text-lg">
              Free HD streams for Premier League, Champions League, NBA, IPL cricket, Grand Slam tennis, UFC PPV and Formula 1 — no sign up, no subscription, instant play in your browser.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/schedule" className="btn-primary"><Play size={16}/> Watch Live Now</Link>
              <Link to="/sport/football" className="btn-ghost"><Radio size={16}/> Football Live</Link>
              <Link to="/sport/nba" className="btn-ghost">NBA Live</Link>
              <Link to="/sport/cricket" className="btn-ghost">Cricket Live</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIVE NOW */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeader kicker="Live" title="Live Sports On Now" href="/schedule"/>
        {liveMatches.length === 0 ? (
          <div className="card p-8 text-center text-textSecondary">No matches live right now — check the schedule below.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveMatches.map((m,i)=><MatchCard key={m.id} m={m} index={i}/>)}
          </div>
        )}
      </section>

      {/* TODAY */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeader kicker="Today" title="Today's Match Schedule" href="/schedule"/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(today.length?today:matches.slice(0,6)).map((m,i)=><MatchCard key={m.id} m={m} index={i}/>)}
        </div>
      </section>

      {/* UPCOMING */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeader kicker="This Week" title="Upcoming Matches This Week" href="/schedule"/>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {week.map((m,i)=><MatchCard key={m.id} m={m} index={i}/>)}
        </div>
      </section>

      {/* SPORT SECTIONS with SEO copy */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        <SportBlock slug="football" heading="Watch Live Football Free"
          body="StreamBlitz streams every Premier League matchweek, all Champions League nights, La Liga El Clásico, Serie A, Bundesliga and the FA Cup free in HD. Big-six fixtures like Manchester United vs Liverpool and Arsenal vs Chelsea start streaming 15 minutes before kickoff with multiple camera angles, HD or 4K quality, live stats overlay and instant replays. No cable subscription and no sign up — free football live streaming that just works, on any device."/>
        <SportBlock slug="nba" heading="Watch NBA Live Free"
          body="Every NBA regular season game, every playoff series and the NBA Finals — live and free in HD on StreamBlitz. Lakers, Celtics, Warriors, Nuggets, Bucks, Suns and every other franchise in one place, with box scores, play-by-play, and highlights available the moment the game ends. NBA League Pass without the price tag: this is the easiest way to watch NBA live free online."/>
        <SportBlock slug="cricket" heading="Live Cricket Streaming"
          body="Watch IPL 2025 live free — Mumbai Indians, CSK, RCB and KKR — plus every ICC event: T20 World Cup, ODI World Cup, and Test series including The Ashes and India vs Australia. StreamBlitz delivers ball-by-ball commentary, live scorecards, wagon wheels and Hawk-Eye replays in HD. The best free cricket live streaming site with zero registration required."/>
        <SportBlock slug="tennis" heading="Live Tennis & Grand Slams"
          body="Every Grand Slam — Australian Open, Roland Garros, Wimbledon, US Open — streamed live and free on every court. Follow Djokovic, Alcaraz, Sinner, Swiatek and Sabalenka with ATP and WTA tour coverage year-round. Watch live tennis streaming free in HD with live rally speed, break-point stats and full match replays."/>
        <SportBlock slug="ufc" heading="UFC & Boxing Live"
          body="Watch UFC live stream free — every pay-per-view main card, Fight Night, prelims and post-fight press conferences in HD. From Islam Makhachev to Alex Pereira and Sean O'Malley, StreamBlitz covers the entire card without any pay-per-view fee."/>
        <SportBlock slug="f1" heading="Formula 1 Live Streaming"
          body="Watch Formula 1 live stream free HD — every practice session, qualifying and race across the entire season. Verstappen, Norris, Leclerc, Hamilton — live timing, onboard cameras, team radio and pit-wall stats included on every StreamBlitz F1 stream."/>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="font-display text-4xl md:text-5xl mb-8">How to Watch Live Sports on StreamBlitz</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n:'01', t:'Pick a Match', d:'Browse live now, today\'s schedule or upcoming fixtures. Every league, every sport, one page.'},
            { n:'02', t:'Press Play', d:'Streams launch instantly in HD. No sign up, no download, no wait time — just tap the play button.'},
            { n:'03', t:'Enjoy Free HD', d:'Full-screen, PiP, live stats and multi-cam angles on any device — phone, laptop or smart TV.'},
          ].map(s => (
            <div key={s.n} className="card p-6">
              <div className="font-display text-6xl text-heat leading-none">{s.n}</div>
              <div className="font-display text-2xl mt-2">{s.t}</div>
              <p className="text-textSecondary text-sm mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="font-display text-4xl md:text-5xl mb-6">StreamBlitz vs Cable vs Other Streaming Sites</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface2 text-textSecondary">
              <tr>
                <th className="text-left p-4">Feature</th>
                <th className="p-4">StreamBlitz</th>
                <th className="p-4">Cable TV</th>
                <th className="p-4">Other Sites</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderc">
              {[
                ['Price','Free','$80+/mo','Free/Paid'],
                ['Sign Up Required','No','Contract','Usually yes'],
                ['HD Quality','Yes','Yes','Sometimes'],
                ['All Sports in One Place','Yes','No','Rarely'],
                ['Mobile Ready','Yes','No','Sometimes'],
                ['No Region Lock','Yes','No','No'],
              ].map(row=>(
                <tr key={row[0]}>
                  <td className="p-4 text-textPrimary">{row[0]}</td>
                  <td className="p-4 text-center"><Cell v={row[1]}/></td>
                  <td className="p-4 text-center"><Cell v={row[2]}/></td>
                  <td className="p-4 text-center"><Cell v={row[3]}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* WHY */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="font-display text-4xl md:text-5xl mb-6">Why StreamBlitz Is The Best Free Sports Streaming Site</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {icon:DollarSign, t:'Always Free', d:'Zero cost, forever. No trials, no card required.'},
            {icon:Tv, t:'HD Everything', d:'Adaptive bitrate up to 1080p on every stream.'},
            {icon:Smartphone, t:'Any Device', d:'Phone, tablet, laptop, smart TV — all supported.'},
            {icon:Shield, t:'No Sign Up', d:'Instant access with no email, password or account.'},
          ].map(f=>(
            <div key={f.t} className="card p-5">
              <div className="w-10 h-10 rounded-lg bg-heat flex items-center justify-center mb-3"><f.icon size={20} className="text-white"/></div>
              <div className="font-display text-2xl">{f.t}</div>
              <p className="text-textSecondary text-sm mt-1">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <h2 className="font-display text-4xl md:text-5xl mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map(f=>(
            <details key={f.q} className="card p-5 group">
              <summary className="cursor-pointer font-display text-2xl list-none flex justify-between items-center">
                {f.q}
                <span className="text-accent group-open:rotate-45 transition-transform">＋</span>
              </summary>
              <p className="text-textSecondary text-sm mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

function SectionHeader({kicker,title,href}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <div className="text-accent text-xs tracking-widest uppercase font-semibold">{kicker}</div>
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      </div>
      {href && <Link to={href} className="text-sm text-textSecondary hover:text-accent">See all →</Link>}
    </div>
  )
}
function SportBlock({slug,heading,body}) {
  const sport = sports.find(s=>s.slug===slug)
  return (
    <article>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{sport.emoji}</span>
        <h2 className="font-display text-3xl md:text-4xl">{heading}</h2>
      </div>
      <p className="text-textSecondary max-w-4xl leading-relaxed">{body}</p>
      <Link to={`/sport/${slug}`} className="inline-block mt-3 text-accent text-sm font-semibold">Explore {sport.name} streams →</Link>
    </article>
  )
}
function Cell({v}) {
  if (v==='Yes') return <span className="inline-flex text-live"><Check size={16}/></span>
  if (v==='No') return <span className="inline-flex text-accent"><X size={16}/></span>
  return <span className="text-textSecondary">{v}</span>
}

const FAQS = [
  {q:'Where can I watch live sports for free?', a:'StreamBlitz lets you watch live sports streaming free in HD across every major league and tournament. Football, NBA, cricket, tennis, UFC, F1 — no sign up, no payment, instant access from any browser on desktop or mobile. Pick a match and press play.'},
  {q:'Is StreamBlitz really free?', a:'Yes. StreamBlitz is 100% free. No subscription, no credit card, no trial and no hidden fees. Every live match, replay and highlight is available at no cost.'},
  {q:'What sports can I watch on StreamBlitz?', a:'Premier League and Champions League football, NBA basketball, international and franchise cricket (IPL, T20 World Cup), ATP and WTA tennis including all four Grand Slams, UFC and boxing, plus every Formula 1 race weekend.'},
  {q:'Do I need to sign up to watch live sports on StreamBlitz?', a:'No sign up required. Open any match page and the stream is ready to play. No account, no email, no password.'},
  {q:'Can I watch Premier League live for free?', a:'Yes. Every Premier League matchweek is streamed in HD for free, including all big-six fixtures. Streams start 15 minutes before kickoff with multiple quality options.'},
  {q:'Can I watch NBA games live free online?', a:'Every NBA regular season and playoff game is available to stream live free on StreamBlitz in HD — Lakers, Celtics, Warriors, Nuggets, all of them.'},
  {q:'Is there free cricket live streaming in HD?', a:'IPL, T20 World Cup, ODI World Cup, The Ashes and every major bilateral series — all live and free in HD with ball-by-ball commentary.'},
  {q:'What devices support StreamBlitz?', a:'Any modern browser on desktop, laptop, Android, iPhone, iPad and smart TVs. No app download required — the player adapts quality automatically.'},
  {q:'How to watch live sports on mobile for free?', a:'Open streamblitz.tv in your phone browser, tap a live match card, and the HD stream loads instantly with full-screen and picture-in-picture support.'},
  {q:'Is StreamBlitz legal?', a:'StreamBlitz is a demonstration streaming interface. Users are responsible for complying with their local broadcasting laws — always support your local rights holder when a legal option exists.'},
]
