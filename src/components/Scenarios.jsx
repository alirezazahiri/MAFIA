import React, { useContext, useState } from "react";

// Contexts
import { RolesContext } from "../contexts/RolesContextProvider";
import ScenarioCard from "./common/ScenarioCard";

const Scenarios = () => {
  const { characters, names } = useContext(RolesContext);
  const [search, setSearch] = useState("");

  const changeHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div>
      <div>
        <input type="text" value={search} onChange={changeHandler} />
      </div>
      {characters
        .filter((character) =>
          character.title.toLowerCase().includes(search.trim().toLowerCase())
        )
        .map((character, index) => (
          <ScenarioCard key={names[index]} {...character} />
        ))}
    </div>
  );
};

export default Scenarios;
