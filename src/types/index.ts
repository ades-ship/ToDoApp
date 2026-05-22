// ─── Todo ───────────────────────────────────────────────────────────────────

export type Tag = 'work' | 'personal' | 'health' | 'urgent' | 'other'

export interface Todo {
  id: string
  text: string
  tag: Tag
  due: string        // ISO date string "YYYY-MM-DD", empty string = no date
  done: boolean
  createdAt: number  // timestamp ms
  order: number      // for drag-to-reorder sorting
}

// ─── Filter ─────────────────────────────────────────────────────────────────

export type FilterKey = 'all' | 'active' | 'done' | Tag

export interface FilterOption {
  key: FilterKey
  label: string
}

// ─── Tag Meta ────────────────────────────────────────────────────────────────

export interface TagMeta {
  emoji: string
  label: string
  pillClass: string  // Tailwind classes for the colored pill
}

// ─── Stats ──────────────────────────────────────────────────────────────────

export interface TodoStats {
  total: number
  done: number
  overdue: number
}
