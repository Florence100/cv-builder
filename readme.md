# CV Builder — Professional Curriculum Vitae Management System

A high-performance, responsive Next.js application designed for enterprise user management and automated CV generation. This project leverages Server-Side Rendering (SSR) and Static Site Generation (SSG) strategies, strict TypeScript typing, and GraphQL for robust, type-safe data fetching.

---

## 📖 Functionality

The application provides a comprehensive toolkit for managing employees, tracking competencies, and generating structured professional CVs:

- **Robust Authentication:** Secure access flow including Login, Signup, automated Access Token Rotation, and Forgot/Reset Password pipelines.
- **User Management System:**
  - Searchable and sortable user directories built with TanStack Table.
  - Interactive profile management including avatar uploads and detailed personal updates.
  - Granular competency tracking: dynamically add, update mastery levels, or remove specific skills and languages.
- **CV Management & Generation:**
  - Dedicated CV dashboard to search, sort, and create customized resumes.
  - Detailed editors for mapping skills and assigning specific project responsibilities to individual CVs.
  - Live CV Preview with high-quality PDF export capabilities.
- **Global Settings:** - Dynamic Appearance configuration (Light/Dark themes).
  - Localization and language toggling powered by `next-intl`.

---

## 🛠️ Tech Stack

### Core

- **Next.js (v16):** React framework utilizing advanced SSR/SSG page rendering strategies.
- **React (v19):** Functional components and modern hook-based architecture.
- **TypeScript:** Strict static typing throughout components, GraphQL queries, and data schemas.

### Data Fetching & State

- **GraphQL & Apollo Client:** Locally configured backend integration utilizing type-safe query/mutation structures and efficient local caching.
- **TanStack React Table:** Headless UI utility for building advanced, sortable, and filterable data grids.
- **React Hook Form:** Performant, flexible, and extensible forms with easy-to-use validation.

### Styling & UI Components

- **Tailwind CSS (v4):** Utility-first CSS framework for rapid, responsive UI development.
- **Shadcn UI & Radix UI:** Accessible, customizable, and unstyled foundational components integrated directly into the source code.
- **Lucide React:** Clean, consistent, and scalable SVG iconography.

### Quality Assurance & Tooling

- **React Testing Library:** High-speed unit testing environment for component and utility validation.
- **Code Quality:** Automated formatting and linting via **ESLint** and **Prettier**.
- **Git Hooks:** Enforced pre-commit and pre-push checks using **Husky** and **lint-staged**.

---

## 📦 Installation & Startup

### Prerequisites

- Node.js (v20.x or higher recommended)
- npm
- Locally configured GraphQL backend running (see internal Notion resources for setup)

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd cv-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in Development Mode

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 🧪 Testing

To run the unit testing suite:

```bash
npm run test
```

---

## 👥 Team & Credits

**Developers:**

- Nastassia Hrybouskaya
- Usevalad Kavalenka

**Mentors:**

- Leonid Tarasiuk
- Darya Yusipets
- Nikita Mihnevich

**Context:** Innowise Internship Program  
**Timeline:** June – July 2026
