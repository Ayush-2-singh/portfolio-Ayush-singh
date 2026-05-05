import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { GiWantedReward, GiHorseshoe } from 'react-icons/gi'

const Hero = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
    {/* Sky gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#1a0800] via-[#2d1205] to-[#0d0705]" />

    {/* Dust particles */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-ember/30 dust-particle"
        style={{
          left: `${10 + i * 12}%`,
          top: `${20 + (i % 3) * 25}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${5 + i}s`
        }}
      />
    ))}

    {/* Wanted poster frame */}
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Wanted header */}
        <div className="wanted-border p-8 md:p-12 bg-gradient-to-b from-[#1e0e02] to-[#150902]">
          <div className="flex items-center justify-center gap-3 mb-2">
            <GiHorseshoe className="text-ember text-2xl" />
            <p className="font-mono text-ember text-sm tracking-[0.4em] uppercase">Wanted</p>
            <GiHorseshoe className="text-ember text-2xl scale-x-[-1]" />
          </div>

          <GiWantedReward className="text-7xl text-saddle-400 mx-auto my-4 opacity-60" />

          <h1 className="font-display text-5xl md:text-7xl text-ember worn-text flicker mb-2">
            AYUSH SINGH
          </h1>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-saddle-500 to-transparent my-4" />

          <p className="font-mono text-dust-300 text-xl md:text-2xl tracking-widest uppercase mb-2">
            Full Stack Outlaw
          </p>

          <p className="font-body text-dust-400 text-base md:text-lg max-w-xl mx-auto mb-8 italic">
            "Builds scalable web applications. Last seen wranglin' React & Node.js across the frontier."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="projects" smooth duration={500}
              className="px-8 py-3 bg-blood-600 hover:bg-blood-500 text-parchment font-mono uppercase tracking-widest text-sm rounded transition-all transform hover:scale-105 cursor-pointer border border-blood-400/40 shadow-[0_0_20px_#c0392b40]"
            >
              View My Work
            </Link>
            <Link
              to="daily-log" smooth duration={500}
              className="px-8 py-3 border-2 border-saddle-500 text-ember hover:bg-saddle-900/40 font-mono uppercase tracking-widest text-sm rounded transition-all transform hover:scale-105 cursor-pointer"
            >
              Daily Log
            </Link>
          </div>
        </div>

        <p className="font-mono text-saddle-600 text-xs tracking-widest mt-4 uppercase">
          Reward: $1,000 Dead or Alive
        </p>
      </motion.div>
    </div>

    {/* Bottom scroll indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-5 h-9 border-2 border-saddle-500/60 rounded-full flex justify-center">
        <div className="w-1 h-2 bg-ember rounded-full mt-2 animate-pulse" />
      </div>
    </div>
  </section>
)

export default Hero