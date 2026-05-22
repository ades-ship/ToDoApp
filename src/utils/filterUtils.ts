import type { FilterKey, Todo } from '@/types'

export function applyFilter(todos: Todo[], filter: FilterKey): Todo[] {
  switch (filter) {
    case 'all':    return todos
    case 'active': return todos.filter(t => !t.done)
    case 'done':   return todos.filter(t => t.done)
    default:       return todos.filter(t => t.tag === filter)
  }
}
