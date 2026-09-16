# 🎁 23 Gifts Birthday Surprise Web App ❤️

A romantic, interactive **23 Gifts Birthday Surprise Web App** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), featuring glassy white UI, smooth cinematic animations, heart confetti celebration particles, and mobile-first responsive design.

---

## ✨ Features

- **Full-screen Background Images**:
  - `homepage.jpg` for Home Page & Cinematic Countdown.
  - `mainpage.jpg` for Gift Activity Page & Final Thank You Screen.
- **Glassmorphism Design Language**:
  - Pure white and semi-transparent glass cards, borders, buttons, and glow effects.
  - Delicate typography styled with romantic Google Fonts.
- **Interactive User Flow**:
  1. **Home Page**: *"Are you excited to open your gifts? ❤️"* with **YES ❤️** and **NO** buttons.
  2. **NO Button Feedback**: Romantic glass-white modal (*"Don't miss the exciting gifts, my dear! ❤️"*) with smooth fade-in and scale-up animation.
  3. **Cinematic Countdown**: *"Are you ready? ❤️"* followed by large glassy **3 → 2 → 1** zoom & pop numbers.
  4. **23 Shuffled Gifts**: Every start randomly shuffles numbers 1 to 23 (guaranteed no repeats, no omissions).
  5. **Heart Confetti Blast**: Romantic heart celebration drops and swirls on every single gift reveal.
  6. **Progress Indicator**: Frosted pill tracking *"Gift X of 23"*.
  7. **Thank You Screen**: *"Thank You ❤️"* and *"I hope you loved every little surprise. ❤️"* with a *"Back to Home ❤️"* reset button.
- **Sound Delight**:
  - Web Audio API romantic chime sparkles and gentle pops on interactions (toggleable via the top-right sound icon).
- **Extensible MERN Backend**:
  - Clean Express.js backend with MongoDB Mongoose schemas ready for future expansion (messages, photos, hints, locations for each gift).
  - Built-in graceful in-memory fallback so it runs immediately out of the box.

---

## 🚀 Quick Start

### 1. Install Dependencies

In the root directory, run:
```bash
npm run install:all
```
*(Or run `npm install` inside both `backend/` and `frontend/` folders)*

### 2. Start the Backend & Frontend

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
npm run backend
```
*(Backend runs at http://localhost:5000)*

**Terminal 2 (Frontend):**
```bash
npm run frontend
```
*(Frontend runs at http://localhost:3000)*

Open your browser and navigate to **`http://localhost:3000`** to view the application.

---

## 🗄️ Backend & MongoDB Setup

The backend connects to MongoDB if available via `MONGODB_URI` in `backend/.env`. If MongoDB is not running locally, the server automatically operates in a lightweight in-memory fallback mode so all functionality works seamlessly.

### MongoDB Configuration (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/gifts_db
NODE_ENV=development
```

### Available API Endpoints
- `GET /api/gifts/sequence` - Returns a randomized permutation of numbers 1-23.
- `GET /api/gifts` - Returns all 23 gifts with any stored details.
- `GET /api/gifts/:number` - Returns specific gift details.
- `PUT /api/gifts/:number` - Updates a gift (message, photo, note, etc.).
- `POST /api/gifts/seed` - Seeds default 23 gifts into MongoDB.

---

## 📱 Mobile Optimization

Optimized for iPhone, Android, and tablets with:
- Safe area inset padding and `100dvh` viewport height.
- Touch-friendly glass buttons with press feedback.
- Non-blocking celebratory heart particle animations (`pointer-events: none`).
