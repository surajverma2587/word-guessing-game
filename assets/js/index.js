const startBtn = document.querySelector("#start-btn");
const startContainer = document.querySelector("#start-container");
const headerElement = document.querySelector("#header");
const mainElement = document.querySelector("#main");

const letters = "abcdefghijklmnopqrstuvwxyz";

let timeRemaining = 60;

const word = prompt("Enter a movie name:");

const renderTimer = function () {
  // create timer element
  const timerElement = document.createElement("div");
  timerElement.textContent = "Time Remaining: " + timeRemaining;
  timerElement.setAttribute("class", "timer");
  timerElement.setAttribute("id", "timer");

  // append to header
  headerElement.appendChild(timerElement);
};

const renderGameOver = function () {
  alert("GAME OVER");
};

const verifyLetter = function (word, letter) {
  const wordArray = word.toLowerCase().split("");

  const isLetterPresent = wordArray.includes(letter);

  if (isLetterPresent) {
    // get indexes of letter(s) present
    const indices = [];
    let idx = wordArray.indexOf(letter);

    while (idx != -1) {
      indices.push(idx);
      idx = wordArray.indexOf(letter, idx + 1);
    }

    const letterDivs = document.querySelectorAll("#letter-item");

    for (let i = 0; i < indices.length; i++) {
      // target the div with the index
      const index = indices[i];
      const letterDiv = letterDivs[index];

      // set text content to letter
      letterDiv.textContent = letter;
    }
  } else {
    console.log("NOT PRESENT");
  }

  return isLetterPresent;
};

const handleLetterClick = function (event) {
  const currentTarget = event.currentTarget;
  const target = event.target;

  const isLetter = target.getAttribute("class") === "letter-item";

  if (isLetter) {
    const word = currentTarget.getAttribute("data-word");
    const letter = target.getAttribute("data-key");

    verifyLetter(word, letter);
  }
};

const renderGameContainer = function () {
  const gameContainerDiv = document.createElement("div");
  gameContainerDiv.setAttribute("class", "game-container");
  gameContainerDiv.setAttribute("id", "game-container");
  gameContainerDiv.setAttribute("data-word", word.toLowerCase());

  // word
  const wordDiv = document.createElement("div");
  wordDiv.setAttribute("class", "words-container");

  for (let i = 0; i < word.length; i++) {
    // create letter div
    const letterDiv = document.createElement("div");
    letterDiv.setAttribute("class", "letter-item");
    letterDiv.setAttribute("id", "letter-item");

    // append to wordDiv
    wordDiv.appendChild(letterDiv);
  }

  // letters
  const lettersContainerDiv = document.createElement("div");
  lettersContainerDiv.setAttribute("class", "letters-container");

  const lettersArray = letters.split("");

  for (let i = 0; i < lettersArray.length; i++) {
    const letter = lettersArray[i];

    // create div
    const letterDiv = document.createElement("div");
    letterDiv.setAttribute("class", "letter-item");
    letterDiv.setAttribute("data-key", letter);
    letterDiv.textContent = letter;

    // append to letters container
    lettersContainerDiv.appendChild(letterDiv);
  }

  gameContainerDiv.addEventListener("click", handleLetterClick);

  // append word and letters container to game container
  gameContainerDiv.append(wordDiv, lettersContainerDiv);

  // append game container to main
  mainElement.appendChild(gameContainerDiv);
};

const startTimer = function () {
  const timerElement = document.querySelector("#timer");

  // declare the tick function
  const timerTick = function () {
    // check if timer has elapsed
    if (timeRemaining <= 0) {
      clearInterval(timer);

      // remove game container
      const gameContainerDiv = document.querySelector("#game-container");
      gameContainerDiv.remove();

      // render the game over container
      renderGameOver();
    } else {
      // decrement time value
      timeRemaining -= 1;

      // update timer element text
      timerElement.textContent = "Time Remaining: " + timeRemaining;
    }
  };

  // set interval
  const timer = setInterval(timerTick, 1000);
};

const startGame = function () {
  // remove start container
  startContainer.remove();

  // set up timer and render timer element
  renderTimer();

  // start the timer
  startTimer();

  // render game container
  renderGameContainer();
};

startBtn.addEventListener("click", startGame);
