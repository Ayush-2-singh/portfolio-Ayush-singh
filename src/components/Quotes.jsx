import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { GiBookmark } from 'react-icons/gi'

const PASSWORD = 'frontier2026'
const SUBJECTS = ['DSA', 'OJT', 'DBMS', 'Maths', 'Java']

const subjectStyle = (sub) => ({
  DSA: 'bg-blood-700/30 text-blood-400 border-blood-700/50',
  OJT: 'bg-saddle-800/60 text-ember border-saddle-600/50',
  DBMS: 'bg-[#1a2e1a]/60 text-green-400 border-green-900/50',
  Maths: 'bg-[#1a1a2e]/60 text-blue-300 border-blue-900/50',
  Java: 'bg-[#2e1a2e]/60 text-pink-300 border-pink-900/50',
}[sub] || 'bg-dust-600/10 text-dust-400')

const RevisionTracker = () => {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeSubject, setActiveSubject] = useState('All')
  const [form, setForm] = useState({ content: '', category: 'DSA' })
  const [submitting, setSubmitting] = useState(false)

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const inputClass = "w-full p-3 bg-darkwood/80 border border-saddle-700/50 rounded font-body text-dust-300 placeholder-dust-600 focus:outline-none focus:border-ember/60 transition-colors text-sm"

  useEffect(() => { fetchTopics() }, [])

  const fetchTopics = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setTopics(data || [])
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

  const addTopic = async (e) => {
    e.preventDefault()
    if (!form.content.trim()) return
    setSubmitting(true)
    const { error } = await supabase.from('quotes').insert([{ ...form }])
    if (!error) {
      setForm({ ...form, content: '' })
      await fetchTopics()
    }
    setSubmitting(false)
  }

  const deleteTopic = async (id) => {
    if (confirm('Mark as revised and remove?')) {
      await supabase.from('quotes').delete().eq('id', id)
      await fetchTopics()
    }
  }

  const filtered = activeSubject === 'All'
    ? topics
    : topics.filter(t => t.category === activeSubject)

  const counts = SUBJECTS.reduce((acc, sub) => {
    acc[sub] = topics.filter(t => t.category === sub).length
    return acc
  }, {})

  return (
    <section id="revision" className="py-20 px-6 bg-gradient-to-b from-[#1a0f05] to-[#0d0705]">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-saddle-500" />
            <GiBookmark className="text-ember text-3xl" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-saddle-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ember worn-text">The Struggle Ledger</h2>
          <p className="font-mono text-dust-500 text-xs tracking-widest uppercase mt-2">Topics that need revisiting before the battle</p>

          {/* Hidden admin toggle */}
          <button
            onClick={() => setShowPasswordInput(!showPasswordInput)}
            className="mt-4 text-dust-700 hover:text-dust-500 transition-colors"
            title="Admin"
          >
            <FiLock size={12} />
          </button>
        </div>

        {/* Password input — only shows when lock clicked */}
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

        {/* Subject Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {SUBJECTS.map(sub => (
            <div key={sub} className="sepia-card p-4 rounded-lg text-center">
              <p className="font-display text-2xl text-ember">{counts[sub] || 0}</p>
              <p className="font-mono text-dust-500 text-xs uppercase tracking-widest mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Add Topic — only visible in admin mode */}
          {isAdmin && (
            <div className="sepia-card p-6 rounded-lg">
              <h3 className="font-display text-xl text-ember mb-5">Log a Struggle</h3>
              <form onSubmit={addTopic} className="space-y-3">
                <input
                  type="text"
                  placeholder="Topic you're struggling with..."
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
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-blood-600 hover:bg-blood-500 text-parchment font-mono uppercase tracking-widest text-sm rounded transition-all border border-blood-500/30 disabled:opacity-50"
                >
                  {submitting ? 'Logging...' : 'Mark It'}
                </button>
              </form>
            </div>
          )}

          {/* Topics List */}
          <div className={isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <div className="flex flex-wrap gap-2 mb-5">
              {['All', ...SUBJECTS].map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubject(sub)}
                  className={`font-mono text-xs px-3 py-1.5 rounded border uppercase tracking-wider transition-all ${
                    activeSubject === sub
                      ? 'bg-ember/20 text-ember border-ember/50'
                      : 'bg-darkwood/50 text-dust-500 border-saddle-700/30 hover:border-saddle-500/50'
                  }`}
                >
                  {sub} {sub !== 'All' && counts[sub] > 0 && `(${counts[sub]})`}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {loading ? (
                <p className="text-center font-mono text-dust-500 py-8 uppercase tracking-widest text-sm">Loading ledger...</p>
              ) : filtered.length === 0 ? (
                <p className="text-center font-mono text-dust-500 py-8 uppercase tracking-widest text-sm">
                  {activeSubject === 'All' ? 'No struggles logged' : `No ${activeSubject} topics logged`}
                </p>
              ) : (
                <AnimatePresence>
                  {filtered.map(topic => (
                    <motion.div
                      key={topic.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="sepia-card p-4 rounded-lg hover:border-saddle-500/50 transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded border flex-shrink-0 ${subjectStyle(topic.category)}`}>
                          {topic.category}
                        </span>
                        <p className="font-body text-dust-300 text-sm truncate">{topic.content}</p>
                      </div>
                      {/* Delete only visible in admin mode */}
                      {isAdmin && (
                        <button
                          onClick={() => deleteTopic(topic.id)}
                          title="Mark as revised"
                          className="text-dust-500 hover:text-green-400 transition-colors flex-shrink-0"
                        >
                          <FiCheck size={16} />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {filtered.length > 0 && (
              <p className="font-mono text-dust-600 text-xs mt-4 text-right uppercase tracking-widest">
                {filtered.length} topic{filtered.length > 1 ? 's' : ''} pending revision
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RevisionTracker