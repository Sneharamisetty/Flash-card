const flashcards = {
  html: [
    { question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { question: "HTML tag to add image?", answer: "<img>" }
  ],
  css: [
    { question: "What is a CSS selector?", answer: "It selects elements to style." },
    { question: "How to change text color?", answer: "color: red;" }
  ],
  js: [
    { question: "What is a variable in JS?", answer: "A container to store data." },
    { question: "How to declare a function?", answer: "function name() { }" }
  ]
};

let currentCategory = "html";
let currentIndex = 0;
let score = 0;
let shuffledCards = [];

const categorySelect = document.getElementById("categorySelect");
const cardContainer = document.getElementById("cardContainer");
const scoreDisplay = document.getElementById("score");

categorySelect.addEventListener("change", () => {
  currentCategory = categorySelect.value;
  currentIndex = 0;
  score = 0;
  shuffleCards();
  updateCard();
});

function createCard(flashcard) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="front">${flashcard.question}</div>
    <div class="back">${flashcard.answer}</div>
  `;
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    score++;
    scoreDisplay.textContent = score;
  });
  return card;
}

function updateCard() {
  cardContainer.innerHTML = "";
  const card = createCard(shuffledCards[currentIndex]);
  cardContainer.appendChild(card);
}

function shuffleCards() {
  shuffledCards = [...flashcards[currentCategory]];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
  }
  updateCard();
}

function nextCard() {
  currentIndex = (currentIndex + 1) % shuffledCards.length;
  updateCard();
}

function prevCard() {
  currentIndex = (currentIndex - 1 + shuffledCards.length) % shuffledCards.length;
  updateCard();
}

// Initial load
shuffleCards();
