import { useMemo, useState } from 'react'
import Header from './components/Header'
import Selector from './components/Selector'
import Content from './components/Content'
import UploadCurriculum from './components/UploadCurriculum'

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [explanation, setExplanation] = useState(null)
  const [practice, setPractice] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <Header />
        <UploadCurriculum baseUrl={baseUrl} onUploaded={()=>{}} />
        <Selector baseUrl={baseUrl} onExplain={setExplanation} onPractice={setPractice} />
        <Content explanation={explanation} practice={practice} />
        <div className="text-center mt-10 text-blue-300/60 text-sm">Tip: Adjust difficulty and number of problems to your needs.</div>
      </div>
    </div>
  )
}

export default App
