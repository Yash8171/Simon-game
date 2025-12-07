// 🔹 Firebase Config (SAFE FRONTEND CONFIG)
const firebaseConfig = {
  apiKey: "AIzaSyD89MCfg8arQOsjKf5V0zGDFIsMc4kvZWE",
  authDomain: "simon-game-yks.firebaseapp.com",
  projectId: "simon-game-yks",
  storageBucket: "simon-game-yks.firebasestorage.app",
  messagingSenderId: "451116089108",
  appId: "1:451116089108:web:1eb5926fe265f5b30f0c01",
  measurementId: "G-LZC4RVKTBY"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🔹 Elements
const statusText = document.getElementById("status");
const levelText = document.getElementById("level");
const highScoreText = document.getElementById("highScore");
const leaderboardList = document.getElementById("leaderboardList");
const startBtn = document.getElementById("startBtn");
const gameButtons = document.querySelectorAll(".btn");

// 🔹 Modal Elements
const nameModal = document.getElementById("nameModal");
const playerNameInput = document.getElementById("playerNameInput");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const closeModalBtn = document.getElementById("closeModal");
const captchaQuestion = document.getElementById("captchaQuestion");
const captchaInput = document.getElementById("captchaInput");

// 🔹 Game Variables
let gameSeq = [];
let userSeq = [];
const btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let finalLevel = 0; // store the last completed level
let acceptingInput = false;

// 🔹 CAPTCHA variable
let captchaAnswer = 0;

// 🔹 High Score
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreText.innerText = highScore;

// 🔹 Disable buttons initially
gameButtons.forEach(btn => btn.style.pointerEvents = "none");

// ✅ Start Game
function startGame() {
  if (started) return;

  started = true;
  acceptingInput = false;
  resetGame();
  levelUp();

  statusText.innerText = "Game Started!";
  startBtn.style.display = "none";

  gameButtons.forEach(btn => btn.style.pointerEvents = "auto");
}

// ✅ Start via keyboard
document.addEventListener("keypress", () => {
  if (!started) startGame();
});

// ✅ Start via button
startBtn.addEventListener("click", startGame);

// 🔹 Button flash
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 250);
}

// 🔹 Level Up
function levelUp() {
  acceptingInput = false;
  userSeq = [];
  level++;

  levelText.innerText = level;
  statusText.innerText = `Level ${level}`;

  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  const randBtn = document.getElementById(randColor);

  gameSeq.push(randColor);

  setTimeout(() => {
    gameFlash(randBtn);
    acceptingInput = true;
  }, 500);
}

// 🔹 Check Answer
function checkAns(idx) {
  if (!started || !acceptingInput) return;

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    gameOver();
  }
}

// 🔹 Button Click
function btnPress() {
  if (!started || !acceptingInput) return;

  const btn = this;
  userFlash(btn);

  const color = btn.id;
  userSeq.push(color);

  checkAns(userSeq.length - 1);
}

gameButtons.forEach(btn => btn.addEventListener("click", btnPress));

// 🔹 Generate CAPTCHA
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1; // 1–10
  const b = Math.floor(Math.random() * 10) + 1;
  const op = Math.random() > 0.5 ? "+" : "-";

  captchaAnswer = op === "+" ? a + b : a - b;
  captchaQuestion.innerText = `CAPTCHA: ${a} ${op} ${b} = ?`;
  captchaInput.value = "";
}

// 🔹 Game Over
function gameOver() {
  document.body.style.background = "red";

  setTimeout(() => {
    document.body.style.background = "linear-gradient(135deg, #1f1c2c, #928dab)";
  }, 200);

  started = false;
  acceptingInput = false;

  gameButtons.forEach(btn => btn.style.pointerEvents = "none");

  // Save last level
  finalLevel = level;

  // High score
  if (finalLevel > highScore) {
    highScore = finalLevel;
    localStorage.setItem("highScore", highScore);
    highScoreText.innerText = highScore;
  }

  // Show modal and generate CAPTCHA
  nameModal.style.display = "flex";
  playerNameInput.value = "";
  playerNameInput.focus();
  generateCaptcha();

  statusText.innerText = "❌ Game Over — Solve CAPTCHA & Save your score";
}

// ✅ Save Score Button with CAPTCHA check
saveScoreBtn.addEventListener("click", () => {
  const playerName = playerNameInput.value.trim();
  const captchaVal = Number(captchaInput.value.trim());

  if (!playerName) {
    alert("Please enter your name");
    return;
  }

  if (playerName.length > 20) {
    alert("Max 20 characters allowed!");
    return;
  }

  if (captchaVal !== captchaAnswer) {
    alert("Incorrect CAPTCHA! Try again.");
    generateCaptcha();
    return;
  }

  if (finalLevel > 9999) {
    alert("Invalid score!");
    return;
  }

  db.collection("leaderboard").add({
    name: playerName,
    score: finalLevel,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  nameModal.style.display = "none";
  reset();
  startBtn.style.display = "inline-block";
  statusText.innerText = "✅ Score saved! Click Start to play again";
});

// 🔹 Close modal without saving
closeModalBtn.addEventListener("click", () => {
  nameModal.style.display = "none";
  reset();
  startBtn.style.display = "inline-block";
  statusText.innerText = "❌ Score not saved. Click Start to play again";
});

// 🔹 Reset
function reset() {
  started = false;
  acceptingInput = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  finalLevel = 0;
  levelText.innerText = 0;
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelText.innerText = 0;
}

// 🔹 Render Leaderboard
function renderLeaderboard() {
  db.collection("leaderboard")
    .orderBy("score", "desc")
    .limit(5)
    .onSnapshot(snapshot => {
      leaderboardList.innerHTML = "";
      let index = 1;

      snapshot.forEach(doc => {
        const data = doc.data();
        if (!data.name || typeof data.score !== "number") return;

        const li = document.createElement("li");
        li.innerHTML = `
          <span class="leaderboard-rank">${index}.</span>
          <span class="leaderboard-name">${data.name}</span>
          <span class="leaderboard-score">${data.score}</span>
        `;
        leaderboardList.appendChild(li);
        index++;
      });
    });
}

// ✅ Load Leaderboard
renderLeaderboard();
