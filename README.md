# 🍱 FoodConnectSU  
### Connecting Surplus Food With Students in Need  
_A Real-Time Campus Food Sharing Platform_

---

## 📌 Overview

FoodConnectSU is an initiative to reduce food waste across **Syracuse University** by connecting available surplus food to students in real time.

Users can:
- Upload surplus food posts
- Auto-detect food type using AI
- Receive nutrition info instantly
- Get notified via email when new food is posted
- Claim food before it expires

Mission: **Feed students, not landfills** 🌎💚

---

## 🚀 Features

- ✅ Google Login (Firebase Auth)
- ✅ AI food detection using TensorFlow.js
- ✅ Automated nutrition value mapping
- ✅ Real-time food availability & expiry countdown
- ✅ Firestore live sync (auto-refresh UI)
- ✅ Email alerts to all registered users (Brevo)
- ✅ Location picker with labeled drop points

---

## 🧩 Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Firebase Cloud Functions + Express |
| Database | Firebase Firestore |
| Email | Brevo SMTP via secure local proxy |
| AI Model | TensorFlow.js Image Classification |
| Auth | Firebase Google Authentication |
| Hosting | Firebase Hosting |

---

## 🏛 System Architecture

┌──────────┐
│ Users │
└──────┬───┘
│
┌──────▼──────┐
│ React App │
└──────┬──────┘
│
┌──────▼──────────┐
│ Firebase Cloud │
│ Firestore + Func│
└──────┬──────────┘
│
┌──────▼──────────┐
│ Brevo Email API │
└─────────────────┘


---

## 📂 Project Structure

FoodConnectSU/
│── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ ├── services/
│ └── App.jsx
│── functions/ (Cloud Functions backend)
│── server.js (Local email proxy)
│── README.md
│── package.json


---

## ⚙️ Installation Guide

### 1️⃣ Clone repository
```sh
git clone https://github.com/Kini7686/FoodConnectSU.git
cd FoodConnectSU
```

### 2️⃣ Install dependencies
```sh
npm install
cd functions && npm install
```

3️⃣ Firebase Config Setup

Inside src/services/firebase.js, add your credentials:

```sh

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

4️⃣ Brevo Email Proxy Setup

```sh

Create .env file:

BREVO_API_KEY=your-key-here

```
Start server:

node server.js

5️⃣ Start Development Environment
npm run dev

6️⃣ Deploy Cloud Functions (optional)
firebase deploy --only functions

🔐 Firestore Data Structure
foodPosts Collection Example
{
  "title": "Pizza",
  "quantity": 6,
  "foodName": "Pizza Slice",
  "nutrients": {
    "calories": 285,
    "protein": "12g",
    "carbs": "36g",
    "fat": "10g"
  },
  "location": {
    "label": "Schine Student Center",
    "lat": 43.036,
    "lng": -76.135
  },
  "imageBase64": "data:image/png;base64,...",
  "createdAt": "Timestamp",
  "expiryTime": "Timestamp",
  "status": "available"
}✨ Future Enhancements
Feature	Status
Push notifications	🔜
Student dietary preference filtering	🔜
Admin dining management panel	🔜
Rewards for posting food	🚀 planned
👨‍💻 Contributors
Name	Role
Utkarsh Mishra	Full Stack Developer
Team Members	UI, Testing, Deployment
📝 License

This project is developed for educational use at Syracuse University.
No commercial usage allowed without permission.
