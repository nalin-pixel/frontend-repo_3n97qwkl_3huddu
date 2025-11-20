import { GraduationCap } from 'lucide-react'

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 text-blue-200 border border-blue-400/20 mb-4">
        <GraduationCap className="w-5 h-5" />
        <span className="text-sm tracking-wide">AI Math Tutor</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
        Learn Math from 2nd Grade to Masters
      </h1>
      <p className="text-blue-200/80 mt-3 max-w-2xl mx-auto">
        Pick a level and topic, read a short explanation, and practice with step‑by‑step solutions.
      </p>
    </div>
  )
}
