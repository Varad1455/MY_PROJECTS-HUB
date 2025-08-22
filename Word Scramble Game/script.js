// Select all necessary DOM elements
const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  scoreText = document.querySelector(".score b"),
  highScoreText = document.querySelector(".highscore b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

// Select audio elements
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

// Sample words and hints for the game
let words = [
    { word: "addition", hint: "The process of adding numbers" },
    { word: "meeting", hint: "Event in which people come together" },
    { word: "number", hint: "Math symbol used for counting" },
    { word: "exchange", hint: "The act of trading" },
    { word: "canvas", hint: "Piece of fabric for oil painting" },
    { word: "garden", hint: "Space for planting flower and plant" },
    { word: "position", hint: "Location of someone or something" },
    { word: "feather", hint: "Hair like outer covering of bird" },
    { word: "comfort", hint: "A state of physical ease" },
    { word: "tongue", hint: "The muscular organ of mouth" },
    { word: "expansion", hint: "The process of increase or grow" },
    { word: "country", hint: "A politically identified region" },
];

let correctWord, timer;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreText.innerText = highScore;

// Function to end the current game and start a new one
const endGameAndRestart = () => {
    score = 0; // Reset the score
    initGame(); // Start a new game
};

// Function to initialize the timer
const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    alert(`Time's up! ${correctWord.toUpperCase()} was the correct word.`);
    endGameAndRestart(); // End the game and restart
  }, 1000);
};

// Function to initialize the game
const initGame = () => {
  initTimer(30); // Start timer with 30 seconds
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("placeholder", "Enter a valid word");
  scoreText.innerText = score; // Update score display
};

// Function to check the user's word
const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return alert("Please enter a word to check.");

  if (userWord !== correctWord) {
    if (incorrectSound) {
        incorrectSound.currentTime = 0; // Rewind to the start
        incorrectSound.play();
    }
    return alert(`Oops! "${userWord}" is not the correct word.`);
  }

  if (correctSound) {
    correctSound.currentTime = 0; // Rewind to the start
    correctSound.play();
  }
  alert(`Congrats! "${correctWord.toUpperCase()}" is the correct word.`);
  score++; // Increment score

  // Check and update high score if needed
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("high-score", highScore);
    highScoreText.innerText = highScore;
  }

  initGame(); // Load a new word to continue the game
};

initGame();
refreshBtn.addEventListener("click", endGameAndRestart);
checkBtn.addEventListener("click", checkWord);