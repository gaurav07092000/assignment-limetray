# Advanced Task Manager

A modern, feature-rich task management application built with React, Vite, and Tailwind CSS.


### Core Functionality
-  **Add Tasks**: Create new tasks with validation
-  **Complete Tasks**: Mark tasks as done with visual feedback
-  **Delete Tasks**: Remove tasks with confirmation
-  **Edit Tasks**: Inline editing with keyboard shortcuts
-  **Filter Tasks**: View All, Pending, or Completed tasks
-  **Persistent Storage**: Tasks saved to localStorage

### Advanced Features
-  **Dark/Light Theme**: Toggle between themes with persistence
-  **Progress Stats**: Visual progress tracking and completion rates
-  **Drag & Drop**: Reorder tasks with smooth animations
-  **Responsive Design**: Mobile-first approach
-  **Performance Optimized**: React.memo, useCallback, useMemo
-  **Modern UI**: Tailwind CSS with smooth transitions

##  Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling Framework
- **@dnd-kit** - Drag & Drop Library
- **Lucide React** - Icon Library
- **Context API** - State Management
- **Custom Hooks** - Reusable Logic

##  Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎯 Usage

### Adding Tasks
- Type your task in the input field
- Press Enter or click "Add Task"
- Tasks must be at least 3 characters long

### Managing Tasks
- **Complete**: Click the circle icon to mark as done
- **Edit**: Click the edit icon to modify task text
- **Delete**: Click the trash icon to remove task
- **Reorder**: Drag tasks by the grip icon to rearrange

### Filtering
- **All**: Show all tasks
- **Pending**: Show incomplete tasks only
- **Completed**: Show completed tasks only

### Theme Toggle
- Click the sun/moon icon in the header to switch themes
- Theme preference is automatically saved

---

Built with using React, Vite, and Tailwind CSS

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
