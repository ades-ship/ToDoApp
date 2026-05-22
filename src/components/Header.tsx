import type { TodoStats } from '@/types'

interface HeaderProps {
  stats: TodoStats
  dark: boolean
  onToggleDark: () => void
}

export default function Header({ stats, dark, onToggleDark }: HeaderProps) {
  return (
    <div className="bg-brand-500 px-4 pt-10 pb-16 relative overflow-hidden">
      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 80% 10%, #fff 0%, transparent 55%)' }}
      />

      {/* Title row */}
      <div className="relative z-10 flex items-center justify-between mb-7">
        <div>
          <p className="text-indigo-200 text-xs font-medium uppercase tracking-widest">
            My Tasks
          </p>
          <h1 className="text-white text-2xl font-semibold mt-0.5">Today's Focus</h1>
        </div>

        {/* Dark-mode toggle */}
        <button
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Stats row */}
      <div className="relative z-10 grid grid-cols-3 gap-3">
        <StatCard label="Total"   value={stats.total}   valueClass="text-white" />
        <StatCard label="Done"    value={stats.done}    valueClass="text-emerald-300" />
        <StatCard label="Overdue" value={stats.overdue} valueClass="text-orange-300" />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  valueClass,
}: {
  label: string
  value: number
  valueClass: string
}) {
  return (
    <div className="bg-white/15 rounded-2xl px-3 py-3 text-center">
      <div className={`text-xl font-semibold ${valueClass}`}>{value}</div>
      <div className="text-indigo-200 text-xs mt-0.5">{label}</div>
    </div>
  )
}
