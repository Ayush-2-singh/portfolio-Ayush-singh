import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaDownload } from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiPython, SiTailwindcss, SiSupabase, SiGit } from 'react-icons/si'
import { GiStarMedal } from 'react-icons/gi'

const About = () => {
  const skills = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
  ]

  const social = [
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/authwall?trk=gf&trkInfo=AQEuOFvrPJB8zgAAAZ33Xv34UQmA09fGKdLfwzGi53wWpu4xWUiWxUefxr9A3MAoObrm9sdVDmD2AThWWB7zYe_ALxLVbSwhKu3T-u8blqR0sIse2c_6EsJm38Jyuino5i41OA0=&original_referer=https://www.google.com/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fayush-singh-3a2b85314%3Futm_source%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dmember_android', color: '#0077B5' },
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com/ayush-2-singh', color: '#d4c5a9' },
    { name: 'Resume', icon: FaDownload, url: '/resume.pdf', color: '#e8a020' },
    { name: 'Email', icon: FaEnvelope, url: 'ayushsinghtmd@gmail.com', color: '#c0392b' },
  ]

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-[#0d0705] to-[#1a0f05]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-saddle-500" />
            <GiStarMedal className="text-ember text-3xl" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-saddle-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ember worn-text">The Outlaw's Tale</h2>
          <p className="font-mono text-dust-500 text-xs tracking-widest uppercase mt-2">Est. in the frontier lands</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Avatar */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="wanted-border p-1 rounded w-60 h-60">
              <div className="w-full h-full bg-gradient-to-b from-saddle-800 to-darkwood flex items-center justify-center text-7xl rounded">
                🤠
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-2/3">
            <p className="font-body text-dust-300 text-lg mb-6 italic border-l-2 border-ember pl-4">
              "A full stack outlaw with 1+ years riding the digital frontier. Specializes in React, Node.js, and Supabase — wanted in three territories for shipping clean code."
            </p>

            <h3 className="font-mono text-ember uppercase tracking-widest text-sm mb-4">Known Weapons</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map(s => (
                <div key={s.name} className="flex items-center gap-2 px-4 py-2 sepia-card rounded text-dust-300 text-sm hover:border-ember/60 transition-colors">
                  <s.icon style={{ color: s.color }} />
                  <span className="font-mono">{s.name}</span>
                </div>
              ))}
            </div>

            <h3 className="font-mono text-ember uppercase tracking-widest text-sm mb-4">Send Word</h3>
            <div className="flex flex-wrap gap-3">
              {social.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 sepia-card rounded text-dust-300 text-sm hover:border-ember/60 transition-colors">
                  <s.icon style={{ color: s.color }} />
                  <span className="font-mono">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About