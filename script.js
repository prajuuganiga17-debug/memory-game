const symbols = ["α","β","γ","δ","ε","ζ","η","θ"];
let cards = [...symbols, ...symbols];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 100;
let matchedPairs = 0;

const board = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

cards.sort(() => 0.5 - Math.random());

cards.forEach(symbol => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.innerText = "?";
  card.addEventListener("click", () => flipCard(card));
  board.appendChild(card);
});

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.innerText = card.dataset.symbol;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    resetTurn();

    if (matchedPairs === symbols.length) {
      message.innerText = "🎉 You won the game!";
    }
  } else {
    score -= 4;
    scoreDisplay.innerText = score;

    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerText = "?";
      secondCard.innerText = "?";
      resetTurn();
    }, 800);

    if (score <= 0) {
      message.innerText = "❌ Game Over! Score reached 0.";
      lockBoard = true;
    }
  }
}

function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}
