import React, { useContext, useReducer } from "react";

// Services
import { getGameSetup } from "../services/getData";

// Contexts
import { LanguageContext } from "../contexts/LanguageContextProvider";

// Components
import Modal from "./modals/Modal";

const initialState = {
  type: "",
  nameEnter: false,
  charSelect: false,
};

const reducer = (state, action) => {
  switch (action) {
    case "CHARACTERS_SELECT":
      return {
        type: "charSelect",
        nameEnter: false,
        charSelect: true,
      };
    case "CLOSE_CHAR_MODAL":
      return {
        ...state,
        type: "",
        charSelect: false,
      };

    case "NAME_ENTER":
      return {
        type: "nameEnter",
        nameEnter: true,
        charSelect: false,
      };
    case "CLOSE_NAME_MODAL":
      return {
        ...state,
        type: "",
        nameEnter: false,
      };

    default:
      return state;
  }
};

const GameSetup = (props) => {
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
      <Modal
        type={state.type}
        show={state.nameEnter}
        changeModalHandler={() => dispatch("CHARACTERS_SELECT")}
        closeHandler={() => dispatch("CLOSE_NAME_MODAL")}
      />
      <Modal
        type={state.type}
        show={state.charSelect}
        backHandler={() => dispatch("NAME_ENTER")}
        closeHandler={() => dispatch("CLOSE_CHAR_MODAL")}
        history={props.history}
      />
    </div>
  );
};

export default GameSetup;
