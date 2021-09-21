import React, { useState, useContext } from "react";

// Modal
import Modal from "../modals/Modal";

// Contexts
import { RolesContext } from "../../contexts/RolesContextProvider";

// Styles
import styles from "../../styles/PlayerButton.module.css"

const PlayerButton = ({ player, playersRole }) => {
  const [showModal, setShowModal] = useState(false);
  
  const {characters, names} = useContext(RolesContext)
  const idx = names.findIndex(name => name === playersRole[player])

  const showHandler = () => {
    setShowModal(true);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={showHandler}>{player}</button>
      <Modal
        type="showRole"
        show={showModal}
        playerName={player}
        character={characters[idx]}
        closeHandler={closeHandler}
      />
    </div>
  );
};

export default PlayerButton;
