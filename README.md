# 💰 SpendWise

### Personal Expense and Budget Management System

**Current development version:** `v0.7.0` (Beta)  
**Project status:** Core features working · Mobile First redesign in progress  
**Academic project:** Object-Oriented Programming (OOP)

SpendWise is a web application for recording, organizing, and analyzing everyday expenses. It helps users track spending by category, set monthly budgets, review past transactions, and better understand their financial habits.

The project is built with **HTML, CSS, and vanilla JavaScript**, using **Supabase** for authentication and a PostgreSQL database. It is developed collaboratively with GitHub and Visual Studio Code, without a frontend framework.

> **Team update:** SpendWise is no longer just a login/registration prototype. Its main expense, budget, and statistics features are connected to Supabase and working. The current focus is refining the mobile interface, testing edge cases, and preparing a desktop layout.

---

## 📌 Current Status: v0.7.0 Beta

### Working features

- **Authentication:** User registration, login, session checks, and logout with Supabase Auth.
- **Expense management:** Create, view, edit, and delete expenses; assign categories and dates.
- **History:** Search and filter by description, category, and date range; apply and clear filters from a separate panel.
- **Monthly budgets:** Set or update the current month's spending limit; view spent, remaining, and percentage used; display budget status messages.
- **Statistics:** Monthly total, number of expenses, average per expense, comparison with the previous month, and spending breakdown by category.
- **Historical reports:** Select a previous month to review statistics and budget history; editing past budgets is restricted in the interface.
- **Navigation:** Home, History, Statistics, and Profile views.
- **Mobile interface:** Mobile First layout, floating `+` button on Home/History/Statistics, expense form in a modal, and compact History cards with category icons and an actions menu (`⋮`).

### Current focus

1. Finish the Mobile First redesign, especially **Statistics** and **Profile**.
2. Refine feedback messages, interactions, and layout details.
3. Adapt the application to larger screens (tablet/desktop).
4. Run broader functional, usability, and security checks before release.

**Version note:** `v0.7.0` is the team's proposed development milestone. A Git tag/release should be created separately if the team wants it reflected in GitHub Releases.

---

## 🎯 Project Objective

Develop an intuitive expense-management application that helps users record daily expenses, classify spending, manage monthly budgets, and review their habits through clear summaries and visual reports.

---

## ✨ Feature Checklist

### Authentication
- [x] Login and registration interfaces
- [x] Client-side form validation
- [x] User authentication with Supabase
- [x] Session checks and logout
- [ ] Password recovery

### Expenses and Categories
- [x] Create, list, update, and delete expenses (CRUD)
- [x] Assign a category and expense date
- [x] Show recent expenses on Home
- [x] Search and filter expense history
- [x] Filter panel with Apply and Clear controls
- [x] History cards with category icons and action menus
- [ ] Manage custom categories directly from the interface

### Budgets
- [x] Create and update a monthly budget
- [x] Display budget limit, spending, remaining balance, and progress
- [x] Show in-app budget status/warning messages
- [x] Review budget history
- [x] Prevent editing older budgets through the current UI

### Statistics
- [x] Total spending for a selected month
- [x] Expense count and average expense
- [x] Compare spending with the previous month
- [x] Spending breakdown chart by category
- [x] Month selector for historical statistics
- [ ] Final Mobile First visual redesign for Statistics

### Interface and Quality
- [x] Four-view navigation: Home, History, Statistics, Profile
- [x] Expense form displayed in a modal
- [x] Floating add-expense button hidden on Profile
- [x] Compact history cards and contextual Edit/Delete menu
- [ ] Finalize Profile design
- [ ] Optimize tablet and desktop layouts
- [ ] Polish confirmations, messages, accessibility, and mobile usability
- [ ] Complete regression, security, and cross-device testing

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and accessible controls |
| CSS3 | Styling and Mobile First responsive layout |
| JavaScript (vanilla) | Application logic, DOM interactions, and OOP concepts |
| Supabase Auth | Registration, login, and user sessions |
| Supabase PostgreSQL | Persistent data for expenses, categories, budgets, and profiles |
| Row Level Security (RLS) | Database access policies |
| Git + GitHub | Version control, collaboration, and backups |
| Visual Studio Code | Development environment |

---

## 📂 Project Structure

```text
SpendWise/
├── index.html           # Login screen
├── register.html        # Registration screen
├── dashboard.html       # Home, History, Statistics, Profile, and modals
├── README.md            # Project status and team documentation
├── css/
│   └── styles.css       # Shared styles and Mobile First layout
└── js/
    ├── app.js           # Login and authentication logic
    ├── register.js      # Registration and validation logic
    └── dashboard.js     # Sessions, expenses, budgets, reports, and UI logic
```

The current dashboard uses multiple views inside `dashboard.html`; they are switched by JavaScript rather than separate HTML pages.

---

## 🗃️ Supabase and Database

SpendWise currently uses **one Supabase project** for backend services, separate from this GitHub repository.

### Main database tables

| Table | Role |
|---|---|
| `profiles` | User profile information |
| `categories` | Expense categories |
| `expenses` | User expense records |
| `budgets` | Monthly spending limits |

Authentication accounts are handled by **Supabase Auth**. Database tables have **Row Level Security (RLS)** enabled and corresponding policies configured. The application reads and writes data through the Supabase JavaScript client.

**Important for teammates:** The Git repository contains the frontend source, but cloning it **does not create or replicate the Supabase database**, policies, or seeded categories. Anyone running the project needs access to a correctly configured backend (or a compatible development project).

**Security reminders:**

- Use only the project's **publishable/anon** key in browser-side code; **never** commit a `service_role`/secret key or a database password.
- Keep RLS policies enabled and review them when modifying tables.
- Coordinate SQL/schema changes with the team. A reproducible database setup or migrations should be documented before final delivery.
- Do not store real passwords or other secrets in GitHub issues, commits, or screenshots.

---

## 🧩 Object-Oriented Programming

SpendWise is an academic OOP project developed in JavaScript.

### Existing classes documented in the project

- `LoginForm`: Login interactions, client-side validation, password visibility, and form events.
- `RegisterForm`: Registration interactions and input/password validation.

The dashboard currently also uses functions and event handlers for expenses, budgets, reports, and navigation. **Further refactoring into well-defined classes/modules remains a possible improvement** to demonstrate OOP principles more consistently across the application.

Concepts emphasized by the project include classes and objects, encapsulation, input validation, CRUD operations, modularity, and integration with a persistent database.

---

## 🚀 Running SpendWise Locally

### Requirements

- Git
- Visual Studio Code (recommended)
- A modern browser
- Live Server extension or another local HTTP server (recommended)
- A working Supabase project/configuration with the expected tables, categories, and policies

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Oxmar99/SpendWise.git
   cd SpendWise
   ```

2. Open the folder in VS Code.
3. Check the Supabase URL and **publishable key** used by the JavaScript client. Coordinate configuration changes with the project owner; never replace the publishable key with a secret/service-role key.
4. Start a local server (for example, VS Code **Live Server**) and open `index.html` through its local URL. Avoid relying on `file://` URLs for testing.
5. Register or sign in with a test account. The dashboard should load your expenses, categories, budget, and reports from Supabase.

**Troubleshooting:** If login or data loading fails, check the browser developer console, the Supabase configuration, authentication settings, RLS policies, and availability of seeded categories.

**No frontend build step is currently required:** The project uses HTML/CSS/JavaScript directly and loads Supabase JS through a CDN.

---

## 👥 Team Collaboration

To keep the working version stable:

1. Pull the latest `main` before starting work (`git pull origin main`).
2. Create a branch for each feature/fix (for example `feature/stats-ui` or `fix/expense-modal`).
3. Make focused changes and test the affected features locally.
4. Commit with a descriptive message, then push your branch.
5. Open a Pull Request and ask a teammate to review before merging into `main`.
6. Coordinate any Supabase database or policy changes explicitly; Git alone will not sync them.

### Commit message examples

```text
feat: add category-based expense history
fix: open expense modal when editing
style: redesign history cards for mobile
style: improve statistics screen
security: review expense RLS policies
docs: update README for v0.7.0
```

### Regression checklist for UI changes

Before merging, verify that:

- Registration, login, and logout still work.
- Adding, editing, and deleting a test expense work.
- Home totals, budget progress, and Statistics update after changes.
- History filtering and the `⋮` actions menu work.
- Expense and filter modals open/close correctly.
- The `+` button is hidden on Profile, and other views still navigate correctly.

---

## 🗺️ Development Roadmap

| Phase | Status | Work |
|---|---|---|
| 1. Frontend foundation | ✅ Complete | Login, registration, validation, initial styles |
| 2. Backend and database | ✅ Functional | Supabase Auth, tables, policies, connection |
| 3. Expense management | ✅ Functional | Expense CRUD, categories, history, filters |
| 4. Budgets and analytics | ✅ Functional | Monthly budgets, totals, comparisons, charts |
| 5. Mobile First redesign | 🔄 In progress | Home and History updated; Statistics and Profile next |
| 6. Final stabilization | ⏳ Pending | Desktop layout, polish, broader testing, documentation, presentation |

### Next milestones (proposed)

- **v0.8.0:** Redesign Statistics and Profile.
- **v0.9.0:** Desktop responsiveness, UI refinements, and extensive testing.
- **v1.0.0:** First stable academic release after verification and final documentation.

These numbers are planning milestones, not a guarantee that all work is complete or released.

---

## 📝 Recent Development Notes (v0.7.0)

- Reorganized the dashboard around **Home, History, Statistics, and Profile** views.
- Added an expense modal and corrected editing so existing expenses open with their saved values.
- Connected Home's monthly spending total and recent movements to stored expense data.
- Added a floating add-expense button, hidden on the Profile view.
- Moved History filters to a separate overlay/panel.
- Redesigned History entries with compact layouts, category icons, and a contextual `⋮` menu.
- Preserved existing Supabase operations for expenses, budgets, authentication, and statistics during the redesign.

---

## 📄 Academic Context

SpendWise is being developed for a university Object-Oriented Programming course. The project provides hands-on experience in JavaScript, software organization, database integration, validation, CRUD workflows, responsive interfaces, version control, and collaborative development.

---

## 📜 License / Usage

This project is currently intended for academic use. No separate open-source license has been declared in this README.
