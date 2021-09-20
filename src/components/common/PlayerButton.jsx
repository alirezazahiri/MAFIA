import React, { useState } from "react";

// Modal
import Modal from "../modals/Modal";

const PlayerButton = ({ player, playersRole }) => {
  const [showModal, setShowModal] = useState(false);

  const showHandler = () => {
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={showHandler}>{player}</button>
      <Modal
        type="showRole"
        show={showModal}
        playerName={player}
        playerRole={playersRole[player]}
        closeHandler={closeHandler}
      />
    </div>
  );
};

export default PlayerButton;
