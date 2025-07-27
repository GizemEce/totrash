# 🗑️ REM-TODO – Wastly Management App

A full-stack Todo app built with **React** and **Node.js**, featuring login functionality, todo CRUD operations, and automated UI testing with **Cypress** and **Percy**.

---

## 🚀 Features

- 🔐 Login with email and password (mock auth)
- ➕ Add todo items
- 📝 Edit todo items
- ❌ Delete todo items
- ⚠️ Form validation
- ✅ Functional UI testing with Cypress
- 📸 Visual testing with Percy

---

## 📁 Project Structure
```
rem-todo/
├── client/               # React frontend
│   ├── src/components/   # UI components
│   └── cypress/          # Cypress test files
├── server/ or index.js   # Node/Express backend
├── .env                  # Percy token (excluded from Git)
├── package.json          # Root-level scripts and dependencies
├── .gitignore
```
---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rem-todo.git
cd rem-todo

At the root (backend + Percy):
npm install

Then inside the React frontend (client/):
cd client
npm install

Start the backend:
cd server
node index.js

Start the frontend:
cd client
npm start

---
### Run Tests:
 1. Run Functional UI Tests (Cypress)
    cd client
    npm run cypress
 2. Run Visual Snapshot Tests (Percy + Cypress)	
    npm run test:visual
 3. Run API Tests (Supertest + Jest)
    cd server
    npm test






