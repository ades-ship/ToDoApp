import type { FilterKey } from '@/types'
import { FILTER_OPTIONS } from '@/utils/constants'

interface FilterBarProps {
  active: FilterKey
  onChange: (key: FilterKey) => void
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="mt-5 px-4">
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={`
              flex-shrink-0 text-xs font-medium px-4 py-2 rounded-full border transition-all duration-150
              ${
                active === opt.key
                  ? 'bg-brand-500 text-white border-brand-500'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
