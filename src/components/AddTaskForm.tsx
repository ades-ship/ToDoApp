import { useState, useRef } from 'react'
import type { Tag } from '@/types'
import { TAG_META } from '@/utils/constants'
import { tomorrowISO } from '@/utils/dateUtils'

interface AddTaskFormProps {
  onAdd: (text: string, tag: Tag, due: string) => void
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [text, setText]   = useState('')
  const [tag, setTag]     = useState<Tag>('work')
  const [due, setDue]     = useState(tomorrowISO)
  const inputRef          = useRef<HTMLInputElement>(null)

  function handleSubmit() {
    if (!text.trim()) {
      inputRef.current?.focus()
      return
    }
    onAdd(text, tag, due)
    setText('')
    setDue(tomorrowISO())
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="mx-4 -mt-7 relative z-20">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-gray-800">

        {/* Task text input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          maxLength={120}
          className="
            w-full text-sm text-gray-800 dark:text-gray-100
            bg-gray-50 dark:bg-gray-800
            rounded-xl px-4 py-3 mb-3
            border border-gray-200 dark:border-gray-700
            outline-none focus:border-brand-400
            placeholder-gray-400 dark:placeholder-gray-500
            transition-colors
          "
        />

        {/* Tag + date row */}
        <div className="flex gap-2 mb-3">
          <select
            value={tag}
            onChange={e => setTag(e.target.value as Tag)}
            className="
              flex-1 text-sm
              bg-gray-50 dark:bg-gray-800
              text-gray-700 dark:text-gray-200
              border border-gray-200 dark:border-gray-700
              rounded-xl px-3 py-2.5 outline-none focus:border-brand-400
              transition-colors
            "
          >
            {(Object.entries(TAG_META) as [Tag, (typeof TAG_META)[Tag]][]).map(([key, meta]) => (
              <option key={key} value={key}>
                {meta.emoji} {meta.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={due}
            onChange={e => setDue(e.target.value)}
            className="
              flex-1 text-sm
              bg-gray-50 dark:bg-gray-800
              text-gray-700 dark:text-gray-200
              border border-gray-200 dark:border-gray-700
              rounded-xl px-3 py-2.5 outline-none focus:border-brand-400
              transition-colors
            "
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="
            w-full bg-brand-500 hover:bg-brand-600 active:scale-[0.98]
            text-white font-medium text-sm rounded-xl py-3
            flex items-center justify-center gap-2
            transition-all duration-150
          "
        >
          <PlusIcon />
          Add Task
        </button>
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  )
}
