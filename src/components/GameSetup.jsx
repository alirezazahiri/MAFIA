import React, { useContext, useReducer } from "react";

// Services
import { getGameSetup } from "../services/getData";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";
import NameEnterModal from "./modals/Modal";

const initialState = {
  nameEnter: false,
  charSelect: false,
};

const reducer = (state, action) => {
  switch (action) {
    case "CHARACTERS_SELECT":
      return {
        nameEnter: false,
        charSelect: true,
      };

    case "NAME_ENTER":
      return {
        nameEnter: true,
        charSelect: false,
      };
    case "CLOSE_NAME_MODAL":
      return {
        ...state,
        nameEnter: false,
      };

    default:
      return state;
  }
};

const GameSetup = () => {
  const { language } = useContext(LanguageContext);
  const { title, description, prompt_1 } = getGameSetup(language);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <button onClick={() => dispatch("NAME_ENTER")}>{prompt_1}</button>
      {/* Modals */}
      <NameEnterModal
        show={state.nameEnter}
        closeHandler={() => dispatch("CLOSE_NAME_MODAL")}
      />
    </div>
  );
};

export default GameSetup;
