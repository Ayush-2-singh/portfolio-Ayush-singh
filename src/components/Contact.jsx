import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import { GiLetterBomb } from 'react-icons/gi'
import { FiSend } from 'react-icons/fi'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: '', email: '', message: '' })
  }

  const inputClass = "w-full p-3 bg-darkwood/80 border border-saddle-700/50 rounded font-body text-dust-300 placeholder-dust-600 focus:outline-none focus:border-ember/60 transition-colors text-sm"

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-[#1a0f05] to-[#0d0705]">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-saddle-500" />
            <GiLetterBomb className="text-ember text-3xl" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-saddle-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ember worn-text">Send a Wire</h2>
          <p className="font-mono text-dust-500 text-xs tracking-widest uppercase mt-2">Carrier pigeons accepted</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="sepia-card p-6 rounded-lg"
          >
            <h3 className="font-display text-xl text-ember mb-5">Draft Your Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your name, stranger..." value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required />
              <input type="email" placeholder="Your telegraph address..." value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} required />
              <textarea rows="5" placeholder="Speak your piece..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={inputClass} required />
              <button type="submit" className="w-full py-3 bg-blood-600 hover:bg-blood-500 text-parchment font-mono uppercase tracking-widest text-sm rounded transition-all border border-blood-500/30 flex items-center justify-center gap-2 shadow-[0_0_15px_#c0392b30]">
                <FiSend /> Send the Wire
              </button>
              {sent && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center font-mono text-green-400 text-sm uppercase tracking-widest"
                >
                  ✓ Message delivered, partner.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="sepia-card p-6 rounded-lg flex flex-col justify-center"
          >
            <h3 className="font-display text-xl text-ember mb-6">Find Me on the Trail</h3>
            <div className="space-y-4">
              {[
                { icon: FaEnvelope, label: 'alex@rivera.dev', href: 'mailto:alex@rivera.dev', color: '#c0392b' },
                { icon: FaLinkedin, label: 'LinkedIn Profile', href: 'https://linkedin.com/in/alexrivera', color: '#0077B5' },
                { icon: FaGithub, label: 'GitHub Repos', href: 'https://github.com/alexrivera', color: '#d4c5a9' },
              ].map(({ icon: Icon, label, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded bg-darkwood/50 border border-saddle-800 hover:border-saddle-500/60 transition-colors group"
                >
                  <Icon style={{ color }} className="text-xl" />
                  <span className="font-mono text-dust-300 group-hover:text-ember transition-colors text-sm">{label}</span>
                </a>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-saddle-800/60">
              <p className="font-mono text-dust-600 text-xs uppercase tracking-widest">📍 San Francisco, CA — Frontier Territory</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact