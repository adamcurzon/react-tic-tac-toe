import { useState } from "react";
import "./App.css";

const SQUARE_COUNT = 9;

const GAME_STATE = {
  X_TO_PLAY: 0,
  O_TO_PLAY: 1,
  X_WINNER: 2,
  O_WINNER: 3,
  TIE: 4,
};

const PLAYER_X = "X";
const PLAYER_O = "O";

const EMPTY_BOARD = JSON.stringify([]);

function App() {
  const [currentGameState, setCurrentGameState] = useState(
    GAME_STATE.X_TO_PLAY
  );
  const [gameBoard, setGameBoard] = useState(EMPTY_BOARD);

  function currentPlayer(): String {
    return currentGameState == GAME_STATE.X_TO_PLAY ? PLAYER_X : PLAYER_O;
  }

  function isGameOver(): Boolean {
    return currentGameState >= GAME_STATE.X_WINNER;
  }

  function status(): String {
    switch (currentGameState) {
      case GAME_STATE.X_TO_PLAY:
        return "It's X to play";
      case GAME_STATE.O_TO_PLAY:
        return "It's O to play";
      case GAME_STATE.X_WINNER:
        return "Player X wins!";
      case GAME_STATE.O_WINNER:
        return "Player O wins!";
      case GAME_STATE.TIE:
        return "It's a tie";
      default:
        return "";
    }
  }

  function setSquareVisited(
    gameBoard: Array<String>,
    squareId: number,
    player: String
  ): Array<String> {
    gameBoard[squareId] = player;
    setGameBoard(JSON.stringify(gameBoard));
    return gameBoard;
  }

  function isSquareVisited(
    gameBoard: Array<String>,
    squareId: number
  ): boolean {
    return gameBoard[squareId] != null;
  }

  function checkRow(
    gameBoard: Array<String>,
    player: String,
    a: number,
    b: number,
    c: number
  ): boolean {
    if (
      gameBoard[a] == player &&
      gameBoard[b] == player &&
      gameBoard[c] == player
    ) {
      return true;
    }
    return false;
  }

  function isWinner(gameBoard: Array<String>, player: String): boolean {
    if (
      // Horizontal
      checkRow(gameBoard, player, 0, 1, 2) ||
      checkRow(gameBoard, player, 3, 4, 5) ||
      checkRow(gameBoard, player, 6, 7, 8) ||
      // Vertical
      checkRow(gameBoard, player, 0, 3, 6) ||
      checkRow(gameBoard, player, 1, 4, 7) ||
      checkRow(gameBoard, player, 2, 5, 8) ||
      // Diaganol
      checkRow(gameBoard, player, 0, 4, 8) ||
      checkRow(gameBoard, player, 2, 4, 6)
    ) {
      return true;
    }
    return false;
  }

  function isTie(gameBoard: Array<String>): boolean {
    if (gameBoard.length !== SQUARE_COUNT) {
      return false;
    }
    for (let i = 0; i < SQUARE_COUNT; i++) {
      if (gameBoard[i] == null) {
        return false;
      }
    }
    return true;
  }

  function handleSquareClick(squareId: number): void {
    var currentGameBoard = JSON.parse(gameBoard);

    if (isGameOver() || isSquareVisited(currentGameBoard, squareId)) {
      return;
    }

    currentGameBoard = setSquareVisited(
      currentGameBoard,
      squareId,
      currentPlayer()
    );

    if (isWinner(currentGameBoard, PLAYER_X)) {
      setCurrentGameState(GAME_STATE.X_WINNER);
      return;
    }

    if (isWinner(currentGameBoard, PLAYER_O)) {
      setCurrentGameState(GAME_STATE.O_WINNER);
      return;
    }

    if (isTie(currentGameBoard)) {
      setCurrentGameState(GAME_STATE.TIE);
      return;
    }

    if (currentGameState == GAME_STATE.X_TO_PLAY) {
      setCurrentGameState(GAME_STATE.O_TO_PLAY);
    }

    if (currentGameState == GAME_STATE.O_TO_PLAY) {
      setCurrentGameState(GAME_STATE.X_TO_PLAY);
    }
  }

  function reset() {
    setCurrentGameState(GAME_STATE.X_TO_PLAY);
    setGameBoard(EMPTY_BOARD);
  }

  return (
    <>
      <h1>React Tic Tac Toe</h1>
      <h2>
        By{" "}
        <a href="https://github.com/adamcurzon" target="_blank">
          Adam Curzon
        </a>
      </h2>
      <h3 className="status">{status()}</h3>
      <div className="gameboard">
        {[...Array(SQUARE_COUNT)].map((_, squareId) => (
          <div
            className={"square " + JSON.parse(gameBoard)[squareId]}
            onClick={() => handleSquareClick(squareId)}
          >
            {JSON.parse(gameBoard)[squareId]}
          </div>
        ))}
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
