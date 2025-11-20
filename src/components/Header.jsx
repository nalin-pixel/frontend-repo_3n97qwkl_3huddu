import { GraduationCap } from 'lucide-react'
import { LANGS, t } from '../lib/i18n'
import { useState } from 'react'

export default function Header({ lang, setLang }) {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-end mb-3">
        <select value={lang} onChange={(e)=>setLang(e.target.value)} className="bg-slate-900 text-blue-100 border border-slate-700 rounded-lg px-3 py-2">
          {LANGS.map(l=> <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </div>
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 text-blue-200 border border-blue-400/20 mb-4">
        <GraduationCap className="w-5 h-5" />
        <span className="text-sm tracking-wide">{t(lang, 'appTitle')}</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        {t(lang, 'tagline')}
      </h1>
      <p className="text-blue-200/80 mt-3 max-w-2xl mx-auto">
        {t(lang, 'subtitle')}
      </p>
    </div>
  )
}
