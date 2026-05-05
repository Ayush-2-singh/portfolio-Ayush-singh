import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { GiTombstone } from 'react-icons/gi'

const projects = [
  { title: 'Adhyayan Classes', desc: 'Teaching tool for the modern frontier.Wrangling tasks since day one.', tech: ['React', 'Node.js', 'OpenAI'], github: '#',demo: 'https://www.adhyayanclasses.in' },
  { title: 'Medi Queue', desc: 'Real-time Queue analytics follow the gold trail.', tech: ['Next.js', 'Chart.js'], github: 'https://github.com/Ayush-2-singh/mediqueue',demo: 'https://mediqueue-alpha.vercel.app'  },
  { title: 'Bakery Managment', desc: 'Taste the cake .Frontier is real  ', tech: ['React', 'Supabase'], github: 'https://github.com/Ayush-2-singh/bakery-demo', demo: 'https://yy-phi-bice.vercel.app' },
  { title: 'Nayeb Vault ', desc: 'Clothes online shopping. Ride clean through the wilderness.', tech: ['React Native', 'Firebase'], github: 'https://github.com/Ayush-2-singh/nayeb-vault', demo: 'https://nayeb-vault.vercel.app/' },
]

const Projects = () => (
  <section id="projects" className="py-20 px-6 bg-gradient-to-b from-[#1a0f05] to-[#0d0705]">
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-saddle-500" />
          <GiTombstone className="text-ember text-3xl" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-saddle-500" />
        </div>
        <h2 className="font-display text-4xl md:text-5xl text-ember worn-text">Bounties Claimed</h2>
        <p className="font-mono text-dust-500 text-xs tracking-widest uppercase mt-2">Projects worth their weight in gold</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="sepia-card p-6 rounded-lg group hover:border-saddle-500/60 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display text-xl text-ember worn-text group-hover:flicker">{p.title}</h3>
              <span className="font-mono text-xs text-blood-400 border border-blood-700 px-2 py-0.5 rounded uppercase">Active</span>
            </div>

            <p className="font-body text-dust-400 text-sm mb-4 italic">"{p.desc}"</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {p.tech.map(t => (
                <span key={t} className="px-2 py-1 bg-saddle-900/60 border border-saddle-700/40 font-mono text-xs text-dust-300 rounded">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-6 pt-3 border-t border-saddle-800">
              <a href={p.github} className="flex items-center gap-2 font-mono text-xs text-dust-400 hover:text-ember transition-colors uppercase tracking-widest">
                <FaGithub /> Source
              </a>
              <a href={p.demo} className="flex items-center gap-2 font-mono text-xs text-dust-400 hover:text-ember transition-colors uppercase tracking-widest">
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Projects