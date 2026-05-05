import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); console.log(form); setSent(true); setTimeout(()=>setSent(false),3000); setForm({name:'',email:'',message:''}) }
  return (
    <section id="contact" className="py-20 px-6 bg-transparent">
      <div className="container mx-auto max-w-5xl"><div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-display font-bold">Get In <span className="text-electric-400">Touch</span></h2><div className="w-20 h-1 bg-electric-500 mx-auto rounded-full"></div></div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-charcoal-800 p-6 rounded-xl"><h3 className="text-2xl font-semibold text-electric-400">Send a Message</h3><form onSubmit={handleSubmit} className="mt-4 space-y-4"><input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded" required/><input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded" required/><textarea rows="5" placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded" required/><button type="submit" className="w-full py-3 bg-electric-500 rounded font-semibold flex items-center justify-center gap-2"><FaPaperPlane/> Send</button>{sent && <p className="text-emerald-400 text-center">Sent!</p>}</form></div>
        <div className="bg-charcoal-800 p-6 rounded-xl flex flex-col justify-center"><h3 className="text-2xl font-semibold text-electric-400">Connect</h3><div className="mt-6 space-y-3"><a href="mailto:alex@rivera.dev" className="flex gap-3 items-center"><FaEnvelope/> alex@rivera.dev</a><a href="https://linkedin.com/in/alexrivera" target="_blank" className="flex gap-3 items-center"><FaLinkedin/> LinkedIn</a><a href="https://github.com/alexrivera" target="_blank" className="flex gap-3 items-center"><FaGithub/> GitHub</a></div><div className="mt-8 pt-4 border-t border-charcoal-700 text-sm text-gray-400">San Francisco, CA</div></div>
      </div></div>
    </section>
  )
}
export default Contact
