import React, { useState, useEffect } from "react";

// Services
import getColor from "../../services/getColor";
import getLocalData from "../../services/getLocalData";

// Styles
import styles from "../../styles/CharacterButton.module.css";

const CharacterButton = ({
  character,
  setRemaining,
  names,
  charactersInGame,
  resetClicked,
  setCharactersInGame,
}) => {
  const { id, icon, title, type, max } = character;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const characters = getLocalData("charactersInGame")
      ? JSON.parse(getLocalData("charactersInGame"))
      : [];
    setCharactersInGame(characters);
  }, [id, names, setCharactersInGame]);

  const increaseHandler = () => {
    if (
      count + 1 <= max &&
      Number(getLocalData("playersCount")) - charactersInGame.length > 0
    ) {
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

  // need to change
  useEffect(() => {
    const countCharacter = (name) => {
      const characters = charactersInGame;
      return characters.filter((character) => character === name).length;
    };

    setCount(countCharacter(names[id - 1]));
  }, [charactersInGame, resetClicked, id, names]);

  const color = getColor(type);
  const buttonStyle = {
    border: `1px solid ${color}`,
    boxShadow: `0 0 12px ${color}`,
  };

  const showInfoHandler = () => {
    console.log(character);
  };

  return (
    <div
      className={styles.container}
      style={{ color: color, borderBottom: `1px solid ${color}` }}
    >
      <button onClick={increaseHandler} style={buttonStyle}>
        <span>{count > 0 ? count : "+"}</span>
      </button>
      <button onClick={showInfoHandler} style={buttonStyle}>
        <i className={icon}></i>
        <p>{title}</p>
      </button>
      <button onClick={decreaseHandler} style={buttonStyle}>
        -
      </button>
    </div>
  );
};

export default CharacterButton;
