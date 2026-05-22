/**
 * Returns today's date as "YYYY-MM-DD"
 */
export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

/**
 * Returns tomorrow's date as "YYYY-MM-DD"
 */
export function tomorrowISO(): string {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

/**
 * Returns true if the given ISO date string is strictly before today.
 */
export function isOverdue(due: string): boolean {
  if (!due) return false
  return due < todayISO()
}

/**
 * Returns a human-readable label for a due date:
 *   "Today", "Tomorrow", "Yesterday", "3d overdue", "Jun 5"
 */
export function formatDueDate(due: string): string {
  if (!due) return ''

  const today = todayISO()
  if (due === today) return 'Today'

  const tomorrow = tomorrowISO()
  if (due === tomorrow) return 'Tomorrow'

  // diff in days
  const diffMs = new Date(due + 'T00:00:00').getTime() - new Date(today + 'T00:00:00').getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === -1) return 'Yesterday'
  if (diffDays < -1) return `${Math.abs(diffDays)}d overdue`

  return new Date(due + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
