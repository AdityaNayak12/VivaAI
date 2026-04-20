# VivaAI 🎓

**VivaAI** is an AI-powered viva (oral exam) practice companion that generates targeted questions on any topic, evaluates your answers in real time, and tracks your performance over time — all in a sleek, glassmorphism-inspired dark UI.

> Built with React + Vite, powered by the Groq API, and backed by Firebase.

---

## ✨ Features

- **AI Question Generation** — Enter any topic and get 3 targeted viva-style questions generated instantly via the Groq API.
- **Answer Evaluation** — Answers are scored based on keyword matching against AI-provided reference keywords for each question.
- **Session Results** — See a detailed per-question breakdown with a score bar, an overall percentage, and a performance grade (Excellent / Good / Fair / Needs Work).
- **History & Stats** — Your dashboard shows total vivas taken, average score, and your last topic — all pulled from Firestore.
- **Authentication** — Sign up / sign in with email + password or Google OAuth (via Firebase Auth).
- **Protected Routes** — Dashboard, Viva Room, and Results pages require authentication.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + Vanilla CSS |
| AI | Groq API (`openai/gpt-oss-120b`) |
| Auth | Firebase Authentication (Email + Google) |
| Database | Firebase Firestore |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AnswerInput.jsx     # Textarea + submit button for the viva room
│   ├── ProtectedRoute.jsx  # Auth guard for private routes
│   ├── QuestionCard.jsx    # Displays the current question + progress
│   └── TopBar.jsx          # Navigation bar with user info and sign-out
├── context/
│   └── AuthContext.jsx     # Firebase auth state via React Context
├── pages/
│   ├── Landing.jsx         # Public landing / marketing page
│   ├── Login.jsx           # Sign in / Sign up page
│   ├── Dashboard.jsx       # Start a new viva + view personal stats
│   ├── VivaRoom.jsx        # Live question-answer interface
│   └── Result.jsx          # Session results with score breakdown
├── services/
│   ├── firebase.js         # Firebase app initialization
│   ├── authService.js      # signup / signin / Google OAuth helpers
│   ├── ai.Service.js       # Groq API integration (question generation)
│   └── dbService.js        # Firestore read/write for viva sessions
└── utils/
    ├── evaluate.js         # Keyword-based answer scoring logic
    └── getDisplayName.js   # Extracts a friendly name from a Firebase user
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Firebase](https://firebase.google.com/) project with **Authentication** (Email/Password + Google) and **Firestore** enabled
- A [Groq](https://console.groq.com/) API key

### 1. Clone the repository

```bash
git clone https://github.com/AdityaNayak12/VivaAI.git
cd VivaAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# Groq AI
VITE_GROQ_API_KEY=your_groq_api_key_here

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Note:** `.env` is listed in `.gitignore` and will never be committed.

### 4. Run locally

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## ☁️ Deploying to Vercel

1. Push your code to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Add all environment variables from your `.env` file in the **Environment Variables** section of your Vercel project settings.
4. Deploy — Vercel will automatically run `npm run build`.

---

## 🎮 How It Works

```
Dashboard  →  Enter a topic
           →  VivaRoom  (AI generates 3 questions via Groq)
           →  Answer each question one by one
           →  Result page  (keyword-based scoring + grade)
           →  Session saved to Firestore
           →  Stats updated on Dashboard
```

### Scoring

Each question carries a maximum score equal to the number of AI-provided reference keywords + 1 (base point). Your answer is scanned for how many of those keywords it contains. The total percentage determines your grade:

| Score | Grade |
|---|---|
| ≥ 80% | ✅ Excellent |
| ≥ 55% | 🟣 Good |
| ≥ 30% | 🟡 Fair |
| < 30% | 🔴 Needs Work |

---

## 🔐 Authentication Flow

- **Sign Up / Sign In** via email + password or Google OAuth.
- Auth state is managed globally via `AuthContext`.
- All app pages (`/dashboard`, `/viva`, `/result`) are wrapped in `ProtectedRoute` — unauthenticated users are redirected to `/login`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## 📄 License

MIT — feel free to use, modify, and distribute.
