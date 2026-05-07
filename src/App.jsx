import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import DailyLog from './components/DailyLog'
import Contact from './components/Contact'

import AboutInner from './components/AboutInner'
import Quotes from './components/Quotes'  // keep same, just the internal name changed
function App() {
  return (
    <div className="bg-transparent">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Quotes />
      <AboutInner />
      <DailyLog />
      <Contact />
    </div>
  )
}

export default App