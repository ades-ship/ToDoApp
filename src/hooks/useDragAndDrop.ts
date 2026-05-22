import { useRef } from 'react'

interface UseDragAndDropOptions {
  onReorder: (fromId: string, toId: string) => void
}

export function useDragAndDrop({ onReorder }: UseDragAndDropOptions) {
  const dragId = useRef<string | null>(null)

  function getDragProps(id: string) {
    return {
      draggable: true as const,

      onDragStart(e: React.DragEvent) {
        dragId.current = id
        e.dataTransfer.effectAllowed = 'move'
        // slight delay so the browser renders the ghost before we fade the item
        requestAnimationFrame(() => {
          ;(e.target as HTMLElement).style.opacity = '0.4'
        })
      },

      onDragEnd(e: React.DragEvent) {
        ;(e.target as HTMLElement).style.opacity = ''
        dragId.current = null
      },

      onDragOver(e: React.DragEvent) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      },

      onDrop(e: React.DragEvent) {
        e.preventDefault()
        if (dragId.current && dragId.current !== id) {
          onReorder(dragId.current, id)
        }
      },
    }
  }

  return { getDragProps }
}
