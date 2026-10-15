# 💰 SpendWise

### Personal Expense and Budget Management System

SpendWise is a web application designed to help users record, organize, and analyze their daily expenses. The system aims to improve financial awareness by allowing users to categorize expenses, monitor spending habits, and manage personal budgets.

This project is being developed as part of a university Object-Oriented Programming course using JavaScript, HTML, CSS, Supabase, GitHub, and Visual Studio Code.

---

## 📌 Project Status

**Current stage:** Frontend Prototype

The current version includes the initial authentication interfaces:

- Login page
- Registration page
- Navigation between login and registration
- Client-side form validation
- Responsive user interface
- Initial object-oriented JavaScript structure

> **Note:** Backend authentication, database integration, and Supabase services have not been implemented yet. They will be developed in future stages.

---

## 🎯 Project Objective

To develop a web application that allows users to manage their daily expenses, organize them into categories, establish budgets, and visualize their spending habits through a simple and intuitive interface.

---

## ✨ Planned Features

### Authentication
- [x] Login interface
- [x] Registration interface
- [x] Client-side form validation
- [x] User authentication with Supabase
- [x] Secure session management
- [ ] Password recovery

### Expense Management
- [x] Create expenses
- [x] View expense history
- [x] Update expenses
- [x] Delete expenses
- [x] Assign categories to expenses
- [x] Filter expenses by date or category

### Budget Management
- [ ] Create personal budgets
- [ ] Set spending limits
- [ ] Monitor budget progress
- [ ] Display remaining budget
- [ ] Budget notifications

### Dashboard and Reports
- [x] Display total expenses
- [x] Display expenses by category
- [ ] Generate monthly summaries
- [ ] Add spending charts
- [ ] Identify spending patterns

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the web pages |
| CSS3 | Styling and responsive design |
| JavaScript | Application logic and object-oriented programming |
| Supabase | Backend services, authentication, and PostgreSQL database |
| GitHub | Version control and team collaboration |
| Visual Studio Code | Development environment |

---

## 📂 Project Structure

```text
SpendWise/
│
├── index.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # Main panel to manage expenses.
├── README.md               # Project documentation
│
├── css/
│   └── styles.css          # Global styles and responsive design
│
└── js/
    ├── app.js              # Login form logic and validation
    ├── register.js         # Registration form logic and validation
    └── dashboard.js        # Expense transactions, categories, filters, and session.
```

> The project structure may evolve as backend services, database integration, and additional application modules are implemented.

---
## Supabase

SpendWise uses Supabase for user authentication.

The application uses Supabase Authentication to:

- Register new users
- Authenticate existing users
- Store user accounts
- Manage user sessions

The Supabase project is managed separately from this repository.

---

## 🧩 Object-Oriented Programming

The project applies object-oriented programming principles through JavaScript classes.

### Current Classes

- `LoginForm`: Manages the login form, input validation, password visibility, and form events.
- `RegisterForm`: Manages the registration form, input validation, password confirmation, and form events.

### Example

```javascript
class LoginForm {
    constructor(form) {
        this.form = form;
    }

    validateEmail() {
        // Email validation logic
    }

    handleSubmit() {
        // Form submission logic
    }
}
```

As the project grows, additional classes and services will be introduced to organize expenses, budgets, users, and database operations.

---

## 🚀 How to Run the Project

### Requirements

- Visual Studio Code
- A modern web browser
- Live Server extension for Visual Studio Code (recommended)

### Steps

1. Clone the repository:

```bash
git clone https://github.com/your-username/SpendWise.git
```

2. Open the project folder in Visual Studio Code.

3. Open `index.html`.

4. Run the project using Live Server, or open the HTML file directly in a browser.

5. Test the login and registration interfaces.

> Supabase configuration is not required for the current frontend prototype.

---

## 👥 Team Collaboration

This project is developed collaboratively using GitHub.

### Recommended Workflow

1. Create a new branch for each feature or task.
2. Make changes only related to your assigned task.
3. Test the changes locally.
4. Commit the changes with a clear message.
5. Push the branch to GitHub.
6. Create a Pull Request for team review.
7. Merge the changes into the main branch after reviewing them.

### Example Branch Names

```text
feature/login
feature/register
feature/dashboard
feature/expense-management
feature/supabase-auth
feature/database
fix/login-validation
```

### Example Commit Messages

```text
feat: add login interface
feat: add registration form
fix: correct password validation
style: improve responsive layout
docs: update project README
```

---

## 🗺️ Development Roadmap

### Phase 1: Frontend Prototype
- [x] Define project idea
- [x] Create login interface
- [x] Create registration interface
- [x] Add client-side validation
- [x] Organize initial project structure

### Phase 2: Backend and Database
- [x] Create Supabase project
- [x] Design database schema
- [x] Configure Supabase authentication
- [x] Connect JavaScript application to Supabase
- [x] Implement user registration and login

### Phase 3: Expense Management
- [x] Create expense database table
- [x] Implement expense CRUD operations
- [x] Add expense categories
- [x] Connect expense forms to Supabase

### Phase 4: Budgets and Dashboard
- [ ] Implement budget management
- [ ] Create dashboard
- [ ] Add expense summaries
- [ ] Add charts and reports

### Phase 5: Testing and Final Delivery
- [ ] Test application functionality
- [ ] Fix bugs
- [ ] Improve user interface
- [ ] Review security and data validation
- [ ] Prepare project presentation

---

## 📄 Academic Context

This project is being developed for an Object-Oriented Programming course. Its main purpose is to apply software development concepts such as:

- Object-oriented programming
- Classes and objects
- Encapsulation
- Modular programming
- CRUD operations
- Database integration
- Version control
- Collaborative software development

---

## 📜 License

This project is intended for academic purposes.
