// ===== Game logic =====

const CHOICES = ["rock", "paper", "scissors"];
const ICONS = { rock: "✊", paper: "✋", scissors: "✌️" };

// What each choice beats
const BEATS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// The computer picks a random index from the array
function getComputerChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

// Compare the two choices: returns "win", "lose" or "draw" from the player's point of view
function getResult(player, computer) {
  if (player === computer) return "draw";        // same choice, nobody wins
  if (BEATS[player] === computer) return "win";  // the player's choice beats the computer's
  return "lose";                                 // otherwise the computer's choice beats the player's
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function describeResult(result, player, computer) {
  if (result === "draw") return "It is a draw! You both chose " + player + ".";
  if (result === "win") return "You win! " + capitalize(player) + " beats " + computer + ".";
  return "You lose! " + capitalize(computer) + " beats " + player + ".";
}

// ===== DOM and game state =====

const score = { player: 0, computer: 0, draws: 0 };

const scoreEls = {
  player: document.getElementById("score-player"),
  computer: document.getElementById("score-computer"),
  draws: document.getElementById("score-draws"),
};
const playerIcon = document.getElementById("player-icon");
const computerIcon = document.getElementById("computer-icon");
const resultEl = document.getElementById("result");
const choiceButtons = document.querySelectorAll(".choice");
const resetBtn = document.getElementById("reset");

function renderScore() {
  scoreEls.player.textContent = score.player;
  scoreEls.computer.textContent = score.computer;
  scoreEls.draws.textContent = score.draws;
}

function showHand(el, choice) {
  el.textContent = ICONS[choice];
  el.classList.remove("pop");
  void el.offsetWidth;               // restart the animation
  el.classList.add("pop");
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  // Update the score
  if (result === "win") score.player++;
  else if (result === "lose") score.computer++;
  else score.draws++;

  // Update the screen
  showHand(playerIcon, playerChoice);
  showHand(computerIcon, computerChoice);
  resultEl.textContent = describeResult(result, playerChoice, computerChoice);
  resultEl.className = "result " + result;
  renderScore();
}

function resetGame() {
  score.player = 0;
  score.computer = 0;
  score.draws = 0;
  playerIcon.textContent = "❔";
  computerIcon.textContent = "❔";
  playerIcon.classList.remove("pop");
  computerIcon.classList.remove("pop");
  resultEl.textContent = "Score reset. Choose rock, paper or scissors to start.";
  resultEl.className = "result";
  renderScore();
}

// ===== Events =====
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});

resetBtn.addEventListener("click", resetGame);

// Keyboard shortcuts: R, P and S
const KEYS = { r: "rock", p: "paper", s: "scissors" };
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const choice = KEYS[e.key.toLowerCase()];
  if (choice) playRound(choice);
});

renderScore();