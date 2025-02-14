import React, { useEffect, useRef } from "react";
import { Player } from "../modules/Player";
import { Colors } from "../modules/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setWhiteTime: React.Dispatch<React.SetStateAction<number>>;
  setBlackTime: React.Dispatch<React.SetStateAction<number>>;
  whiteTime: number;
  blackTime: number;
  isCheckmate: boolean;
  isTimeEnd: boolean;
}

export const Timer = ({
  currentPlayer,
  restart,
  setWhiteTime,
  setBlackTime,
  whiteTime,
  blackTime,
  isCheckmate,
  isTimeEnd,
}: TimerProps) => {
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, isTimeEnd]);

  useEffect(() => {
    if ((isCheckmate || isTimeEnd) && timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, [isCheckmate, isTimeEnd]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementWhiteTimer() {
    setWhiteTime((prevstate) => prevstate - 1);
  }
  function decrementBlackTimer() {
    setBlackTime((prevstate) => prevstate - 1);
  }

  return (
    <div className="timer">
      <div>
        <button className="restart-button" onClick={restart}>
          Restart Game
        </button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};
