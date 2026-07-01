import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Sport from './pages/Sport.jsx'
import Match from './pages/Match.jsx'
import Schedule from './pages/Schedule.jsx'
import Search from './pages/Search.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const loc = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname}
            initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-8}}
            transition={{duration:.25, ease:'easeOut'}}>
            <Routes location={loc}>
              <Route path="/" element={<Home/>} />
              <Route path="/sport/:slug" element={<Sport/>} />
              <Route path="/match/:slug" element={<Match/>} />
              <Route path="/schedule" element={<Schedule/>} />
              <Route path="/search" element={<Search/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
