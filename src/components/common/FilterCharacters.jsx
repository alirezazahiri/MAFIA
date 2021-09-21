import React from "react";
import getColor from "../../services/getColor";

const FilterCharacters = ({ setType }) => {
  const clickHandler = (e) => {
    console.log(e.target.name);
    setType(e.target.name);
  };

  const getStyles = (type) => {
    return {
      color: getColor(type),
      border: `1px solid ${getColor(type)}`,
      boxShadow: `0 0 12px ${getColor(type)}`,
      padding: "1px 5px",
    };
  };

  return (
    <div className="flex justify-between p-5">
      <button
        onClick={clickHandler}
        name="mafia"
        style={getStyles("mafia")}
      >
        Mafias
      </button>
      <button
        onClick={clickHandler}
        name="citizen"
        style={getStyles("citizen")}
      >
        Citizens
      </button>
      <button
        onClick={clickHandler}
        name="all"
        style={getStyles("all")}
      >
        All
      </button>
      <button
        onClick={clickHandler}
        name="mid-independent"
        style={getStyles("mid-independent")}
      >
        Mid Independents
      </button>
      <button
        onClick={clickHandler}
        name="independent"
        style={getStyles("independent")}
      >
        Independents
      </button>
    </div>
  );
};

export default FilterCharacters;
