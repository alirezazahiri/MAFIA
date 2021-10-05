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
    localStorage.removeItem("player_role_dictionary");
    localStorage.removeItem("players_data");
    localStorage.removeItem("dead_or_alive_dict");
  };
  
  return (
    <div className={styles.container}>
      <button
        className={
          tailwindStyles["btn-reset"] + " mb-3"
        }
        type="button"
        onClick={charactersResetHandler}
      >
        {buttons.reset}
      </button>
      <FilterCharacters setType={setType}/>
      
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
      <ToastContainer autoClose={1500} theme="dark" newestOnTop />
    </div>
  );
};

export default CharSelectModal;
