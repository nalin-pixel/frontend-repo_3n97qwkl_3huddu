import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

export default function Quiz({ baseUrl, lang }) {
  const [user, setUser] = useState('')
  const [topic, setTopic] = useState('arithmetic_addition')
  const [difficulty, setDifficulty] = useState(1)
  const [count, setCount] = useState(5)
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const start = async () => {
    const res = await fetch(`${baseUrl}/api/quiz/start`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user || 'guest', topic, difficulty, count, lang })
    })
    const data = await res.json()
    setQuiz(data)
    setAnswers(Array(data.questions.length).fill(''))
    setResult(null)
  }

  const submit = async () => {
    const res = await fetch(`${baseUrl}/api/quiz/submit`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_id: quiz.quiz_id, answers })
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-2xl p-4 md:p-6 mt-6">
      <h3 className="text-white font-semibold text-lg mb-3">{t(lang,'quiz')}</h3>
      {!quiz && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm text-blue-200/70 mb-1">{t(lang,'userName')}</label>
            <input value={user} onChange={e=>setUser(e.target.value)} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/70 mb-1">Topic</label>
            <select value={topic} onChange={e=>setTopic(e.target.value)} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700">
              <option value="arithmetic_addition">Addition</option>
              <option value="arithmetic_subtraction">Subtraction</option>
              <option value="arithmetic_multiplication">Multiplication</option>
              <option value="arithmetic_division">Division</option>
              <option value="fractions_basic">Fractions (Basics)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-blue-200/70 mb-1">{t(lang,'difficulty')}</label>
            <input type="range" min={1} max={5} value={difficulty} onChange={e=>setDifficulty(parseInt(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm text-blue-200/70 mb-1">{t(lang,'problems')}</label>
            <input type="number" min={1} max={20} value={count} onChange={e=>setCount(parseInt(e.target.value||'1'))} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
          </div>
          <div className="md:col-span-5">
            <button onClick={start} className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold py-2 px-4 rounded-lg">{t(lang,'startQuiz')}</button>
          </div>
        </div>
      )}

      {quiz && !result && (
        <div className="space-y-4">
          {quiz.questions.map((q, idx) => (
            <div key={q.id} className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
              <div className="text-blue-100 font-handwriting text-lg mb-2">{q.question}</div>
              <input value={answers[idx]} onChange={e=>{
                const arr = [...answers]; arr[idx] = e.target.value; setAnswers(arr)
              }} placeholder="Your answer" className="w-full bg-slate-800 text-white rounded-lg px-3 py-2 border border-slate-700" />
            </div>
          ))}
          <button onClick={submit} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg">{t(lang,'submitQuiz')}</button>
        </div>
      )}

      {result && (
        <div className="mt-4 text-blue-100">
          <div className="text-xl font-semibold">{t(lang,'report')}</div>
          <div className="mt-2">{t(lang,'points')}: <span className="font-bold">{result.points}</span> | Score: {result.score.toFixed(1)}% | Correct: {result.correct}/{result.total}</div>
        </div>
      )}
    </div>
  )
}
