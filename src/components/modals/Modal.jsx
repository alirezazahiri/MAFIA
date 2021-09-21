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

const Modal = ({
  show,
  closeHandler,
  backHandler,
  changeModalHandler,
  type,
  playerName,
  playerRole,
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
    <>
      {show ? (
        <div>
          <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*Major Modal Content*/}
              <div
                className={tailwindStyles["modal-container"] + styles.container}
              >
                {/*Modal Header*/}
                <div className={tailwindStyles["modal-header"]}>
                  <h3 className="text-3xl font-semibold">
                    {type === "nameEnter" && remainingPlayers}
                    {type === "charSelect" && remainingCharacters}
                    {type === "showRole" && playerName}
                  </h3>
                  <button onClick={closeHandler}>
                    <span className={tailwindStyles["x-btn"]}>×</span>
                  </button>
                </div>

                {/*Modal Body*/}
                <div className={tailwindStyles["modal-content"]}>
                  {/* Modal Content */}
                  {type === "nameEnter" && (
                    <NameEnterModal
                      remaining={remainingPlayers}
                      setRemaining={setRemainingPlayers}
                    />
                  )}
                  {type === "charSelect" && (
                    <CharSelectModal setRemaining={setRemainingCharacters} />
                  )}
                  {type === "showRole" && (
                    <>
                      <h1>{playerRole}</h1>
                    </>
                  )}
                </div>

                {/*Modal Footer*/}
                <div className={tailwindStyles["modal-footer"]}>
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
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
