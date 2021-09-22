import React, { useEffect, useState } from "react";
import CharSelectModal from "./CharSelectModal";

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

  useEffect(() => {
    const playersCount = getLocalData("playersCount");

    const players = getLocalData("players")
      ? JSON.parse(getLocalData("players"))
      : 0;
    const charactersInGame = getLocalData("charactersInGame")
      ? JSON.parse(getLocalData("charactersInGame"))
      : 0;

    const playersLength = players ? players.length : 0;
    const charactersLength = charactersInGame ? charactersInGame.length : 0;

    setRemainingPlayers(playersCount - playersLength);
    setRemainingCharacters(playersCount - charactersLength);
  }, []);

  const startGameHandler = () => {
    const player_role_dictionary = giveRoles(
      JSON.parse(getLocalData("players")),
      JSON.parse(getLocalData("charactersInGame"))
    );

    localStorage.setItem(
      "player_role_dictionary",
      JSON.stringify(player_role_dictionary)
    );

    history.push("/players-roles");
  };

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
            Close
          </button>
          {type === "charSelect" && (
            <>
              <button
                className={tailwindStyles["btn-danger"]}
                type="button"
                onClick={backHandler}
              >
                back to Name Enter
              </button>
              <button
                className={tailwindStyles["btn-success"]}
                type="button"
                onClick={startGameHandler}
                disabled={remainingCharacters !== 0}
              >
                Start Game
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
              Go To Character Select
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
            Close
          </button>
          {type === "nameEnter" && (
            <>
              <button
                className={tailwindStyles["btn-success"]}
                type="button"
                onClick={changeModalHandler}
                disabled={remainingPlayers}
              >
                Go To Character Select
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
                back to Name Enter
              </button>
              <button
                className={tailwindStyles["btn-success"]}
                type="button"
                onClick={startGameHandler}
                disabled={remainingCharacters !== 0}
              >
                Start Game
              </button>
            </>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlt;
