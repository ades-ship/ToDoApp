import type { FilterOption, TagMeta, Tag } from '@/types'

export const TAG_META: Record<Tag, TagMeta> = {
  work: {
    emoji: '💼',
    label: 'Work',
    pillClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  },
  personal: {
    emoji: '🏠',
    label: 'Personal',
    pillClass: 'bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
  },
  health: {
    emoji: '💪',
    label: 'Health',
    pillClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  },
  urgent: {
    emoji: '🔥',
    label: 'Urgent',
    pillClass: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
  },
  other: {
    emoji: '📌',
    label: 'Other',
    pillClass: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  },
}

export const FILTER_OPTIONS: FilterOption[] = [
  { key: 'all',      label: 'All' },
  { key: 'active',   label: 'Active' },
  { key: 'done',     label: 'Done' },
  { key: 'work',     label: '💼 Work' },
  { key: 'personal', label: '🏠 Personal' },
  { key: 'health',   label: '💪 Health' },
  { key: 'urgent',   label: '🔥 Urgent' },
  { key: 'other',    label: '📌 Other' },
]

export const STORAGE_KEY = 'todoapp_v1_todos'
