# Todo App & URL Parser

A Next.js application with Todo management and URL parsing tools, built with JavaScript and Tailwind CSS.

## Features

### Todo Manager
- **Full CRUD Operations**: Create, read, update, and delete todos
- **localStorage Persistence**: All todos are saved locally in the browser
- **Status Management**: Mark todos as complete or incomplete
- **Form Validation**: Input validation with error messages
- **Responsive Design**: Works on desktop and mobile devices

### URL Parser
- **URL Analysis**: Parse URLs into their components
- **Query Parameters**: Extract and display query parameters in a table
- **Error Handling**: Graceful error handling for invalid URLs
- **Clean Interface**: Modern, responsive UI design

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── todos/
│   │   ├── page.js
│   │   ├── create/
│   │   │   └── page.js
│   │   └── edit/
│   │       └── [id]/
│   │           └── page.js
│   └── url-parser/
│       └── page.js
├── components/
│   └── Navbar.js
├── utils/
│   └── todoStorage.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Installation and Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Todo Manager
- Navigate to `/todos` to view all todos
- Click "Create Todo" to add a new todo
- Use the action buttons to edit, delete, or toggle completion status
- All data is persisted in localStorage

### URL Parser
- Navigate to `/url-parser`
- Enter any valid URL (including protocol)
- Click "Parse" to see the detailed breakdown
- View all components including protocol, hostname, pathname, and query parameters

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: UI library with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: ES6+ features
- **localStorage**: Browser storage for persistence

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features Implemented

### Todo Module
✅ Complete CRUD functionality
✅ localStorage persistence
✅ Form validation
✅ Responsive table design
✅ Status toggling
✅ Confirmation dialogs for delete
✅ Empty state handling
✅ Edit functionality with pre-filled forms

### URL Parser Tool
✅ URL parsing with native URL API
✅ Query parameter extraction
✅ Component breakdown display
✅ Error handling for invalid URLs
✅ Clean, responsive UI

### General Features
✅ Navigation bar with active state
✅ Responsive design
✅ Modern UI with Tailwind CSS
✅ Client-side rendering where needed
✅ Clean code structure
✅ Hover effects and transitions
# DoParse
