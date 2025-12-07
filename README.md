# 🎮 Simon Says Game

A fun and interactive **Simon Says** memory game built using **HTML, CSS, JavaScript**, and **Firebase Firestore** for a global leaderboard.

---

## 🚀 Features

- ✅ Interactive Simon color sequence game  
- ✅ Increasing difficulty levels  
- ✅ High score stored locally using `localStorage`  
- ✅ Global leaderboard using Firebase Firestore  
- ✅ Mobile-friendly UI  
- ✅ Smooth animations and button effects  
- ✅ CAPTCHA verification for leaderboard submissions  

---

## 🛠️ Technologies Used

- HTML5  
- CSS3  
- JavaScript (ES6)  
- Firebase Firestore  
- LocalStorage  

---

## 🎮 How to Play

1. Click the **Start Game** button or press any key to start  
2. Memorize the flashing color sequence  
3. Click the buttons in the correct order  
4. Each round adds a new color to the sequence  
5. Game ends when you make a mistake  
6. Enter your name and solve the CAPTCHA to save your score  
7. View the top scores on the leaderboard  

---

## 🌐 Live Demo

Add your deployed link here:  

[https://your-live-link.netlify.app](https://your-live-link.netlify.app)

---

## 📂 Project Structure

```
Simon-Game/
│
├── index.html       # Main HTML file
├── simon.css        # CSS styles
├── simon.js         # JavaScript game logic
└── README.md        # Project documentation
```

---

## 🔥 Firebase Setup

This project uses **Firebase Firestore** for storing leaderboard data.

### Steps:

1. Create a Firebase project  
2. Enable **Firestore Database**  
3. Replace the Firebase config in `simon.js` with your project credentials:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

4. Save the changes and open `index.html` in your browser  

---

## 🧑‍💻 Author

**Yash Kumar Sahu**  

- GitHub: [https://github.com/Yash8171](https://github.com/Yash8171)  
- Portfolio: [https://yks.netlify.app](https://yks.netlify.app)  
- LinkedIn: [https://linkedin.com/in/yash-kumar-sahu-b634b7251](https://linkedin.com/in/yash-kumar-sahu-b634b7251)  

---

⭐ Support

If you like this project, give it a ⭐ on GitHub!
