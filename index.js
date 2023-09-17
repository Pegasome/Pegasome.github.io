// grabbing all the required elements
let buttons = document.querySelectorAll(".field"),
  restartBtn = document.querySelector(".restart"),
  popupEl = document.querySelector(".popup"),
  messageEl = document.querySelector(".message"),
  newGameBtn = document.querySelector(".new-game"),
  playerXScoreEl = document.querySelector(".player-x"),
  playerOScoreEl = document.querySelector(".player-o"),
  resetBtn = document.querySelector(".reset-score"),
  firstPlayer = document.querySelector(".first-player");

console.log(buttons, restartBtn);

// To determine the turn: turn 0 for O and 1 for X
let turnFlag = 0;

// To check the user key
let count = 0;

// Player score
let playerXScore = 0;
let playerOScore = 0;

// Buttons combination to win the game
let winingPosition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Event listener to Buttons

restartBtn.onclick = function () {
  enableButtons();
  determineFirstTurn();
  count = 0;
};

newGameBtn.onclick = function () {
  enableButtons();
  determineFirstTurn();
  count = 0;
};

resetBtn.onclick = function () {
  playerOScore = 0;
  playerXScore = 0;
  playerOScoreEl.innerText = 0;
  playerXScoreEl.innerText = 0;
};

// Functions
function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });

  // Show the message after a certain time
  setTimeout(() => {
    popupEl.classList.add("show");
  }, 500);
}

// Set to default
function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
    button.innerText = "";
    button.style.backgroundColor = "#f5f0f0";
    button.style.color = "#0066ff";
  });
  // Remove the message after some time
  popupEl.classList.remove("show");
}

// Display Winning Message if a player wins
function wins(button1, button2, button3) {
  disableButtons();
  // Set different color to winning buttons
  button1.setAttribute("style", "color:white; background-color:green");
  button2.setAttribute("style", "color:white; background-color:green");
  button3.setAttribute("style", "color:white; background-color:green");

  // Display the winner
  messageEl.innerText = `Player ${button1.innerText} wins`;
}

// Display the draw message and disable the button
function draw() {
  disableButtons();
  messageEl.innerText = "Game Draw";
}

// Update the score
function updateScore(value) {
  if (value == "X") {
    playerXScore++;
    playerXScoreEl.innerText = playerXScore;
  } else {
    playerOScore++;
    playerOScoreEl.innerText = playerOScore;
  }
}

// Generate the random turn each time
function determineFirstTurn() {
  firstPlayer.style.display = "inline";
  turnFlag = Math.floor(Math.random() * 2);
  if (turnFlag === 0) {
    firstPlayer.innerText = "'O' Plays First";
  } else {
    firstPlayer.innerText = "'X' Plays First";
  }
}

// Check for the winner
function checkWins() {
  for (let i = 0; i < winingPosition.length; i++) {
    let [element1, element2, element3] = [
      buttons[winingPosition[i][0]],
      buttons[winingPosition[i][1]],
      buttons[winingPosition[i][2]],
    ];

    // Check if the above elements are filled (either with X or O)
    if (
      element1.innerText != "" &&
      element2.innerText != "" &&
      element3.innerText != ""
    ) {
      // If that's the case then check if they all 3 have the same value or not
      if (
        element1.innerText == element2.innerText &&
        element1.innerText == element3.innerText &&
        element2.innerText == element3.innerText
      ) {
        updateScore(element1.innerText);
        disableButtons();
        wins(element1, element2, element3);
      }
    }
  }
}

// Write X or O on the button when clicked
buttons.forEach((button) => {
  button.onclick = function () {
    if (turnFlag === 0) {
      button.innerText = "O";
      button.disabled = true;
      turnFlag = 1;
    } else {
      button.innerText = "X";
      button.disabled = true;
      turnFlag = 0;
    }
    count++;
    if (count === 9) {
      draw();
    }
    checkWins();
  };
});
