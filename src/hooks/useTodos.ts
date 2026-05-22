import { useState, useCallback, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { FilterKey, Tag, Todo, TodoStats } from '@/types'
import { loadTodos, saveTodos } from '@/utils/storage'
import { applyFilter } from '@/utils/filterUtils'
import { isOverdue } from '@/utils/dateUtils'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())
  const [filter, setFilter] = useState<FilterKey>('all')

  // Persist on every change
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  // ── CRUD ────────────────────────────────────────────────────────────────

  const addTodo = useCallback((text: string, tag: Tag, due: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos(prev => {
      const newTodo: Todo = {
        id: uuidv4(),
        text: trimmed,
        tag,
        due,
        done: false,
        createdAt: Date.now(),
        order: 0,           // will be sorted by insertion (unshift equivalent)
      }
      return [newTodo, ...prev]
    })
  }, [])

  const toggleDone = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  const reorder = useCallback((fromId: string, toId: string) => {
    setTodos(prev => {
      const next = [...prev]
      const fromIdx = next.findIndex(t => t.id === fromId)
      const toIdx   = next.findIndex(t => t.id === toId)
      if (fromIdx < 0 || toIdx < 0) return prev
      const [moved] = next.splice(fromIdx, 1)
      next.splice(toIdx, 0, moved)
      return next
    })
  }, [])

  const clearDone = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.done))
  }, [])

  // ── Derived ─────────────────────────────────────────────────────────────

  const filtered = applyFilter(todos, filter)

  const stats: TodoStats = {
    total:   todos.length,
    done:    todos.filter(t => t.done).length,
    overdue: todos.filter(t => !t.done && isOverdue(t.due)).length,
  }

  return {
    todos,
    filtered,
    filter,
    setFilter,
    stats,
    addTodo,
    toggleDone,
    deleteTodo,
    reorder,
    clearDone,
  }
}
