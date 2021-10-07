import React, { useState, useContext } from "react";

// Modal
// import {ModalAlt as Modal} from "../modals/ModalAlt";

// Contexts
import { RolesContext } from "../../contexts/RolesContextProvider";

// Styles
import styles from "../../styles/PlayerButton.module.css"
import ModalAlt from '../modals/ModalAlt';
import { shorten } from '../../services/shorten';

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
      <button onClick={showHandler}>{shorten(player, 30, 27)}</button>
      <ModalAlt
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
