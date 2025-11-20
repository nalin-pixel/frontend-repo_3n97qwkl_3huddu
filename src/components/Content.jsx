export default function Content({ explanation, practice }) {
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-800/50 border border-blue-400/20 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-lg mb-2">Concept</h3>
        {explanation ? (
          <div className="text-blue-100">
            <h4 className="text-xl font-bold mb-2 font-handwriting">{explanation.title}</h4>
            <p className="mb-3 text-blue-200/80 font-handwriting text-lg leading-relaxed">{explanation.summary}</p>
            {explanation.key_points && (
              <ul className="list-disc list-inside space-y-1 text-base text-blue-200/90 font-handwriting">
                {explanation.key_points.map((k,i)=>(<li key={i}>{k}</li>))}
              </ul>
            )}
            {explanation.examples?.length>0 && (
              <div className="mt-3">
                <div className="text-blue-300 text-sm mb-1">Examples</div>
                <ul className="list-disc list-inside space-y-1 text-base font-handwriting">
                  {explanation.examples.map((e,i)=>(<li key={i}>{e}</li>))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-blue-300/70">Select a topic and click Explain to see an overview.</p>
        )}
      </div>
      <div className="bg-slate-800/50 border border-blue-400/20 rounded-2xl p-5">
        <h3 className="text-white font-semibold text-lg mb-2">Practice</h3>
        {practice?.problems?.length ? (
          <div className="space-y-4">
            {practice.problems.map((p)=> (
              <div key={p.id} className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
                <div className="text-blue-100 font-medium font-handwriting text-lg">{p.question}</div>
                <details className="mt-2 group">
                  <summary className="cursor-pointer text-blue-300 hover:text-white transition-colors">Show answer & steps</summary>
                  <div className="mt-2 text-sm text-blue-200/90">
                    <div className="font-semibold">Answer: <span className="font-mono">{Array.isArray(p.answer) ? JSON.stringify(p.answer) : String(p.answer)}</span></div>
                    <ul className="list-decimal list-inside mt-2 space-y-1 font-handwriting text-base">
                      {p.steps.map((s,i)=>(<li key={i}>{s}</li>))}
                    </ul>
                  </div>
                </details>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-blue-300/70">Click Practice to generate problems with step‑by‑step solutions.</p>
        )}
      </div>
    </div>
  )
}
