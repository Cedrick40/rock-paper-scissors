# Rock Paper Scissors Game

A static, responsive rock-paper-scissors game against the computer, with a running score. Built for Task 24 (Rock Paper Scissors Game) of my Web Development internship.

**Live page:** https://cedrick40.github.io/rock-paper-scissors/

## About the project
The player clicks Rock, Paper or Scissors (or presses R, P or S on the keyboard). The computer picks a random move, both moves are shown, and a coloured message says who won. A scoreboard keeps track of wins, losses and draws, and a Reset score button starts again from zero.

## Objective
To practice conditional logic, random choice and simple game state.

## Tools used
- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## My approach
- **Planning:** I wrote down the rules first: three choices, the computer picks one at random, a draw if both are the same, and otherwise a fixed rule about which choice beats which.
- **The computer's choice:** The choices live in an array, `["rock", "paper", "scissors"]`. `getComputerChoice()` uses `Math.floor(Math.random() * CHOICES.length)` to pick a random index, then returns the item at that index. Because `Math.random()` gives a number from 0 up to but not including 1, the index is always 0, 1 or 2.
- **Deciding the winner:** `getResult(player, computer)` compares the two choices. If they are equal it returns `"draw"`. Otherwise it looks up what the player's choice beats in a small `BEATS` object (`rock: "scissors"`, `paper: "rock"`, `scissors: "paper"`). If that matches the computer's choice, the result is `"win"`, and in every other case it is `"lose"`. This replaces a long chain of nine `if` statements with one lookup table.
- **Game state:** One `score` object holds `player`, `computer` and `draws`. `playRound()` gets the computer's choice, works out the result, adds one to the right counter, and then redraws the scoreboard, the two hands and the message.
- **Handling a tie:** A draw is checked first, gives no points to either side, and is counted in its own Draws box so the player can see how many rounds ended level.
- **Resetting the score:** The Reset score button sets all three counters back to zero, clears the two hands and the message, and redraws the scoreboard.
- **Feedback:** The result message names the winning move ("You win! Rock beats scissors."). The banner is green for a win, red for a loss and amber for a draw, so the result is clear at a glance. The message is also text, so colour is never the only signal.
- **Events and form of input:** Each button has a `data-choice` attribute that is passed to `playRound()`. I also added keyboard shortcuts (R, P, S) that are ignored when Ctrl, Alt or Cmd are held, so browser shortcuts such as Ctrl+P still work.
- **Accessibility:** Buttons have clear labels, the result uses `aria-live="polite"` so screen readers announce each round, the emoji are hidden from screen readers because the text already says what was chosen, and keyboard focus is clearly visible. The small pop animation is switched off for users who prefer reduced motion.
- **Layout and responsive design:** CSS Grid places the scoreboard and the three buttons in equal columns, and Flexbox centres the two hands. A media query for screens of 420px and below reduces the padding and sizes so everything fits on a small phone.
- **Design:** The page uses a warm neutral background with dark text, and colour is reserved for the result: green, red and amber.
- **Testing:** I checked all nine combinations of choices, ran thousands of computer picks to see that each move comes up about equally often, played wins, losses and draws, tried the keyboard shortcuts and the Reset button, and resized the browser to check the mobile layout.

## Project structure
```
rock-paper-scissors/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome
The result is a clean, responsive game with three choice buttons, a random computer move, win, lose and draw logic, and a running score with a reset button. This project taught me how a lookup table can replace many conditions, how an array and `Math.random()` give a fair random choice, and how a single state object keeps the screen and the logic in step.

## Interview questions
- **How would you determine the winner between two choices?** First check for a draw (both choices equal). Otherwise use a rule table that says what each choice beats, for example `rock` beats `scissors`. If the player's choice beats the computer's, the player wins; if not, the computer wins. A table is shorter and easier to change than nine separate `if` statements.
- **How would you make the computer's choice random?** Put the options in an array and pick a random index with `Math.floor(Math.random() * array.length)`. Using the array's length means the code still works if a new option is added later. `Math.random()` is fine for a game, but it is not suitable for security.
- **How would you handle a tie?** Compare the two choices before anything else. If they are the same, show a draw message, add no points to either side, and optionally count draws separately so the player sees how many rounds ended level.

## Credits
Random numbers and conditional statements follow the MDN documentation for `Math.random` and conditional statements. The font is Manrope from Google Fonts. The hand icons are standard emoji.

## Author
Cedrick Niyibikora