import React, { useEffect, useState, useContext } from "react";
import CharSelectModal from "./CharSelectModal";

// Contexts
import { LanguageContext } from "../../contexts/LanguageContextProvider";

// Components
import NameEnterModal from "./NameEnterModal";

// Services
import getLocalData from "../../services/getLocalData";
import giveRoles from "../../services/shuffleRoles";

// Style
import tailwindStyles from "../../styles/tailwindClasses/Common";
import styles from "../../styles/Modal.module.css";
import Modal from "react-bootstrap/Modal";
import ScenarioCard from "../common/ScenarioCard";
import { getModal } from "../../services/getData";

const ModalAlt = ({
  show,
  closeHandler,
  backHandler,
  changeModalHandler,
  type,
  playerName,
  character,
  history,
}) => {
  const [remainingPlayers, setRemainingPlayers] = useState(0);
  const [remainingCharacters, setRemainingCharacters] = useState(0);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const playersCount = getLocalData("playersCount");

    const players = getLocalData("players") ? getLocalData("players") : 0;
    const charactersInGame = getLocalData("charactersInGame")
      ? getLocalData("charactersInGame")
      : 0;

    const playersLength = players ? players.length : 0;
    const charactersLength = charactersInGame ? charactersInGame.length : 0;

    setRemainingPlayers(playersCount - playersLength);
    setRemainingCharacters(playersCount - charactersLength);
  }, []);

  const startGameHandler = () => {
    const player_role_dictionary = giveRoles(
      getLocalData("players"),
      getLocalData("charactersInGame")
    );

    localStorage.setItem(
      "player_role_dictionary",
      JSON.stringify(player_role_dictionary)
    );

    history.push("/players-roles");
  };

  const { buttons } = getModal(language);

  return (
    <Modal show={show} onHide={closeHandler} className={styles.container}>
      <Modal.Header className={styles.headerContainer + " text-red-700"}>
        <Modal.Title>
          {type === "nameEnter" && remainingPlayers}
          {type === "charSelect" && remainingCharacters}
          {type === "showRole" && playerName}
        </Modal.Title>
        <div>
          <button
            className={tailwindStyles["btn-danger"]}
            type="button"
            onClick={closeHandler}
          >
            {buttons.close}
          </button>
          {type === "charSelect" && (
            <>
              <button
                className={tailwindStyles["btn-danger"]}
                type="button"
                onClick={backHandler}
              >
                {buttons.back_to_name_enter}
              </button>
              <button
                className={tailwindStyles["btn-success"]}
                type="button"
                onClick={startGameHandler}
                disabled={remainingCharacters !== 0}
              >
                {buttons.start}
              </button>
            </>
          )}
          {type === "nameEnter" && (
            <button
              className={tailwindStyles["btn-success"]}
              type="button"
              onClick={changeModalHandler}
              disabled={remainingPlayers}
            >
              {buttons.go_to_char_select}
            </button>
          )}
        </div>
      </Modal.Header>
      <Modal.Body>
        {type === "nameEnter" && (
          <NameEnterModal
            remaining={remainingPlayers}
            setRemaining={setRemainingPlayers}
          />
        )}
        {type === "charSelect" && (
          <CharSelectModal setRemaining={setRemainingCharacters} />
        )}
        {type === "showRole" && <ScenarioCard character={character} />}
      </Modal.Body>
      <Modal.Footer className={styles.footerContainer}>
        <div>
          <button
            className={tailwindStyles["btn-danger"]}
            type="button"
            onClick={closeHandler}
          >
            {buttons.close}
          </button>
          {type === "nameEnter" && (
            <>
              <button
                className={tailwindStyles["btn-success"]}
                type="button"
                onClick={changeModalHandler}
                disabled={remainingPlayers}
              >
                {buttons.go_to_char_select}
              </button>
            </>
          )}
          {type === "charSelect" && (
            <>
              <button
                className={tailwindStyles["btn-danger"]}
                type="button"
                onClick={backHandler}
              >
                {buttons.back_to_name_enter}
              </button>
              <button
                className={tailwindStyles["btn-success"]}
                type="button"
                onClick={startGameHandler}
                disabled={remainingCharacters !== 0}
              >
                {buttons.start}
              </button>
            </>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlt;
