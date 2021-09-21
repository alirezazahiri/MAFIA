import React, { useContext, useState } from "react";

// Contexts
import { RolesContext } from "../../contexts/RolesContextProvider";

// Components
import CharacterButton from "../common/CharacterButton";
import tailwindStyles from "../../styles/tailwindClasses/Common";
import getLocalData from "../../services/getLocalData";
import FilterCharacters from "../common/FilterCharacters";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CharSelectModal = ({ setRemaining }) => {
  const { characters, names } = useContext(RolesContext);
  const [charactersInGame, setCharactersInGame] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [type, setType] = useState("all");

  const charactersResetHandler = () => {
    setResetClicked((prevStatus) => !prevStatus);
    toast.success("Characters Resetted Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setCharactersInGame([]);
    localStorage.setItem("charactersInGame", JSON.stringify([]));
    setRemaining(Number(getLocalData("playersCount")));
  };
  return (
    <div>
      <FilterCharacters setType={setType} />
      {characters
        .filter((character) =>
          type === "all" ? true : character.type === type
        )
        .map((character) => (
          <CharacterButton
            key={character.id}
            character={character}
            setRemaining={setRemaining}
            names={names}
            charactersInGame={charactersInGame}
            setCharactersInGame={setCharactersInGame}
            resetClicked={resetClicked}
          />
        ))}
      <button
        className={
          "border border-yellow-600 mt-5" + tailwindStyles["btn-warning"]
        }
        type="button"
        onClick={charactersResetHandler}
      >
        reset
      </button>
      <ToastContainer autoClose={1000} theme="dark" limit={1} newestOnTop />
    </div>
  );
};

export default CharSelectModal;
