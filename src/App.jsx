import { useMemo, useState } from 'react'
import Header from './components/Header'
import Selector from './components/Selector'
import Content from './components/Content'
import UploadCurriculum from './components/UploadCurriculum'
import Quiz from './components/Quiz'
import ReportCard from './components/ReportCard'

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])
  const [explanation, setExplanation] = useState(null)
  const [practice, setPractice] = useState(null)
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="relative max-w-5xl mx-auto px-4 py-10">
        <Header lang={lang} setLang={setLang} />
        <UploadCurriculum baseUrl={baseUrl} onUploaded={()=>{}} />
        <Selector baseUrl={baseUrl} onExplain={setExplanation} onPractice={setPractice} lang={lang} />
        <Content explanation={explanation} practice={practice} lang={lang} />
        <Quiz baseUrl={baseUrl} lang={lang} />
        <ReportCard baseUrl={baseUrl} lang={lang} />
      </div>
    </div>
  )
}

export default App
