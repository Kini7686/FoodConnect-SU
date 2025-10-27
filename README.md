# 🍱 FoodConnectSU  
### Connecting Surplus Food With Students in Need  
_A real-time campus food sharing platform_

---

## 📌 Overview

FoodConnectSU helps reduce **food waste** across **Syracuse University** by connecting surplus food to students in real time.

Students can:
- Post surplus food instantly
- Auto-detect food items using AI
- View nutrition info automatically
- Receive alerts when new food is available
- Claim food before it expires

Mission: **Feed students, not landfills.** 🌎💚

---

## 🚀 Features

- ✅ Google Login (Firebase Authentication)
- ✅ AI food recognition (TensorFlow.js)
- ✅ Nutritional info auto-mapping
- ✅ Live food availability + expiry countdown
- ✅ Realtime Firestore database sync
- ✅ Brevo email notifications
- ✅ Location dropdown for campus pickup points

---

## 🧩 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Firebase Cloud Functions + Express.js |
| Database | Firebase Firestore |
| Email | Brevo SMTP via secure local proxy |
| AI Model | TensorFlow.js Image Classification |
| Authentication | Firebase Google Auth |
| Hosting | Firebase Hosting |

---

## 🏛 Architecture Overview

```
┌──────────┐
│  Users   │
└─────┬────┘
      │
┌─────▼──────┐
│ React App  │
└─────┬──────┘
      │
┌─────▼──────────┐
│ Firebase Cloud │
│ Firestore + CF │
└─────┬──────────┘
      │
┌─────▼────────┐
│ Brevo Email  │
└──────────────┘
```

---

## 📂 Project Structure

```
FoodConnectSU/
│── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── services/
│   └── App.jsx
│── functions/        # Firebase Cloud Functions
│── server.js         # Brevo Email Proxy Server
│── package.json
│── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo
```sh
git clone https://github.com/Kini7686/FoodConnectSU.git
cd FoodConnectSU
```

### 2️⃣ Install dependencies
```sh
npm install
cd functions && npm install
```

### 3️⃣ Add Firebase config  
Create or update: `src/services/firebase.js`
```js
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
```

### 4️⃣ Configure Email Proxy  
Create a `.env` file next to `server.js`:
```env
BREVO_API_KEY=your-key-here
VITE_FIREBASE_KEY=your-key-here
VITE_FIREBASE_DOMAIN=foodconnectsu.firebaseapp.com
VITE_FIREBASE_PROJECT=foodconnectsu
VITE_FIREBASE_BUCKET=foodconnectsu.appspot.com
VITE_FIREBASE_SENDER=your-key-here
VITE_FIREBASE_APPID=your-key-here
VITE_RESEND_API_KEY=your-key-here
BREVO_API_KEY=your-key-here
```

Start the proxy:
```sh
node server.js
```

### 5️⃣ Start Dev Server
```sh
npm run dev
```

### 6️⃣ Deploy Cloud Functions (optional)
```sh
firebase deploy --only functions
```

---

## 🔐 Firestore Data Structure (Example)

```json
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
}
```

---

## ✨ Future Enhancements

| Feature | Status |
|---------|--------|
| Push notifications | 🔜 |
| Dietary preference filtering | 🔜 |
| Dining hall admin panel | 🔜 |
| Reward system for food donors | 🚀 Planned |

---



## 📝 License

This project is built for academic and social benefit at Syracuse University.  
Commercial use requires prior written permission.
