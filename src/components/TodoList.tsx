import type { Todo } from '@/types'
import TodoItem from './TodoItem'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onReorder: (fromId: string, toId: string) => void
  onClearDone: () => void
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onReorder,
  onClearDone,
}: TodoListProps) {
  const { getDragProps } = useDragAndDrop({ onReorder })

  if (todos.length === 0) {
    return <EmptyState />
  }

  const hasDone = todos.some(t => t.done)

  return (
    <div className="mt-4 px-4">
      <div className="flex flex-col gap-3">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            dragProps={getDragProps(todo.id)}
          />
        ))}
      </div>

      {hasDone && (
        <button
          onClick={onClearDone}
          className="
            mt-5 w-full text-xs text-gray-400 dark:text-gray-600
            hover:text-red-400 dark:hover:text-red-500
            py-2 rounded-xl border border-dashed
            border-gray-200 dark:border-gray-800
            transition-colors
          "
        >
          Clear completed tasks
        </button>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4 text-gray-400 dark:text-gray-600">
      <div className="text-5xl mb-3">🗒️</div>
      <p className="text-sm font-medium">No tasks here</p>
      <p className="text-xs mt-1">Add something above to get started</p>
    </div>
  )
}
