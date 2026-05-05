import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi'
import { GiScrollQuill } from 'react-icons/gi'

const categoryStyle = (cat) => ({
  Work: 'bg-blood-700/30 text-blood-400 border-blood-700/50',
  Learning: 'bg-saddle-800/60 text-ember border-saddle-600/50',
  Personal: 'bg-[#1a2e1a]/60 text-green-400 border-green-900/50',
  Other: 'bg-dust-600/10 text-dust-400 border-dust-600/30',
}[cat] || 'bg-dust-600/10 text-dust-400')

const DailyLog = () => {
  const [tasks, setTasks] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchDate, setSearchDate] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '', description: '', category: 'Personal'
  })
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})

  useEffect(() => { fetchTasks() }, [])

  const fetchTasks = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('tasks').select('*').order('date', { ascending: false }).limit(20)
    if (!error) { setTasks(data || []); setFiltered(data || []) }
    setLoading(false)
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const { error } = await supabase.from('tasks').insert([{ ...form }])
    if (!error) {
      setForm({ ...form, title: '', description: '' })
      await fetchTasks()
      if (isSearch) clearSearch()
    }
  }

  const deleteTask = async (id) => {
    if (confirm('Delete this entry, partner?')) {
      await supabase.from('tasks').delete().eq('id', id)
      await fetchTasks()
      if (isSearch) clearSearch()
    }
  }

  const updateTask = async () => {
    await supabase.from('tasks').update(editForm).eq('id', editing.id)
    setEditing(null)
    await fetchTasks()
    if (isSearch) clearSearch()
  }

  const searchByDate = async () => {
    if (!searchDate) return
    setLoading(true)
    const { data } = await supabase.from('tasks').select('*').eq('date', searchDate)
    setFiltered(data || [])
    setIsSearch(true)
    setLoading(false)
  }

  const clearSearch = () => { setSearchDate(''); setFiltered(tasks); setIsSearch(false) }

  const inputClass = "w-full p-3 bg-darkwood/80 border border-saddle-700/50 rounded font-body text-dust-300 placeholder-dust-600 focus:outline-none focus:border-ember/60 transition-colors text-sm"

  return (
    <section id="daily-log" className="py-20 px-6 bg-gradient-to-b from-[#0d0705] to-[#1a0f05]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-saddle-500" />
            <GiScrollQuill className="text-ember text-3xl" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-saddle-500" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-ember worn-text">The Trail Journal</h2>
          <p className="font-mono text-dust-500 text-xs tracking-widest uppercase mt-2">A record of deeds done on the frontier</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Add Entry */}
          <div className="sepia-card p-6 rounded-lg">
            <h3 className="font-display text-xl text-ember mb-5">New Entry</h3>
            <form onSubmit={addTask} className="space-y-3">
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputClass} />
              <input type="text" placeholder="Title of deed..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} required />
              <textarea placeholder="Describe your exploits..." rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass} />
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                <option>Work</option>
                <option>Learning</option>
                <option>Personal</option>
                <option>Other</option>
              </select>
              <button type="submit" className="w-full py-3 bg-blood-600 hover:bg-blood-500 text-parchment font-mono uppercase tracking-widest text-sm rounded transition-all border border-blood-500/30 shadow-[0_0_15px_#c0392b30]">
                Brand It
              </button>
            </form>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="sepia-card p-4 rounded-lg mb-5">
              <h3 className="font-mono text-ember uppercase tracking-widest text-xs mb-3">Search by Date</h3>
              <div className="flex gap-3">
                <input type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} className={`flex-1 ${inputClass}`} />
                <button onClick={searchByDate} className="px-4 py-2 bg-saddle-700 hover:bg-saddle-600 text-parchment font-mono text-xs uppercase tracking-wider rounded transition-colors">
                  Scout
                </button>
                {isSearch && (
                  <button onClick={clearSearch} className="px-4 py-2 border border-saddle-600 text-dust-400 font-mono text-xs uppercase tracking-wider rounded hover:border-ember transition-colors">
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {loading ? (
                <p className="text-center font-mono text-dust-500 py-8 uppercase tracking-widest text-sm">Riding in...</p>
              ) : filtered.length === 0 ? (
                <p className="text-center font-mono text-dust-500 py-8 uppercase tracking-widest text-sm">No deeds recorded</p>
              ) : (
                <AnimatePresence>
                  {filtered.map(task => (
                    <motion.div
                      key={task.id} layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="sepia-card p-5 rounded-lg hover:border-saddle-500/50 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs text-saddle-400">{task.date}</span>
                          <span className={`font-mono text-xs px-2 py-0.5 rounded border ${categoryStyle(task.category)}`}>
                            {task.category}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => { setEditing(task); setEditForm(task) }} className="text-dust-500 hover:text-ember transition-colors">
                            <FiEdit2 size={14} />
                          </button>
                          <button onClick={() => deleteTask(task.id)} className="text-dust-500 hover:text-blood-400 transition-colors">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-display text-lg text-ember mt-2">{task.title}</h4>
                      {task.description && (
                        <p className="font-body text-dust-400 text-sm mt-1 italic">"{task.description}"</p>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sepia-card p-6 rounded-lg max-w-md w-full relative wanted-border"
          >
            <h3 className="font-display text-xl text-ember mb-5">Amend the Record</h3>
            <div className="space-y-3">
              <input type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} className={inputClass} />
              <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className={inputClass} />
              <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows="3" className={inputClass} />
              <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} className={inputClass}>
                <option>Work</option>
                <option>Learning</option>
                <option>Personal</option>
                <option>Other</option>
              </select>
              <button onClick={updateTask} className="w-full py-3 bg-blood-600 hover:bg-blood-500 text-parchment font-mono uppercase tracking-widest text-sm rounded transition-all flex items-center justify-center gap-2">
                <FiSave /> Seal It
              </button>
            </div>
            <button onClick={() => setEditing(null)} className="absolute top-4 right-4 text-dust-500 hover:text-ember transition-colors">
              <FiX />
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default DailyLog