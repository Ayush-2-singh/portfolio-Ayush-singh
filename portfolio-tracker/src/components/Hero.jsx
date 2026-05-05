import { Link } from 'react-scroll'
import { motion } from 'framer-motion'

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
    <div className="absolute inset-0 bg-gradient-to-br from-electric-500/10 via-charcoal-900 to-emerald-500/10 animate-gradient bg-[length:200%_200%]"></div>
    <div className="absolute inset-0 bg-mesh"></div>
    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 bg-gradient-to-r from-electric-400 to-emerald-400 bg-clip-text text-transparent">Alex Rivera</h1>
        <p className="text-2xl md:text-3xl text-gray-300 mb-4">Full Stack Developer</p>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">Building scalable web applications with modern tech.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="projects" smooth duration={500} className="px-8 py-3 bg-electric-500 hover:bg-electric-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 cursor-pointer">View My Work</Link>
          <Link to="daily-log" smooth duration={500} className="px-8 py-3 border-2 border-electric-500 text-electric-400 hover:bg-electric-500/10 font-semibold rounded-lg transition-all transform hover:scale-105 cursor-pointer">Daily Log</Link>
        </div>
      </motion.div>
    </div>
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"><div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"><div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div></div></div>
  </section>
)
export default Hero
