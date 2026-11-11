<p align="center">
  <img src="assets/img/spendwise-app-icon.png" alt="SpendWise application icon" width="112">
</p>

# 💚 SpendWise

### Mobile-First Personal Expense and Budget Manager

SpendWise is a university software engineering project for recording small everyday expenses (often called *gastos hormiga*), managing monthly budgets, and understanding spending habits through useful statistics.

The application uses **vanilla JavaScript, HTML, CSS, and Supabase**. Its interface follows a **Mobile First** approach: the mobile layout is designed first, then adapted to larger screens.

- **Current development milestone:** `v0.9.0-beta.2` — visual identity and final interface polish (November 2026; version label, not a Git release tag)
- **Development status:** functional academic beta prepared for project review; optional improvements remain
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
| Navigation and Profile | Mobile bottom navigation (Home, History, Statistics, Profile), personalized profile card and logout; informational settings marked “Próximamente” | ✅ Navigation and logout; settings are placeholders |
| SpendWise Assistant | Floating support chat, predefined answers, quick questions, contextual navigation, guided troubleshooting, and conversation reset | ✅ Functional |

### Statistics and Spending Analysis

The **Análisis de hábitos** screen is designed for quick mobile reading:

- Select a month or return to the current month.
- See the total spent, number of expenses, and average expense.
- Compare the selected month's spending with the preceding month.
- View a **donut chart** of spending distribution.
- Read a **descending ranking of categories** with amounts and percentages.

Statistics are calculated from the user's existing expense records; the chart does not require a separate reporting table.

### SpendWise Assistant — In-App Help Chat

**SpendWise Assistant** is a rule-based conversational help module, available from the authenticated dashboard. Its floating chat button sits on the lower-left side of the interface, separate from the expense quick-add button.

Users can:

- Write a question or choose a suggested question about expenses, budgets, history, categories, and statistics.
- Read predefined help replies displayed as chat messages.
- Follow context-sensitive action buttons to open the relevant app view or expense form.
- Get guided checks for common issues, including expenses or budgets not saving, missing movements, and unexpected statistics.
- Reset the visible conversation, close the chat, or reopen it later during the same page session.

**Scope and limitations:** The assistant does not use generative AI, a human support operator, or a real-time messaging backend. It recognizes supported words and phrases, so questions outside its rules receive a fallback response. Messages live only in the current page and disappear after a reload. The chat is not yet accessible from the login and registration screens, and it does not submit support tickets. No new Supabase table or API key is required for this module.

---

## 📱 Design Approach

- Mobile-first layouts and responsive styling.
- Custom emerald-and-mint SpendWise symbol, used consistently across login, registration, and dashboard.
- Dedicated square app icon on authentication screens and browser tabs; transparent logo in the dashboard header.
- Separate views for Home, History, Statistics, and Profile.
- Compact financial summary cards, redesigned recent-movement cards, and accessible form labels.
- Redesigned profile screen with account details, informational sections, and a working logout control.
- Refined expense-entry modal with a styled close button and Escape-key support.
- Floating quick-add button for expenses.
- Floating support-chat window designed for small mobile screens, with a separate reset and close control.
- Interface text primarily in Spanish.

### Brand Assets

| File | Purpose |
|---|---|
| `assets/img/spendwise-logo.png` | Transparent SpendWise symbol for light-background UI elements |
| `assets/img/spendwise-app-icon.png` | Square icon with a pale background for login, registration, and browser favicons |

The symbol combines a stylized **S**, a mint circular accent, and a subtle checkmark. The icon is a visual asset only: **native app packaging and installable PWA configuration have not been implemented**.

The mobile redesign is substantially implemented. Additional desktop refinements and optional features can be addressed after academic delivery.

---

## 🛠️ Technology Stack

| Technology | Use |
|---|---|
| HTML5 | Structure and accessible form controls |
| CSS3 | Mobile-first responsive layout and visual design |
| JavaScript (no frontend framework) | UI behavior, validation, expense operations, statistics, and rule-based support chat |
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
├── assets/
│   └── img/
│       ├── spendwise-logo.png          # Transparent brand symbol
│       └── spendwise-app-icon.png      # App icon and favicon
├── index.html             # Login
├── register.html          # Registration
├── dashboard.html         # Main app (Home, History, Statistics, Profile)
├── README.md
├── css/
│   ├── styles.css         # Global and Mobile First styles
│   └── chat.css           # SpendWise Assistant responsive styles
└── js/
    ├── app.js             # Login form and Supabase authentication
    ├── register.js        # Registration form and validations
    ├── dashboard.js       # Expenses, categories, budgets, history, stats, navigation
    └── support-chat.js    # SupportChat class, chatbot rules, and UI events
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
- `SupportChat` encapsulates the help-chat interface, message handling, quick questions, troubleshooting responses, and suggested navigation actions. Its methods include `setupEvents()`, `sendQuestion()`, `addMessage()`, `getAnswer()`, `getSupportAnswer()`, `getSuggestedAction()`, and `resetChat()`.

The assistant is instantiated once when the dashboard page loads. It reuses existing navigation and expense buttons rather than duplicating their business logic.

The current `dashboard.js` still contains functions for data loading, rendering, navigation, and expense/budget operations. Refactoring these functions into additional classes or modules is a possible future improvement; the dashboard is **not** claimed to be fully object-oriented yet.

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
- [ ] Confirm the SpendWise logo appears in login, registration, and the dashboard header.
- [ ] Confirm the favicon loads in each page and that branding stays aligned at 320 px width.
- [ ] Open Profile, check the informational "Próximamente" sections, and verify logout.
- [ ] Open and close the expense form using its close button and Escape.
- [ ] Open and close SpendWise Assistant using the chat button, the close control, and Escape.
- [ ] Send a typed question and use the quick-question buttons.
- [ ] Verify expected answers, unknown-question fallback, and guided troubleshooting.
- [ ] Follow assistant action buttons to History, Statistics, Home, and the expense form.
- [ ] Reset the conversation and confirm the welcome message returns without affecting expense data.
- [ ] Inspect the chat layout at 320 × 568, 390 × 844, and 1280 × 800 viewport sizes.
- [ ] On a real phone, check that the on-screen keyboard does not hide the chat input.

The assistant's core behaviors and responsive previews were manually checked during development. The checklist remains useful for regressions; real-device keyboard behavior and a complete automated test suite have not yet been verified.

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

### Phase 5 — SpendWise Assistant
- [x] Floating mobile-friendly chat window
- [x] Rule-based replies and quick questions
- [x] Contextual navigation to existing app functions
- [x] Guided help for common in-app problems
- [x] Conversation reset and accessibility controls
- [ ] Optional help entry point from login and registration
- [ ] Optional support-ticket or contact channel if required for final delivery

### Phase 6 — Quality and Final Delivery
- [x] Custom SpendWise logo, app icon, and favicons
- [x] Consistent branding in login, registration, and dashboard
- [x] Visual redesign of Profile, recent expenses, and expense form
- [x] Escape-key closing for the expense form
- [ ] Complete end-to-end testing and edge-case checks
- [ ] Optional password recovery and editable profile settings
- [ ] Improve tablet/desktop layouts
- [ ] Review security and validation before public deployment
- [x] Update project documentation for academic handoff
- [ ] Perform final demonstration and capture submission evidence

---

## 🤝 Team Workflow

Use focused branches such as `feature/statistics`, `feature/budget-history`, or `fix/mobile-layout` when collaborating.

Prefer Conventional Commits:

```text
feat: add category spending analysis
feat(chat): integrate SpendWise Assistant
style: polish mobile-first interface
style(branding): integrate SpendWise logo and app icon
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

## 📝 Current Development Milestone — v0.9.0-beta.2

This working milestone builds on `v0.9.0-beta.1` and adds:

- A custom visual identity centered on the emerald-and-mint SpendWise **S**.
- A square app icon for authentication screens and browser favicons, plus a transparent symbol for the dashboard.
- Consistent header branding across the authenticated app views.
- A redesigned Profile view with informational configuration cards and functional logout.
- Refined recent-expense cards, expense-modal controls, and Escape-key handling.
- Documentation reflecting the current UI, assets, functionality, and remaining limitations.

This milestone focuses on presentation and user experience; it does **not** introduce new backend services or change Supabase data models.

**Still pending outside the core academic scope:** optional password recovery and editable profile settings, complete automated QA (including real-phone keyboard checks), further desktop polish, and production deployment. Optional human support or support-ticket functionality has not been implemented.

---

## 🎓 Academic Context

SpendWise is developed for a university **Object-Oriented Programming** course. The project demonstrates form validation, classes and objects, database integration, CRUD operations, responsive interfaces, collaboration, and version control.

## 📜 License

Academic project. No open-source license has been specified yet.
