import { useEffect, useState } from "react";

import "./App.css";
import { Board } from "./modules/Board";
import BoardComponent from "./components/BoardComponent";
import { Player } from "./modules/Player";
import { Colors } from "./modules/Colors";
import { LostFiguresComponent } from "./components/LostFiguresComponent";
import { Timer } from "./components/Timer";
import CheckmateModal from "./components/GameEndModal";
const GAME_TIME = 300;

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isCheckmate, setIsCheckmate] = useState(false);
  const [blackTime, setBlackTime] = useState<number>(GAME_TIME);
  const [whiteTime, setWhiteTime] = useState<number>(GAME_TIME);
  const [isTimeEnd, setIsTimeEnd] = useState<boolean>(false);
  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      setIsTimeEnd(true);
    }
  }, [whiteTime, blackTime]);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setIsCheckmate(false);
    setIsTimeEnd(false);
    setWhiteTime(GAME_TIME);
    setBlackTime(GAME_TIME);
  }

  function handleClose() {
    setIsCheckmate(false);
    restart();
  }

  function swapPlayer() {
    setCurrentPlayer((prevPlayer) =>
      prevPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  }

  return (
    <div className="app">
      <Timer
        currentPlayer={currentPlayer}
        restart={restart}
        setWhiteTime={setWhiteTime}
        setBlackTime={setBlackTime}
        whiteTime={whiteTime}
        blackTime={blackTime}
        isCheckmate={isCheckmate}
        isTimeEnd={isTimeEnd}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        setIsCheckmate={setIsCheckmate}
      />
      <div>
        <LostFiguresComponent
          title={"Black"}
          figures={board.lostBlackFigures}
        />
        <LostFiguresComponent
          title={"White"}
          figures={board.lostWhiteFigures}
        />
      </div>
      <CheckmateModal
        isCheckmate={isCheckmate}
        isTimeEnd={isTimeEnd}
        onClose={handleClose}
        currentPlayerColor={currentPlayer?.color}
      />
    </div>
  );
}

export default App;
