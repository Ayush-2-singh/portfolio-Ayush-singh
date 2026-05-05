import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projects = [
  { title:'AI Content Generator', desc:'OpenAI powered content creation.', tech:['React','Node.js','OpenAI'], github:'#', demo:'#' },
  { title:'FinTech Dashboard', desc:'Real-time financial analytics.', tech:['Next.js','Chart.js'], github:'#', demo:'#' },
  { title:'TaskFlow Pro', desc:'Project management with Kanban.', tech:['React','Supabase'], github:'#', demo:'#' },
  { title:'EcoTrack Mobile', desc:'Carbon footprint tracker.', tech:['React Native','Firebase'], github:'#', demo:'#' }
]
const Projects = () => (
  <section id="projects" className="py-20 px-6 bg-transparent">
    <div className="container mx-auto max-w-6xl"><div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-display font-bold">Featured <span className="text-electric-400">Projects</span></h2><div className="w-20 h-1 bg-electric-500 mx-auto rounded-full"></div></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{projects.map((p,i)=><motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{delay:i*0.1}} whileHover={{y:-8}} className="bg-charcoal-800 p-6 rounded-xl"><h3 className="text-2xl font-display font-semibold text-electric-400">{p.title}</h3><p className="text-gray-300 my-2">{p.desc}</p><div className="flex flex-wrap gap-2 my-3">{p.tech.map(t=><span key={t} className="px-2 py-1 bg-charcoal-700 text-xs rounded">{t}</span>)}</div><div className="flex gap-4"><a href={p.github} className="flex items-center gap-1 text-gray-300 hover:text-electric-400"><FaGithub/> Code</a><a href={p.demo} className="flex items-center gap-1 text-gray-300 hover:text-electric-400"><FaExternalLinkAlt/> Demo</a></div></motion.div>)}</div></div>
  </section>
)
export default Projects
