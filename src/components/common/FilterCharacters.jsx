import React, { useReducer } from "react";
import getColor from "../../services/getColor";

// Styles
import styles from "../../styles/FilterCharacters.module.css";

const initialState = {
  mafia: false,
  citizen: false,
  all: false,
  independent: false,
  "mid-independent": false,
};

const reducer = (state, action) => {
  console.log(action)
  switch (action) {
    case "mafia":
      return { ...initialState, mafia: true };
    case "citizen":
      return { ...initialState, citizen: true };
    case "all":
      return { ...initialState, all: true };
    case "independent":
      return { ...initialState, independent: true };
    case "mid-independent":
      return { ...initialState, "mid-independent": true };
    default:
      return state;
  }
};

const FilterCharacters = ({ setType }) => {
  const clickHandler = (e) => {
    setType(e.target.name);
  };

  const [hover, dispatch] = useReducer(reducer, initialState);

  const getStyles = (type) => {
    return {
      color: getColor(type),
      border: `1px solid ${getColor(type)}`,
      boxShadow: hover[type] ? `0 0 12px ${getColor(type)}` : "",
      padding: "1px 5px",
      width: "18%",
      height: "80px",
      transition: "all 0.2s"
    };
  };

  return (
    <div className={styles.container}>
      <button
        onClick={clickHandler}
        name="mafia"
        style={getStyles("mafia")}
        onMouseOver={() => dispatch("mafia")}
      >
        Mafias
      </button>
      <button
        onClick={clickHandler}
        name="citizen"
        style={getStyles("citizen")}
        onMouseOver={() => dispatch("citizen")}
      >
        Citizens
      </button>
      <button
        onClick={clickHandler}
        name="all"
        style={getStyles("all")}
        onMouseOver={() => dispatch("all")}
      >
        All
      </button>
      <button
        onClick={clickHandler}
        name="mid-independent"
        style={getStyles("mid-independent")}
        onMouseOver={() => dispatch("mid-independent")}
      >
        Mid Independents
      </button>
      <button
        onClick={clickHandler}
        name="independent"
        style={getStyles("independent")}
        onMouseOver={() => dispatch("independent")}
      >
        Independents
      </button>
    </div>
  );
};

export default FilterCharacters;
