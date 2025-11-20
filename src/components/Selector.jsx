import { useEffect, useState } from 'react'

export default function Selector({ baseUrl, onExplain, onPractice }) {
  const [levels, setLevels] = useState([])
  const [level, setLevel] = useState('')
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState(1)
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/levels`)
        const data = await res.json()
        setLevels(data)
        setLevel(data[0])
      } catch (e) {
        setError('Failed to load levels')
      }
    }
    load()
  }, [baseUrl])

  useEffect(() => {
    const loadTopics = async () => {
      if (!level) return
      try {
        const res = await fetch(`${baseUrl}/api/topics?level=${encodeURIComponent(level)}`)
        const data = await res.json()
        setTopics(data)
        setTopic(data[0]?.key || '')
      } catch (e) {
        setError('Failed to load topics')
      }
    }
    loadTopics()
  }, [baseUrl, level])

  const handleExplain = async () => {
    if (!topic) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/explain?topic=${encodeURIComponent(topic)}`)
      const data = await res.json()
      onExplain(data)
    } catch (e) {
      setError('Failed to load explanation')
    } finally {
      setLoading(false)
    }
  }

  const handlePractice = async () => {
    if (!topic) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/practice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, count })
      })
      const data = await res.json()
      onPractice(data)
    } catch (e) {
      setError('Failed to load practice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-2xl p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-blue-200/70 mb-1">Level</label>
          <select value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700">
            {levels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200/70 mb-1">Topic</label>
          <select value={topic} onChange={(e)=>setTopic(e.target.value)} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700">
            {topics.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-blue-200/70 mb-1">Difficulty</label>
            <input type="range" min={1} max={5} value={difficulty} onChange={(e)=>setDifficulty(parseInt(e.target.value))} className="w-full" />
            <div className="text-xs text-blue-200/60">{difficulty}</div>
          </div>
          <div>
            <label className="block text-sm text-blue-200/70 mb-1">Problems</label>
            <input type="number" min={1} max={20} value={count} onChange={(e)=>setCount(parseInt(e.target.value||'1'))} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <button onClick={handleExplain} disabled={loading} className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Explain</button>
        <button onClick={handlePractice} disabled={loading} className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Practice</button>
      </div>
      {error && <p className="text-red-300 mt-3 text-sm">{error}</p>}
    </div>
  )
}
