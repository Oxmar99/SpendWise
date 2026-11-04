# 💚 SpendWise

### Mobile-First Personal Expense and Budget Manager

SpendWise is a university software engineering project for recording small everyday expenses (often called *gastos hormiga*), managing monthly budgets, and understanding spending habits through useful statistics.

The application uses **vanilla JavaScript, HTML, CSS, and Supabase**. Its interface follows a **Mobile First** approach: the mobile layout is designed first, then adapted to larger screens.

- **Current milestone:** `v0.8.0-beta.1` — November 2026 academic progress
- **Development status:** functional academic beta; ongoing testing and polish
- **Repository:** https://github.com/Oxmar99/SpendWise

> SpendWise is an academic prototype. It is not yet a production-ready financial service.

---

## ✨ Implemented Features

| Module | Current capabilities | Status |
|---|---|---|
| Authentication | Email/password registration, login, client-side validation, Supabase Auth sessions, email confirmation support | ✅ Functional |
| Home | Personalized welcome, monthly budget overview, spending summary, recent movements, financial reminder | ✅ Functional |
| Expenses | Create, list, edit, and delete expenses; assign categories and dates | ✅ Functional |
| Categories | Default and user-created categories stored in Supabase | ✅ Functional |
| Expense History | Search by description, filter by category and date range, review filtered totals | ✅ Functional |
| Budgets | Set a monthly limit, track used and remaining amounts, show progress and warnings | ✅ Functional |
| Budget History | Review previous months' budgets, spending, remaining amount, and usage percentage | ✅ Functional |
| Statistics | Month selector, total spent, transaction count, average, month-over-month comparison, circular chart, category ranking | ✅ Functional |
| Navigation and Profile | Mobile bottom navigation (Home, History, Statistics, Profile), profile information, logout | ✅ Functional |

### Statistics and Spending Analysis

The **Análisis de hábitos** screen is designed for quick mobile reading:

- Select a month or return to the current month.
- See the total spent, number of expenses, and average expense.
- Compare the selected month's spending with the preceding month.
- View a **donut chart** of spending distribution.
- Read a **descending ranking of categories** with amounts and percentages.

Statistics are calculated from the user's existing expense records; the chart does not require a separate reporting table.

---

## 📱 Design Approach

- Mobile-first layouts and responsive styling.
- Consistent green-and-neutral visual identity across login, registration, and dashboard.
- Separate views for Home, History, Statistics, and Profile.
- Compact financial summary cards and accessible form labels.
- Floating quick-add button for expenses.
- Interface text primarily in Spanish.

The mobile redesign is substantially implemented. Desktop refinements and small usability details remain in progress.

---

## 🛠️ Technology Stack

| Technology | Use |
|---|---|
| HTML5 | Structure and accessible form controls |
| CSS3 | Mobile-first responsive layout and visual design |
| JavaScript (no frontend framework) | UI behavior, validation, expense operations, and statistics |
| Supabase Auth | Email/password authentication and sessions |
| Supabase PostgreSQL | Persistent user, expense, category, and budget data |
| Row Level Security (RLS) | Per-user access controls at the database level |
| Git and GitHub | Version control and team collaboration |
| Visual Studio Code | Development environment |

Supabase JavaScript v2 is loaded through a CDN in the HTML pages.

---

## 📂 Project Structure

```text
SpendWise/
├── index.html             # Login
├── register.html          # Registration
├── dashboard.html         # Main app (Home, History, Statistics, Profile)
├── README.md
├── css/
│   └── styles.css         # Global and Mobile First styles
└── js/
    ├── app.js             # Login form and Supabase authentication
    ├── register.js        # Registration form and validations
    └── dashboard.js       # Expenses, categories, budgets, history, stats, navigation
```

The exact structure may evolve as the project is refactored.

---

## 🚀 Running Locally

### Requirements

- A modern browser
- Visual Studio Code with **Live Server**, or another local HTTP server
- Internet access to reach Supabase and the CDN

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Oxmar99/SpendWise.git
   cd SpendWise
   ```

2. Open the project folder in Visual Studio Code.
3. Start Live Server from `index.html` (or serve the folder over HTTP).
4. Register an account and confirm its email if required by the Supabase project's settings.
5. Sign in and explore the application.

**Important:** Do not launch the app through a `file://` URL. Use a local HTTP server to avoid browser restrictions that can affect scripts and requests.

### Supabase Configuration

The existing scripts initialize Supabase with a **project URL** and a **publishable/anon key**. These are client-side configuration values, not service credentials.

- The backend project and its data are managed outside this repository.
- Never commit a `service_role` key or any secret API key.
- Keep Supabase RLS policies enabled and verify them when adding or changing tables.

---

## 🗄️ Database Overview

The current backend includes these Supabase tables:

| Table | Purpose |
|---|---|
| `profiles` | Application user profile data |
| `categories` | Default and customizable expense categories |
| `expenses` | Recorded expenses with amount, category, date, and owner |
| `budgets` | Monthly limits associated with a user and month |

RLS is enabled on the four application tables, with policies configured for authorized access. Supabase Auth manages authentication separately from these tables.

---

## 🧩 Object-Oriented Programming

SpendWise applies OOP concepts in its authentication layer:

- `LoginForm` encapsulates login form events, validation, feedback, and password visibility.
- `RegisterForm` encapsulates registration validation, password confirmation, feedback, and form events.

The current `dashboard.js` contains functions for data loading, rendering, navigation, and expense/budget operations. Refactoring these functions into additional classes or modules is a possible future improvement; the dashboard is **not** claimed to be fully object-oriented yet.

---

## ✅ Manual Verification Checklist

Before submitting a new build, verify the following in a local browser:

- [ ] Register a new user and complete email confirmation when applicable.
- [ ] Log in and log out from Profile.
- [ ] Create an expense, then edit and delete it.
- [ ] Search and filter expenses; check the filtered total.
- [ ] Set the current month's budget and verify the progress indicator.
- [ ] Switch the Statistics month and verify all four summary values.
- [ ] Confirm the donut chart and ranking match the recorded expenses.
- [ ] Check a month with no expenses.
- [ ] Verify that all four navigation views work on a mobile-sized screen.

Some components have been manually tested during development; a complete automated test suite is not yet included.

---

## 🗺️ Development Roadmap

### Phase 1 — Frontend and Authentication
- [x] Login and registration forms
- [x] Client-side validations
- [x] Supabase authentication
- [x] Mobile-first redesign of authentication screens

### Phase 2 — Backend and Database
- [x] Supabase project and database schema
- [x] `profiles`, `categories`, `expenses`, and `budgets` tables
- [x] RLS policies
- [x] Frontend-to-Supabase integration

### Phase 3 — Expense Management
- [x] Expense CRUD
- [x] Default and customizable categories
- [x] Expense history, search, and filters

### Phase 4 — Dashboard, Budgets, and Statistics
- [x] Monthly budgets and progress
- [x] Historical budgets
- [x] Monthly statistics and period comparison
- [x] Mobile-first navigation and dashboard views
- [x] Donut chart and spending-category ranking

### Phase 5 — Quality and Final Delivery
- [ ] Complete end-to-end testing and edge-case checks
- [ ] Implement password recovery
- [ ] Polish Profile and remaining UI details
- [ ] Improve tablet/desktop layouts
- [ ] Review security and validation before public deployment
- [ ] Prepare final demonstration and documentation

---

## 🤝 Team Workflow

Use focused branches such as `feature/statistics`, `feature/budget-history`, or `fix/mobile-layout` when collaborating.

Prefer Conventional Commits:

```text
feat: add category spending analysis
style: polish mobile-first interface
fix: correct expense validation
docs: update project status and setup instructions
```

Suggested workflow:

1. Pull the latest changes before starting.
2. Implement and test one focused change.
3. Inspect `git status` and `git diff`.
4. Commit only the intended files.
5. Push your branch and open a Pull Request when working collaboratively.

---

## 📝 Current Milestone — v0.8.0-beta.1

This milestone builds on the earlier Mobile First work and adds:

- Consistent login and registration presentation.
- Cleaner dashboard header, with the welcome message displayed on Home.
- Updated Statistics screen with a month selector and compact summary cards.
- Circular category distribution chart and sorted spending ranking.
- Updated project documentation for the academic progress delivery.

**Still pending:** password recovery, complete QA, final desktop polish, and production deployment.

---

## 🎓 Academic Context

SpendWise is developed for a university **Object-Oriented Programming** course. The project demonstrates form validation, classes and objects, database integration, CRUD operations, responsive interfaces, collaboration, and version control.

## 📜 License

Academic project. No open-source license has been specified yet.
