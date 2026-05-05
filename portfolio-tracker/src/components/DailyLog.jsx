import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi'

const DailyLog = () => {
  const [tasks, setTasks] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchDate, setSearchDate] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], title: '', description: '', category: 'Personal' })
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
    await supabase.from('tasks').insert([form])
    setForm({ ...form, title: '', description: '' })
    fetchTasks()
    if (isSearch) clearSearch()
  }

  const deleteTask = async (id) => {
    if (confirm('Delete?')) await supabase.from('tasks').delete().eq('id', id)
    fetchTasks()
    if (isSearch) clearSearch()
  }

  const updateTask = async () => {
    await supabase.from('tasks').update(editForm).eq('id', editing.id)
    setEditing(null)
    fetchTasks()
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

  const categoryColor = (cat) => ({ Work:'bg-blue-500/20 text-blue-300', Learning:'bg-purple-500/20 text-purple-300', Personal:'bg-emerald-500/20 text-emerald-300', Other:'bg-gray-500/20 text-gray-300' }[cat] || 'bg-gray-500/20')

  return (
    <section id="daily-log" className="py-20 px-6 bg-charcoal-800">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12"><h2 className="text-4xl md:text-5xl font-display font-bold">Daily <span className="text-electric-400">Task Log</span></h2><div className="w-20 h-1 bg-electric-500 mx-auto rounded-full"></div></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-transparent p-6 rounded-xl"><h3 className="text-2xl font-semibold text-electric-400 mb-4">Add Entry</h3>
            <form onSubmit={addTask} className="space-y-4"><input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded"/><input type="text" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded" required/><textarea placeholder="Description" rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded"/><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded"><option>Work</option><option>Learning</option><option>Personal</option><option>Other</option></select><button type="submit" className="w-full py-2 bg-electric-500 rounded font-semibold">Add Task</button></form>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-transparent p-6 rounded-xl mb-6"><h3 className="text-xl font-semibold text-electric-400">Search by Date</h3><div className="flex gap-3 mt-2"><input type="date" value={searchDate} onChange={e=>setSearchDate(e.target.value)} className="flex-1 p-2 bg-charcoal-700 rounded"/><button onClick={searchByDate} className="px-4 py-2 bg-electric-500 rounded">Search</button>{isSearch && <button onClick={clearSearch} className="px-4 py-2 border rounded">Show Latest</button>}</div></div>
            <div className="space-y-4 max-h-[600px] overflow-y-auto">{loading ? <p className="text-center">Loading...</p> : filtered.length===0 ? <p className="text-center">No tasks</p> : filtered.map(task=><motion.div key={task.id} layout className="bg-transparent p-4 rounded-xl"><div className="flex justify-between"><div><span className="text-sm text-electric-400">{task.date}</span><span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${categoryColor(task.category)}`}>{task.category}</span></div><div><button onClick={()=>{setEditing(task); setEditForm(task)}} className="mr-2"><FiEdit2/></button><button onClick={()=>deleteTask(task.id)}><FiTrash2/></button></div></div><h4 className="text-xl font-semibold mt-1">{task.title}</h4>{task.description && <p className="text-gray-300 text-sm mt-1">{task.description}</p>}</motion.div>)}</div>
          </div>
        </div>
      </div>
      {editing && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"><div className="bg-charcoal-800 p-6 rounded-xl max-w-md w-full"><h3 className="text-2xl font-semibold mb-4">Edit Task</h3><div className="space-y-3"><input type="date" value={editForm.date} onChange={e=>setEditForm({...editForm,date:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded"/><input type="text" value={editForm.title} onChange={e=>setEditForm({...editForm,title:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded"/><textarea value={editForm.description} onChange={e=>setEditForm({...editForm,description:e.target.value})} rows="3" className="w-full p-2 bg-charcoal-700 rounded"/><select value={editForm.category} onChange={e=>setEditForm({...editForm,category:e.target.value})} className="w-full p-2 bg-charcoal-700 rounded"><option>Work</option><option>Learning</option><option>Personal</option><option>Other</option></select><button onClick={updateTask} className="w-full py-2 bg-electric-500 rounded flex items-center justify-center gap-2"><FiSave/> Save</button></div><button onClick={()=>setEditing(null)} className="absolute top-4 right-4"><FiX/></button></div></div>}
    </section>
  )
}
export default DailyLog
