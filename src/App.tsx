import { useTodos }    from '@/hooks/useTodos'
import { useDarkMode } from '@/hooks/useDarkMode'
import Header          from '@/components/Header'
import AddTaskForm     from '@/components/AddTaskForm'
import FilterBar       from '@/components/FilterBar'
import TodoList        from '@/components/TodoList'

export default function App() {
  const { dark, toggle } = useDarkMode()

  const {
    filtered,
    filter,
    setFilter,
    stats,
    addTodo,
    toggleDone,
    deleteTodo,
    reorder,
    clearDone,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-12 transition-colors duration-200">
      <Header
        stats={stats}
        dark={dark}
        onToggleDark={toggle}
      />

      <AddTaskForm onAdd={addTodo} />

      <FilterBar active={filter} onChange={setFilter} />

      <TodoList
        todos={filtered}
        onToggle={toggleDone}
        onDelete={deleteTodo}
        onReorder={reorder}
        onClearDone={clearDone}
      />
    </div>
  )
}
