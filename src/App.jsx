import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import DailyLog from './components/DailyLog'
import Contact from './components/Contact'

function App() {
  return (
    <div className="bg-transparent">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <DailyLog />
      <Contact />
    </div>
  )
}
export default App
