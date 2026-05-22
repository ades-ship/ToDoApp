# Todo App

A mobile-first todo app built with **React 18**, **TypeScript**, and **Tailwind CSS v3**.

## Features

- ✅ Add / complete / delete tasks
- 🏷️ Categories — Work, Personal, Health, Urgent, Other
- 📅 Due dates with human-readable labels (Today, Tomorrow, Xd overdue)
- 🔀 Drag-to-reorder tasks
- 🔍 Filter by status or category
- 🌙 Dark mode (auto-detects system preference, toggle in header)
- 💾 Persistent storage via `localStorage`

## Project structure

```
src/
├── components/
│   ├── Header.tsx        # Stats + dark mode toggle
│   ├── AddTaskForm.tsx   # New task input card
│   ├── FilterBar.tsx     # Scrollable filter chips
│   ├── TodoList.tsx      # List container + empty state
│   └── TodoItem.tsx      # Single task row
│
├── hooks/
│   ├── useTodos.ts       # All todo state & CRUD logic
│   ├── useDarkMode.ts    # Dark mode toggle + persistence
│   └── useDragAndDrop.ts # HTML drag-event helpers
│
├── utils/
│   ├── constants.ts      # TAG_META, FILTER_OPTIONS, STORAGE_KEY
│   ├── dateUtils.ts      # todayISO, formatDueDate, isOverdue
│   ├── filterUtils.ts    # applyFilter
│   └── storage.ts        # loadTodos / saveTodos (localStorage)
│
├── types/
│   └── index.ts          # Todo, Tag, FilterKey, TodoStats types
│
├── App.tsx               # Root composition
├── main.tsx              # React entry point
└── index.css             # Tailwind directives + global resets
```

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build
```
