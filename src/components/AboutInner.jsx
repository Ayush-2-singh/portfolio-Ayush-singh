import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { GiCowled } from 'react-icons/gi'

const PASSWORD = 'frontier2026'
const THOUGHT_CATEGORIES = ['Career', 'Life Goals', 'Relationships', 'Spirituality', 'Personal']

const categoryStyle = (cat) => ({
  Career: 'bg-saddle-800/60 text-ember border-saddle-600/50',
  'Life Goals': 'bg-[#1a2e1a]/60 text-green-400 border-green-900/50',
  Relationships: 'bg-[#2e1a2e]/60 text-pink-300 border-pink-900/50',
  Spirituality: 'bg-[#1a1a2e]/60 text-blue-300 border-blue-900/50',
  Personal: 'bg-blood-700/30 text-blood-400 border-blood-700/50',
}[cat] || 'bg-dust-600/10 text-dust-400')

const AboutInner = () => {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [form, setForm] = useState({ content: '', category: 'Career' })
  const [submitting, setSubmitting] = useState(false)

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputClass = "w-full p-3 bg-darkwood/80 border border-saddle-700/50 rounded font-body text-dust-300 placeholder-dust-600 focus:outline-none focus:border-ember/60 transition-colors text-sm"

  useEffect(() => { fetchThoughts() }, [])

  const fetchThoughts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('thoughts')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setThoughts(data || [])
    setLoading(false)
  }

  const unlock = () => {
    if (passwordInput === PASSWORD) {
      setIsAdmin(true)
      setShowPasswordInput(false)
      setPasswordError(false)
      setPasswordInput('')
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

  const addThought = async (e) => {
    e.preventDefault()
    if (!form.content.trim()) return
    setSubmitting(true)
    const { error } = await supabase.from('thoughts').insert([{ ...form }])
    if (!error) {
      setForm({ ...form, content: '' })
      await fetchThoughts()
    }
    setSubmitting(false)
  }

  const deleteThought = async (id) => {
    if (confirm('Delete this thought?')) {
      await supabase.from('thoughts').delete().eq('id', id)
      await fetchThoughts()
    }
  }

  const filtered = activeCategory === 'All'
    ? thoughts
    : thoughts.filter(t => t.category === activeCategory)

  return (
    <section id="about-inner" className="py-20 px-6 bg-gradient-to-b from-[#0d0705] to-[#1a0f05]">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-saddle-500" />
            <GiCowled className="text-ember text-3xl" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-saddle-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ember worn-text">The Outlaw's Codex</h2>
          <p className="font-mono text-dust-500 text-xs tracking-widest uppercase mt-2">Who I am. What I seek. Where I ride.</p>

          {/* Hidden admin toggle */}
          <button
            onClick={() => setShowPasswordInput(!showPasswordInput)}
            className="mt-4 text-dust-700 hover:text-dust-500 transition-colors"
            title="Admin"
          >
            <FiLock size={12} />
          </button>
        </div>

        {/* Password input */}
        <AnimatePresence>
          {showPasswordInput && !isAdmin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-sm mx-auto mb-8"
            >
              <div className="sepia-card p-4 rounded-lg flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password..."
                    value={passwordInput}
                    onChange={e => { setPasswordInput(e.target.value); setPasswordError(false) }}
                    onKeyDown={e => e.key === 'Enter' && unlock()}
                    className={`w-full p-2 bg-darkwood/80 border rounded font-mono text-dust-300 placeholder-dust-600 focus:outline-none transition-colors text-sm pr-8 ${
                      passwordError ? 'border-blood-500' : 'border-saddle-700/50 focus:border-ember/60'
                    }`}
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2.5 text-dust-500">
                    {showPassword ? <FiEyeOff size={12} /> : <FiEye size={12} />}
                  </button>
                </div>
                <button
                  onClick={unlock}
                  className="px-4 py-2 bg-blood-600 hover:bg-blood-500 text-parchment font-mono text-xs uppercase tracking-wider rounded transition-all"
                >
                  Enter
                </button>
              </div>
              {passwordError && <p className="font-mono text-blood-400 text-xs text-center mt-2">Wrong code.</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin bar */}
        {isAdmin && (
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsAdmin(false)}
              className="font-mono text-xs text-dust-500 border border-saddle-700/30 px-3 py-1.5 rounded hover:border-blood-500 hover:text-blood-400 transition-colors uppercase tracking-wider"
            >
              Lock Admin
            </button>
          </div>
        )}

        {/* Public Bio */}
        <div className="sepia-card p-8 rounded-lg mb-10">
          <h3 className="font-display text-2xl text-ember mb-6">The Public Record</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-ember uppercase tracking-widest text-xs mb-3">Who I Am</h4>
              <p className="font-body text-dust-300 text-sm leading-relaxed">
                A self-taught developer riding the frontier of web development. I build things from scratch — portfolios, tools, projects that solve real problems. Currently sharpening my skills in React, DSA, and full-stack development.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-ember uppercase tracking-widest text-xs mb-3">What I'm Building</h4>
              <div className="space-y-2">
                {['Web Development (React, HTML, CSS, JS)', 'Data Structures & Algorithms', 'Database Management (Supabase)', 'Real-world Projects & Startups'].map(skill => (
                  <div key={skill} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0" />
                    <span className="font-body text-dust-400 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-mono text-ember uppercase tracking-widest text-xs mb-3">My Mission</h4>
              <p className="font-body text-dust-300 text-sm leading-relaxed">
                Reach industry-level understanding through building — not just reading. Every project is a step toward creating something that matters.
              </p>
            </div>
            <div>
              <h4 className="font-mono text-ember uppercase tracking-widest text-xs mb-3">Current Focus</h4>
              <p className="font-body text-dust-300 text-sm leading-relaxed">
                Building this portfolio as a living document of my growth. Documenting every deed on the frontier — the wins, the lessons, and the road ahead.
              </p>
            </div>
          </div>
        </div>

        {/* Thoughts Section */}
        <div className="sepia-card p-8 rounded-lg">
          <h3 className="font-display text-2xl text-ember mb-2">Inner Thoughts</h3>
          <p className="font-mono text-dust-500 text-xs uppercase tracking-widest mb-8">
            Reflections on career, life, relationships, spirituality & more
          </p>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Add Thought — admin only */}
            {isAdmin && (
              <div>
                <h4 className="font-display text-lg text-ember mb-4">New Thought</h4>
                <form onSubmit={addThought} className="space-y-3">
                  <textarea
                    placeholder="Write your thoughts..."
                    rows="5"
                    value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    className={inputClass}
                    required
                  />
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className={inputClass}
                  >
                    {THOUGHT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-blood-600 hover:bg-blood-500 text-parchment font-mono uppercase tracking-widest text-sm rounded transition-all border border-blood-500/30 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Seal It'}
                  </button>
                </form>
              </div>
            )}

            {/* Thoughts List */}
            <div className={isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', ...THOUGHT_CATEGORIES].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-mono text-xs px-3 py-1.5 rounded border uppercase tracking-wider transition-all ${
                      activeCategory === cat
                        ? 'bg-ember/20 text-ember border-ember/50'
                        : 'bg-darkwood/50 text-dust-500 border-saddle-700/30 hover:border-saddle-500/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {loading ? (
                  <p className="text-center font-mono text-dust-500 py-8 uppercase tracking-widest text-sm">Loading thoughts...</p>
                ) : filtered.length === 0 ? (
                  <p className="text-center font-mono text-dust-500 py-8 uppercase tracking-widest text-sm">No thoughts recorded yet</p>
                ) : (
                  <AnimatePresence>
                    {filtered.map(thought => (
                      <motion.div
                        key={thought.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="sepia-card p-5 rounded-lg hover:border-saddle-500/50 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryStyle(thought.category)}`}>
                            {thought.category}
                          </span>
                          {/* Delete only in admin mode */}
                          {isAdmin && (
                            <button
                              onClick={() => deleteThought(thought.id)}
                              className="text-dust-500 hover:text-blood-400 transition-colors"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          )}
                        </div>
                        <p className="font-body text-dust-300 text-sm italic leading-relaxed">
                          "{thought.content}"
                        </p>
                        <p className="font-mono text-dust-600 text-xs mt-3">
                          {new Date(thought.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutInner