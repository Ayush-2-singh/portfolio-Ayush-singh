import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiPython, SiTailwindcss, SiSupabase, SiGit } from 'react-icons/si'

const About = () => {
  const skills = [{name:'React',icon:SiReact,color:'#61DAFB'},{name:'Node.js',icon:SiNodedotjs,color:'#339933'},{name:'Python',icon:SiPython,color:'#3776AB'},{name:'Tailwind',icon:SiTailwindcss,color:'#06B6D4'},{name:'Supabase',icon:SiSupabase,color:'#3ECF8E'},{name:'Git',icon:SiGit,color:'#F05032'}]
  const social = [{name:'LinkedIn',icon:FaLinkedin,url:'https://linkedin.com/in/alexrivera',color:'#0077B5'},{name:'GitHub',icon:FaGithub,url:'https://github.com/alexrivera',color:'#fff'},{name:'Resume',icon:FaDownload,url:'/resume.pdf',color:'#10B981'},{name:'Email',icon:FaEnvelope,url:'mailto:alex@rivera.dev',color:'#EF4444'}]
  return (
    <section id="about" className="py-20 px-6 bg-charcoal-800">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold">About <span className="text-electric-400">Me</span></h2>
          <div className="w-20 h-1 bg-electric-500 mx-auto rounded-full mt-2"></div>
        </motion.div>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3"><div className="w-64 h-64 rounded-full bg-gradient-to-br from-electric-500 to-emerald-500 p-1 mx-auto"><div className="w-full h-full rounded-full bg-charcoal-800 flex items-center justify-center text-6xl">👨‍💻</div></div></div>
          <div className="lg:w-2/3"><p className="text-gray-300 text-lg mb-6">Full Stack Developer with 5+ years experience. Specialize in React, Node.js, Supabase.</p><div className="flex flex-wrap gap-4 mb-8">{skills.map(s=><div key={s.name} className="flex items-center gap-2 px-4 py-2 bg-charcoal-700 rounded-lg"><s.icon style={{color:s.color}}/> <span>{s.name}</span></div>)}</div><div className="flex flex-wrap gap-4">{social.map(s=><a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-charcoal-700 rounded-lg hover:bg-charcoal-600"><s.icon style={{color:s.color}}/> {s.name}</a>)}</div></div>
        </div>
      </div>
    </section>
  )
}
export default About
