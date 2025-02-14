import React from "react";
import { Colors } from "../modules/Colors";

interface ModalProps {
  isCheckmate: boolean;
  isTimeEnd: boolean;
  onClose: () => void;
  currentPlayerColor: Colors | undefined;
}

const CheckmateModal: React.FC<ModalProps> = ({
  isCheckmate,
  isTimeEnd,
  onClose,
  currentPlayerColor,
}) => {
  if (!isCheckmate && !isTimeEnd) return null;
  return (
    <div className="modal-container">
      <div className="text-container">
        {isCheckmate ? (
          <h2 className="modal-text">
            Game end! {currentPlayerColor === Colors.WHITE ? "Black" : "White"}{" "}
            figures wins!
          </h2>
        ) : (
          <h2 className="modal-text">
            Game end! {currentPlayerColor} runs out of time!
          </h2>
        )}

        <button className="modal-close-button" onClick={onClose}>
          New Game
        </button>
      </div>
    </div>
  );
};

export default CheckmateModal;
