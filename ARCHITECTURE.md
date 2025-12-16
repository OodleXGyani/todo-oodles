# Todo-Oodles Architecture Diagram

## Project Overview
**Todo-Oodles** is a React Native mobile application built with Expo, featuring a modern todo/task management system with Redux state management and custom theming.

## Technology Stack
- **Framework**: Expo React Native
- **Navigation**: Expo Router (File-based routing)
- **State Management**: Redux Toolkit
- **Styling**: React Native StyleSheet with custom theme system
- **Icons**: @expo/vector-icons (FontAwesome5)
- **Language**: TypeScript

## Architecture Layers

### 1. Application Layer (App Shell)
```
app/_layout.tsx (Root Layout)
├── Redux Provider (Store wrapper)
├── React Navigation Theme Provider
├── Stack Navigator
│   ├── Tab Layout (Bottom Tabs)
│   └── Modal Routes
└── StatusBar Configuration
```

### 2. Navigation Layer
```
Tab Navigator (Bottom Tabs)
├── Home Tab (app/(tabs)/index.tsx)
├── Tasks Tab (app/(tabs)/tasks.tsx)
└── Profile Tab (app/(tabs)/profile.tsx)
```

### 3. State Management Layer
```
Redux Store (store/index.ts)
└── Tasks Slice (store/tasksSlice.ts)
    ├── Task State: Task[]
    ├── Actions:
    │   ├── addTask(title, status)
    │   ├── deleteTask(id)
    │   ├── markTaskDone(id)
    │   └── moveTaskToUpcoming(id)
    └── Initial State with sample tasks
```

### 4. Custom Hooks Layer
```
useTask Hook (hooks/useTask.ts)
└── Returns filtered tasks:
    ├── currentTasks (status: 'current')
    ├── upcomingTasks (status: 'upcoming')
    └── completedTasks (status: 'completed')
```

### 5. Component Layer

#### Page Components
- **Home Page** (app/(tabs)/index.tsx)
  - Calendar component
  - Current tasks section
  - Scrollable layout

- **Tasks Page** (app/(tabs)/tasks.tsx)
  - Add task modal
  - Task summary header
  - All task sections
  - Empty state handling

- **Profile Page** (app/(tabs)/profile.tsx)
  - Placeholder for user profile

#### UI Components
```
components/
├── current-tasks-section.tsx    (Current tasks display & actions)
├── upcoming-tasks-section.tsx   (Upcoming tasks display & actions)
├── completed-tasks-section.tsx  (Completed tasks display & actions)
├── calendar.tsx                 (Calendar widget)
├── haptic-tab.tsx              (Custom tab with haptic feedback)
├── themed-text.tsx             (Themed text wrapper)
├── themed-view.tsx             (Themed view wrapper)
└── ui/                         (UI primitives)
    ├── collapsible.tsx
    ├── icon-symbol.tsx
    └── icon-symbol.ios.tsx
```

### 6. Styling & Theming Layer
```
constants/theme.ts (Color definitions)
├── Light theme colors
├── Dark theme colors
└── Theme utilities

styles/ (Inline styles in components)
├── Dynamic theming based on color scheme
├── Consistent spacing & typography
└── Platform-specific optimizations
```

### 7. Utilities Layer
```
hooks/
├── use-color-scheme.ts      (System theme detection)
├── use-color-scheme.web.ts  (Web-specific theme)
├── use-theme-color.ts       (Theme color utilities)
└── useTask.ts               (Task filtering logic)
```

## Data Flow Architecture

### Task Management Flow
```
User Action → Component → Dispatch Action → Redux Store → State Update → Re-render → UI Update
```

### Task Operations
1. **Add Task**: Modal Input → `addTask` action → Store update → Component re-render
2. **Delete Task**: Tap delete icon → `deleteTask` action → Store update → Remove from UI
3. **Mark Complete**: Tap check icon → `markTaskDone` action → Status change → Move to completed
4. **Move to Upcoming**: Tap upcoming action → `moveTaskToUpcoming` action → Status change

### Navigation Flow
```
App Launch → Root Layout → Tab Navigator → Selected Tab Screen → Component Mount → State Subscription
```

## Component Relationships

```
App Root (Provider + Theme + Navigation)
├── Tab Layout
│   ├── Home Tab
│   │   ├── Calendar
│   │   └── CurrentTasksSection (subscribes to currentTasks)
│   ├── Tasks Tab
│   │   ├── Task Header (shows counts)
│   │   ├── Add Task Modal
│   │   ├── CurrentTasksSection (subscribes to currentTasks)
│   │   ├── UpcomingTasksSection (subscribes to upcomingTasks)
│   │   └── CompletedTasksSection (subscribes to completedTasks)
│   └── Profile Tab
└── Custom Components (shared across tabs)
    ├── HapticTab (custom tab button)
    ├── Themed wrappers
    └── UI primitives
```

## State Architecture

### Task Model
```typescript
type Task = {
  id: string;           // Unique identifier
  title: string;        // Task description
  status: 'current' | 'upcoming' | 'completed';  // Task state
};
```

### Store Structure
```typescript
{
  tasks: Task[]  // Array of all tasks
}
```

### State Distribution
- **useTask hook** filters tasks by status
- **Components** subscribe to filtered results
- **Redux** manages all task state centrally
- **Local state** only for UI interactions (modals, input fields)

## Key Architectural Decisions

1. **Redux Toolkit**: Chosen for predictable state management and dev tools
2. **Expo Router**: File-based routing for simpler navigation structure
3. **Custom Hooks**: Encapsulate state filtering logic
4. **Component Composition**: Reusable UI components with consistent theming
5. **TypeScript**: Type safety throughout the application
6. **Theming System**: Dynamic theme switching based on system preferences

## Performance Considerations

1. **Memoization**: Components only re-render when relevant state changes
2. **Efficient Filtering**: useTask hook provides O(n) filtering with useSelector
3. **Lazy Loading**: Components load as needed through routing
4. **Optimized Re-renders**: Redux selector pattern prevents unnecessary updates

This architecture provides a scalable, maintainable foundation for the todo application with clear separation of concerns and predictable data flow.
