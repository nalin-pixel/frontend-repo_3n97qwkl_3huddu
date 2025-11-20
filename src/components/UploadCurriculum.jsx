import { useEffect, useState } from 'react'
import { Upload } from 'lucide-react'

export default function UploadCurriculum({ baseUrl, onUploaded }) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [level, setLevel] = useState('')
  const [region, setRegion] = useState('')
  const [list, setList] = useState([])

  const loadList = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/curriculum`)
      const data = await res.json()
      setList(data)
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => { loadList() }, [baseUrl])

  const onFileChange = (e) => {
    setFiles(Array.from(e.target.files || []))
  }

  const upload = async (e) => {
    e.preventDefault()
    if (!files.length) return
    setLoading(true)
    setError('')
    try {
      for (const f of files) {
        const form = new FormData()
        form.append('file', f)
        if (level) form.append('level', level)
        if (region) form.append('region', region)
        const res = await fetch(`${baseUrl}/api/curriculum/upload`, { method: 'POST', body: form })
        if (!res.ok) throw new Error('Upload failed')
      }
      await loadList()
      setFiles([])
      if (onUploaded) onUploaded()
    } catch (e) {
      setError('Failed to upload')
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id) => {
    try {
      await fetch(`${baseUrl}/api/curriculum/${id}`, { method: 'DELETE' })
      await loadList()
    } catch (e) {}
  }

  return (
    <div className="bg-slate-800/50 border border-blue-400/20 rounded-2xl p-4 md:p-6 mt-6">
      <h3 className="text-white font-semibold text-lg mb-3 flex items-center gap-2"><Upload className="w-5 h-5"/> Upload curriculum (PDF)</h3>
      <form onSubmit={upload} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm text-blue-200/70 mb-1">Choose PDF(s)</label>
          <input type="file" accept="application/pdf" multiple onChange={onFileChange} className="block w-full text-sm text-blue-100" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/70 mb-1">Level (optional)</label>
          <input value={level} onChange={e=>setLevel(e.target.value)} placeholder="e.g., Grade 5" className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
        </div>
        <div>
          <label className="block text-sm text-blue-200/70 mb-1">Region/Country (optional)</label>
          <input value={region} onChange={e=>setRegion(e.target.value)} placeholder="e.g., UK Key Stage 2" className="w-full bg-slate-900 text-white rounded-lg px-3 py-2 border border-slate-700" />
        </div>
        <div className="md:col-span-4 flex gap-3">
          <button disabled={loading || !files.length} className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg">Upload</button>
          {error && <span className="text-red-300 text-sm">{error}</span>}
        </div>
      </form>

      {list?.length > 0 && (
        <div className="mt-4">
          <div className="text-blue-300 text-sm mb-2">Your uploaded curricula</div>
          <ul className="space-y-2">
            {list.map(doc => (
              <li key={doc.id} className="flex items-start justify-between bg-slate-900/60 border border-slate-700 rounded-lg p-3">
                <div>
                  <div className="text-blue-100 font-medium">{doc.name} <span className="text-xs text-blue-300/70">{doc.pages ? `${doc.pages} pages` : ''}</span></div>
                  {doc.text_preview && <div className="text-xs text-blue-300/70 mt-1 line-clamp-2">{doc.text_preview}</div>}
                </div>
                <button onClick={()=>remove(doc.id)} className="text-red-300 text-sm hover:text-red-200">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
