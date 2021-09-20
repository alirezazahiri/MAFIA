import React, { useState, useEffect } from "react";

// Services
import getColor from "../../services/getColor";
import getLocalData from "../../services/getLocalData";

const CharacterButton = ({
  character,
  setRemaining,
  names,
  charactersInGame,
  setCharactersInGame,
}) => {
  const { id, icon, title, type, max } = character;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const characters = getLocalData("charactersInGame")
      ? JSON.parse(getLocalData("charactersInGame"))
      : [];
    setCharactersInGame(characters);

    const characterCount = countCharacter(names[id - 1]);
    setCount(characterCount);
  }, [id, names, setCharactersInGame]);

  const increaseHandler = () => {
    if (count + 1 <= max && (Number(getLocalData("playersCount")) - charactersInGame.length) > 0) {
      setCount((prevCount) => prevCount + 1);

      const characterToAdd = names[id - 1];
      setCharactersInGame((prevCharacters) => {
        const newCharacters = [...prevCharacters, characterToAdd];
        localStorage.setItem("charactersInGame", JSON.stringify(newCharacters));
        const remaining =
          Number(getLocalData("playersCount")) - newCharacters.length;
        setRemaining(remaining);
        return newCharacters;
      });
    }
  };

  const countCharacter = (name) => {
    const characters = getLocalData("charactersInGame")
      ? JSON.parse(getLocalData("charactersInGame"))
      : [];
    return characters.filter((character) => character === name).length;
  };

  const decreaseHandler = () => {
    if (count - 1 >= 0) {
      setCount((prevCount) => prevCount - 1);

      const characterToRemove = names[id - 1];
      const idx = charactersInGame.indexOf(characterToRemove);
      const newCharacters = charactersInGame;
      newCharacters.splice(idx, 1);
      localStorage.setItem(
        "charactersInGame",
        JSON.stringify([...newCharacters])
      );

      const remaining =
        Number(getLocalData("playersCount")) - newCharacters.length;
      setRemaining(remaining);
    }
  };

  const color = getColor(type);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        color: color,
      }}
    >
      <button
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onClick={increaseHandler}
      >
        <i className={icon}></i>
        <span>{count > 0 && count}</span>
        <p>{title}</p>
      </button>
      <button
        onClick={decreaseHandler}
      >
        decrease
      </button>
    </div>
  );
};

export default CharacterButton;
