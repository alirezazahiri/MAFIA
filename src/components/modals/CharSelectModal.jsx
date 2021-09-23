import React, { useContext, useState } from "react";

// Contexts
import { RolesContext } from "../../contexts/RolesContextProvider";
import { LanguageContext } from "../../contexts/LanguageContextProvider";

// Components
import CharacterButton from "../common/CharacterButton";
import tailwindStyles from "../../styles/tailwindClasses/Common";
import getLocalData from "../../services/getLocalData";
import FilterCharacters from "../common/FilterCharacters";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles 
import styles from "../../styles/CharSelectModal.module.css"
import { getCharSelect } from '../../services/getData';

const CharSelectModal = ({ setRemaining }) => {
  const { characters, names } = useContext(RolesContext);
  const [charactersInGame, setCharactersInGame] = useState([]);
  const [resetClicked, setResetClicked] = useState(false);
  const [type, setType] = useState("all");
  const {language} = useContext(LanguageContext)
  const {buttons, reset_message} = getCharSelect(language)

  const charactersResetHandler = () => {
    setResetClicked((prevStatus) => !prevStatus);
    toast.success(reset_message);

    setCharactersInGame([]);
    localStorage.setItem("charactersInGame", JSON.stringify([]));
    setRemaining(Number(getLocalData("playersCount")));
  };
  return (
    <div className={styles.container}>
      <FilterCharacters setType={setType} />
      <button
        className={
          "border border-yellow-600 mt-3" + tailwindStyles["btn-warning"]
        }
        type="button"
        onClick={charactersResetHandler}
      >
        {buttons.reset}
      </button>
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
          "border border-yellow-600 mt-3" + tailwindStyles["btn-warning"]
        }
        type="button"
        onClick={charactersResetHandler}
      >
        {buttons.reset}
      </button>
      <ToastContainer autoClose={1500} theme="dark" newestOnTop />
    </div>
  );
};

export default CharSelectModal;
