import React, { useContext, useState } from "react";

// Contexts
import { RolesContext } from "../../contexts/RolesContextProvider";

// Components
import CharacterButton from "../common/CharacterButton";

const CharSelectModal = ({ setRemaining }) => {
  const { characters, names } = useContext(RolesContext);
  const [charactersInGame, setCharactersInGame] = useState([]);

  return (
    <div>
      {characters.map((character) => (
        <CharacterButton
          key={character.id}
          character={character}
          setRemaining={setRemaining}
          names={names}
          charactersInGame={charactersInGame}
          setCharactersInGame={setCharactersInGame}
        />
      ))}
    </div>
  );
};

export default CharSelectModal;
