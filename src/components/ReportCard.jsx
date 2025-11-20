import { useEffect, useState } from 'react'
import { t } from '../lib/i18n'

export default function ReportCard({ baseUrl, lang }) {
  const [user, setUser] = useState('')
  const [data, setData] = useState(null)

  const load = async () => {
    if (!user) return
    const res = await fetch(`${baseUrl}/api/report/${encodeURIComponent(user)}`)
    const d = await res.json()
    setData(d)
  }

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-2xl p-4 md:p-6 mt-6">
      <h3 className="text-white font-semibold text-lg mb-3">{t(lang,'report')}</h3>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="block text-sm text-blue-200/70 mb-1">{t(lang,'userName')}</label>
          <input value={user} onChange={e=>setUser(e.target.value)} className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
        </div>
        <button onClick={load} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Load</button>
      </div>

      {data && (
        <div className="mt-4 text-blue-100">
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
              <div className="text-sm text-blue-300/80">{t(lang,'points')}</div>
              <div className="text-2xl font-bold">{data.points}</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
              <div className="text-sm text-blue-300/80">{t(lang,'quizzes')}</div>
              <div className="text-2xl font-bold">{data.quizzes}</div>
            </div>
          </div>
          {Object.keys(data.per_topic||{}).length>0 && (
            <div className="mt-4">
              <div className="text-blue-300 text-sm mb-2">Per Topic</div>
              <ul className="space-y-2">
                {Object.entries(data.per_topic).map(([k,v]) => (
                  <li key={k} className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 flex justify-between">
                    <div>{k}</div>
                    <div className="text-sm">Attempts: {v.attempts} | Best: {v.best.toFixed(1)}% | Avg: {v.avg.toFixed(1)}%</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.recent?.length>0 && (
            <div className="mt-4">
              <div className="text-blue-300 text-sm mb-2">{t(lang,'recent')}</div>
              <ul className="space-y-2">
                {data.recent.map(r => (
                  <li key={r.quiz_id} className="bg-slate-900/60 border border-slate-700 rounded-xl p-3 flex justify-between">
                    <div>{r.topic}</div>
                    <div className="text-sm">{r.points} pts | {r.score.toFixed(1)}%</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
