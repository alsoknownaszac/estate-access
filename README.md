# Estate Access Dashboard

A modern access management system for gated communities and estates, built with Next.js, TypeScript, and React.

## 🚀 Features

### Core Features

- **Authentication System**: Mock login with localStorage-based session management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for resident records
- **Search & Filter**: Real-time search by name/house number and filter by access type
- **Pagination**: Clean pagination for managing large datasets
- **Toast Notifications**: User feedback for all actions (success/error states)
- **Form Validation**: Client-side validation with detailed error messages
- **API Service Layer**: Abstracted data operations simulating real API calls
- **React Hook Form Integration**: Form management with Zod schema validation

### Bonus Features ✨

- **Table Sorting**: Click column headers to sort by name, house number, access type, or last visit
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Loading States**: Async data handling with loading indicators
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 📋 Requirements

- Node.js 18+
- pnpm

## 🛠️ Installation & Setup

1. **Clone or download the project**

   ```bash
   cd estate-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Login credentials**
   ```
   Email: admin@estate.com
   Password: password123
   ```

## 📁 Project Structure

```
estate-dashboard/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar/topbar
│   │   └── page.tsx            # Dashboard home with stats
│   ├── residents/
│   │   ├── layout.tsx          # Residents page layout
│   │   └── page.tsx            # Residents management page
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── page.tsx                # Root page (redirects)
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── toast.tsx
│   │   └── ...                 # All shadcn/ui components
│   ├── delete-confirmation-dialog.tsx  # Delete confirmation modal
│   ├── pagination.tsx          # Pagination component
│   ├── resident-form.tsx       # Form for add/edit resident
│   ├── residents-page.tsx      # Main residents page component
│   ├── residents-table.tsx     # Table with sorting and actions
│   ├── search-filter-bar.tsx   # Search and filter controls
│   ├── sidebar.tsx             # Navigation sidebar
│   ├── theme-provider.tsx      # Theme provider for dark mode
│   ├── toaster.tsx             # Toast notifications
│   └── topbar.tsx              # Top navigation bar
├── hooks/
│   ├── use-mobile.ts           # Custom hook for mobile detection
│   ├── use-residents.ts        # Custom hook for resident data
│   ├── use-stats.ts            # Custom hook for dashboard stats
│   └── use-toast.ts            # Toast notification hook
├── lib/
│   ├── api-service.ts          # API layer abstraction
│   ├── auth.ts                 # Authentication utilities
│   ├── mock-data.ts            # Mock resident data
│   ├── utils.ts                # Utility functions
│   └── validation.ts           # Zod schemas for validation
├── styles/
│   └── globals.css             # Additional global styles
├── public/                     # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-user.jpg
│   └── ...
└── ...                         # Config files
```

## 🏗️ Architecture & Design Decisions

### State Management

- **Local State (useState)**: For UI state like modals, pagination, and form inputs
- **Custom Hooks**: `useResidents` hook encapsulates all resident data logic
- **LocalStorage**: Persists residents data and user session between sessions
- **No Global State Library**: Given the app's scope, React's built-in state management is sufficient

### Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **CSS Variables**: For theme colors supporting dark mode
- **shadcn/ui**: High-quality, accessible UI components built on Radix UI
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Form Management

- **react-hook-form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Seamless integration between react-hook-form and Zod

### API Layer

- **Abstracted Service**: `api-service.ts` simulates async API calls with delays
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **TypeScript**: Full type safety across the entire data flow
- **LocalStorage Backend**: Mock persistent storage for development

### TypeScript

- **Strict Mode**: Full type safety enabled
- **Interface-First**: Clear contracts for all data structures
- **Type Inference**: Leveraging TypeScript's type inference where possible

### Component Architecture

- **Composition**: Small, focused components composed together
- **Separation of Concerns**: UI components separated from business logic
- **Reusability**: Generic UI components in `/components/ui`
- **Client Components**: "use client" directive for interactive components

## 📝 Data Model

```typescript
interface Resident {
  id: string;
  name: string;
  houseNumber: string;
  accessType: "Resident" | "Visitor" | "Staff";
  lastVisit: string; // ISO date string
}
```

## 🎨 UI/UX Features

- **Consistent Design**: Clean, modern interface following design best practices
- **Loading States**: Clear feedback during async operations
- **Error States**: Descriptive error messages with toast notifications
- **Empty States**: Helpful messages when no data is available
- **Confirmation Dialogs**: Prevent accidental deletions

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Authentication**

   - Login with correct credentials
   - Login with incorrect credentials
   - Logout functionality

2. **CRUD Operations**

   - Add a new resident
   - Edit existing resident
   - Delete a resident
   - Validation errors on empty fields

3. **Search & Filter**

   - Search by name
   - Search by house number
   - Filter by access type
   - Combine search and filter

4. **Sorting**

   - Sort by name (asc/desc)
   - Sort by house number
   - Sort by access type
   - Sort by last visit

5. **Pagination**

   - Navigate through pages
   - Verify correct items per page

6. **Dark Mode**
   - Toggle dark mode
   - Verify preference persists

## 🚀 Production Build

```bash
pnpm build
pnpm start
```

## 📦 Key Dependencies

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5**: Type safety
- **Tailwind CSS 4**: Utility-first CSS
- **react-hook-form 7**: Form management
- **Zod 3**: Schema validation
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Sonner**: Toast notifications

## 🔐 Security Notes

**⚠️ This is a development/demo application**

Current implementation uses:

- Mock authentication (hardcoded credentials)
- Client-side only data storage (localStorage)
- No encryption or secure token storage

## 👨‍💻 Development Notes

- The app uses Next.js App Router (not Pages Router)
- All API calls are mocked with simulated delays
- Data persists in localStorage for demo purposes
- Dark mode preference is stored separately in localStorage
- Form validation runs on client-side before submission

## 📄 License

This is a demo project for educational purposes.

---

Built with ❤️ using Next.js, React, and TypeScript
