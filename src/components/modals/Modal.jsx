import React, { useEffect, useState } from "react";
import CharSelectModal from "./CharSelectModal";

// Components
import NameEnterModal from "./NameEnterModal";

// Services
import getLocalData from "../../services/getLocalData";
import giveRoles from "../../services/shuffleRoles";

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

    history.push("/game-control");
  };

  return (
    <>
      {show ? (
        <>
          <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*Major Modal Content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*Modal Header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {type === "nameEnter" && remainingPlayers}
                    {type === "charSelect" && remainingCharacters}
                    {type === "showRole" && playerName}
                  </h3>
                  <button onClick={closeHandler}>
                    <span className=" text-red-600 font-bold  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                {/*Modal Body*/}
                <div className="relative p-6 flex-auto">
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
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeHandler}
                  >
                    Close
                  </button>
                  {type === "nameEnter" && (
                    <button
                      className="bg-green-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={changeModalHandler}
                    >
                      Go To Character Select
                    </button>
                  )}
                  {type === "charSelect" && (
                    <>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={backHandler}
                      >
                        back to Name Enter
                      </button>
                      <button
                        className="bg-green-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
