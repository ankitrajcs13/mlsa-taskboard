# 🚀 MLSA TaskBoard
### A CI/CD Demo Project — Microsoft Learn Student Ambassadors | by Ankit

A real-world Task Board web app built with **Node.js + Express**, demonstrating a
professional CI pipeline using **GitHub Actions** with linting, testing, and code coverage.

![CI Pipeline](https://github.com/YOUR_USERNAME/mlsa-taskboard/actions/workflows/ci.yml/badge.svg)

---

## 📁 Project Structure

```
mlsa-taskboard/
├── .github/
│   └── workflows/
│       └── ci.yml              ← GitHub Actions pipeline (Lint → Test → Coverage)
├── public/
│   └── index.html              ← Frontend (Task Board UI)
├── src/
│   └── tasks.js                ← Business logic (add, delete, update tasks)
├── tests/
│   └── tasks.test.js           ← API tests using Jest + Supertest
├── server.js                   ← Express server + REST API
├── .eslintrc.json              ← ESLint config
├── package.json
└── README.md
```

---

## 🌐 What the App Does

A Kanban-style Task Board with three columns:
- **To Do** — new tasks start here
- **In Progress** — tasks being worked on
- **Done** — completed tasks

Full REST API:
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PATCH | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## ⚙️ CI Pipeline — 2 Jobs, 4 Steps

```
Push to main
     │
     ▼
┌─────────────┐
│  Job 1      │
│  Lint Check │  ← ESLint scans all JS files for code quality issues
└──────┬──────┘
       │ (only runs if lint passes)
       ▼
┌──────────────────┐
│  Job 2           │
│  Test & Coverage │  ← Jest runs all API tests + generates coverage report
└──────────────────┘
       │
       ▼
  Coverage report uploaded as artifact (downloadable from Actions tab)
```

---

## 🛠️ Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/mlsa-taskboard.git
cd mlsa-taskboard

# Install dependencies
npm install

# Start the server
npm start

# Open in browser
http://localhost:3000

# Run tests
npm test

# Run lint
npm run lint
```

---

## 📚 Microsoft Learn Resources

- [Introduction to GitHub Actions](https://learn.microsoft.com/en-us/training/modules/introduction-to-github-actions/)
- [AZ-400: CI with Azure Pipelines & GitHub Actions](https://learn.microsoft.com/en-us/training/paths/az-400-implement-ci-with-azure-pipelines-github-actions/)
- [Evolve your DevOps practices](https://learn.microsoft.com/en-us/training/paths/evolve-your-devops-practices/)

---

## 👨‍💻 Author

**Ankit** — Microsoft Learn Student Ambassador (Beta)
Connect on LinkedIn: [Your LinkedIn Handle]