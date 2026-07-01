// Static match data — hardcoded for demo. Dates auto-shifted relative to today.
const now = new Date();
const iso = (offsetHours) => new Date(now.getTime() + offsetHours * 3600 * 1000).toISOString();

export const sports = [
  { slug: 'football', name: 'Football', emoji: '⚽', tagline: 'Premier League, Champions League, La Liga & more' },
  { slug: 'nba', name: 'NBA', emoji: '🏀', tagline: 'Every regular season & playoff game live in HD' },
  { slug: 'cricket', name: 'Cricket', emoji: '🏏', tagline: 'IPL, ICC World Cup, T20, Test matches' },
  { slug: 'tennis', name: 'Tennis', emoji: '🎾', tagline: 'Grand Slams, ATP, WTA tours live' },
  { slug: 'ufc', name: 'UFC', emoji: '🥊', tagline: 'PPV events, Fight Night, prelims' },
  { slug: 'f1', name: 'Formula 1', emoji: '🏁', tagline: 'Every practice, qualifying & race live' },
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const raw = [
  ['football', 'Premier League', 'Manchester United', 'Liverpool', 'Old Trafford, Manchester', -0.5, '2-1'],
  ['football', 'Premier League', 'Arsenal', 'Chelsea', 'Emirates Stadium, London', 1.5],
  ['football', 'Champions League', 'Real Madrid', 'Manchester City', 'Santiago Bernabéu, Madrid', 3],
  ['football', 'La Liga', 'Barcelona', 'Atletico Madrid', 'Camp Nou, Barcelona', 26],
  ['football', 'Bundesliga', 'Bayern Munich', 'Borussia Dortmund', 'Allianz Arena, Munich', 50],
  ['football', 'Serie A', 'Inter Milan', 'Juventus', 'San Siro, Milan', 72],
  ['nba', 'NBA Regular Season', 'Los Angeles Lakers', 'Boston Celtics', 'Crypto.com Arena, LA', -1, '108-102'],
  ['nba', 'NBA Regular Season', 'Golden State Warriors', 'Denver Nuggets', 'Chase Center, San Francisco', 4],
  ['nba', 'NBA Regular Season', 'Miami Heat', 'Milwaukee Bucks', 'Kaseya Center, Miami', 28],
  ['nba', 'NBA Regular Season', 'Phoenix Suns', 'Dallas Mavericks', 'Footprint Center, Phoenix', 52],
  ['cricket', 'IPL 2025', 'Mumbai Indians', 'Chennai Super Kings', 'Wankhede Stadium, Mumbai', -0.2, '186/4 (18.2)'],
  ['cricket', 'IPL 2025', 'Royal Challengers Bangalore', 'Kolkata Knight Riders', 'M. Chinnaswamy Stadium, Bangalore', 5],
  ['cricket', 'ICC Test Series', 'India', 'Australia', 'Melbourne Cricket Ground', 30],
  ['cricket', 'T20 International', 'England', 'Pakistan', 'Lord\'s, London', 54],
  ['tennis', 'Australian Open — Semifinal', 'Novak Djokovic', 'Carlos Alcaraz', 'Rod Laver Arena, Melbourne', 8],
  ['tennis', 'Australian Open — Semifinal', 'Iga Swiatek', 'Aryna Sabalenka', 'Rod Laver Arena, Melbourne', 32],
  ['tennis', 'ATP Masters', 'Jannik Sinner', 'Daniil Medvedev', 'Indian Wells', 56],
  ['ufc', 'UFC 312 — Main Event', 'Islam Makhachev', 'Arman Tsarukyan', 'RAC Arena, Perth', 6],
  ['ufc', 'UFC Fight Night', 'Alexa Grasso', 'Valentina Shevchenko', 'UFC Apex, Las Vegas', 34],
  ['f1', 'Formula 1 — Qualifying', 'Max Verstappen', 'Lando Norris', 'Bahrain International Circuit', 10],
  ['f1', 'Formula 1 — Race', 'Charles Leclerc', 'Lewis Hamilton', 'Miami International Autodrome', 58],
  ['football', 'FA Cup', 'Tottenham', 'Newcastle', 'Tottenham Hotspur Stadium', 76],
  ['nba', 'NBA Regular Season', 'Oklahoma City Thunder', 'Minnesota Timberwolves', 'Paycom Center, OKC', 100],
  ['cricket', 'IPL 2025', 'Rajasthan Royals', 'Sunrisers Hyderabad', 'Sawai Mansingh Stadium, Jaipur', 78],
];

export const matches = raw.map(([sport, competition, home, away, venue, offset, score]) => {
  const slug = slugify(`${competition}-${home}-vs-${away}`);
  const startDate = iso(offset);
  let status = 'upcoming';
  if (offset < -2) status = 'finished';
  else if (offset < 0.5) status = 'live';
  return {
    id: slug, slug, sport, competition, home, away, venue,
    startDate, status,
    score: score || null,
    viewers: status === 'live' ? Math.floor(20000 + Math.random() * 180000) : null,
    hd: true,
  };
});

export const getMatchesBySport = (s) => matches.filter(m => m.sport === s);
export const getMatchBySlug = (slug) => matches.find(m => m.slug === slug);
export const liveMatches = matches.filter(m => m.status === 'live');
export const upcomingMatches = matches.filter(m => m.status === 'upcoming');
export const finishedMatches = matches.filter(m => m.status === 'finished');
