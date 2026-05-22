import type { Todo } from '@/types'
import { TAG_META } from '@/utils/constants'
import { formatDueDate, isOverdue } from '@/utils/dateUtils'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  dragProps: React.HTMLAttributes<HTMLDivElement>
}

export default function TodoItem({ todo, onToggle, onDelete, dragProps }: TodoItemProps) {
  const meta     = TAG_META[todo.tag]
  const overdue  = !todo.done && isOverdue(todo.due)
  const dateStr  = formatDueDate(todo.due)

  return (
    <div
      {...dragProps}
      className="
        bg-white dark:bg-gray-900
        rounded-2xl border border-gray-100 dark:border-gray-800
        p-4 flex items-start gap-3
        active:scale-[0.99] transition-all duration-150
        select-none
      "
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.done}
        aria-label={`Mark "${todo.text}" as ${todo.done ? 'undone' : 'done'}`}
        className={`
          mt-0.5 w-[22px] h-[22px] rounded-full flex-shrink-0 flex items-center justify-center
          border-2 transition-all duration-200
          ${todo.done
            ? 'bg-brand-500 border-brand-500'
            : 'border-gray-300 dark:border-gray-600 bg-transparent hover:border-brand-400'
          }
        `}
      >
        {todo.done && <CheckIcon />}
      </button>

      {/* Text + meta */}
      <div className="flex-1 min-w-0">
        <p
          className={`
            text-sm font-medium leading-snug
            ${todo.done
              ? 'line-through text-gray-400 dark:text-gray-600'
              : 'text-gray-800 dark:text-gray-100'}
          `}
        >
          {todo.text}
        </p>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {/* Tag pill */}
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${meta.pillClass}`}>
            {meta.emoji} {meta.label}
          </span>

          {/* Due date */}
          {todo.due && (
            <span
              className={`text-xs flex items-center gap-1 ${
                overdue
                  ? 'text-orange-500 font-medium'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <CalendarIcon />
              {dateStr}
            </span>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1 mt-0.5 flex-shrink-0">
        <span
          className="text-gray-300 dark:text-gray-600 cursor-grab px-1 text-lg"
          aria-hidden="true"
        >
          ⠿
        </span>
        <button
          onClick={() => onDelete(todo.id)}
          aria-label={`Delete "${todo.text}"`}
          className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors p-1 rounded-lg"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}

// ─── Inline icons ─────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}
