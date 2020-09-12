const gameBoard = (function () {
  let board = { positions: ["", "", "", "", "", "", "", "", "", ""] };

  const getBoard = () => board.positions;

  const resetBoard = () => {
    board.positions = ["", "", "", "", "", "", "", "", "", ""];
  };

  const play = (character, position) => {
    board.positions[position] = character;
  };

  const checkSquarePlayed = (position) => {
    if (board.positions[position] == "") {
      return false;
    } else {
      return true;
    }
  };

  const getCharacterPositions = (character) => {
    let output = [];
    for (i = 0; i < 9; i++) {
      if (board.positions[i] == character) {
        output.push(i);
      }
    }
    return output;
  };

  return {
    getBoard,
    resetBoard,
    play,
    checkSquarePlayed,
    getCharacterPositions,
  };
})();

const displayController = (function () {
  const updateGameSquare = (character, position) => {
    document.getElementById(position.toString()).innerHTML = character;
  };
  resetBoard = () => {
    for (i = 0; i < 9; i++) {
      updateGameSquare("", i);
    }
  };

  return {
    updateGameSquare,
    resetBoard,
  };
})();

const Player = (name, character) => {
  return { name, character };
};

const gameLoop = (function () {
  let playerX = Player(window.prompt("Player X name?"), "X");
  let playerO = Player(window.prompt("Player O name?"), "O");

  let currentPlayer = playerX;

  const initalizeGame = () => {
    playerX = Player(window.prompt("Player X name?"), "X");
    playerO = Player(window.prompt("Player O name?"), "O");
    currentPlayer = playerX;
    gameBoard.resetBoard();
    displayController.resetBoard();
    document.getElementById("current-player").innerHTML =
      playerX.name + " place an X";
  };

  const checkForWinner = (currPlayer) => {
    var winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (i of winningPositions) {
      a = i[0];
      b = i[1];
      c = i[2];
      if (
        gameBoard
          .getCharacterPositions(currPlayer.character)
          .some((element) => element == a) &&
        gameBoard
          .getCharacterPositions(currPlayer.character)
          .some((element) => element == b) &&
        gameBoard
          .getCharacterPositions(currPlayer.character)
          .some((element) => element == c)
      ) {
        return true;
      }
    }
    return false;
  };

  document.getElementById("current-player").innerHTML =
    playerX.name + " place an X";

  document.getElementById("reset").addEventListener("click", function () {
    initalizeGame();
  });

  function squareClick(element) {
    if (!gameBoard.checkSquarePlayed(element.id)) {
      displayController.updateGameSquare(currentPlayer.character, element.id);
      gameBoard.play(currentPlayer.character, element.id);
      if (checkForWinner(currentPlayer)) {
        document.getElementById("current-player").innerHTML =
          currentPlayer.name + " has won! Let's play again!";
      } else {
        if (currentPlayer.character == "X") {
          currentPlayer = playerO;
          document.getElementById("current-player").innerHTML =
            playerO.name + " place an O";
        } else {
          currentPlayer = playerX;
          document.getElementById("current-player").innerHTML =
            playerX.name + " place an X";
        }
      }
    }
  }

  document.querySelectorAll(".gamesquare").forEach(function (element) {
    element.addEventListener("click", function thing() {
      squareClick(element);
    });
  });
})();
