import React, { useContext, useState } from "react";

// Contexts
import { RolesContext } from "../contexts/RolesContextProvider";
import ScenarioCard from "./common/ScenarioCard";

// Styles
import styles from "../styles/Scenarios.module.css";
import FilterCharacters from "./common/FilterCharacters";

const Scenarios = () => {
  const { characters, names } = useContext(RolesContext);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const changeHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <input
          type="text"
          value={search}
          onChange={changeHandler}
          placeholder="Search..."
        />
        <FilterCharacters setType={setType} />
      </div>
      {characters
        .filter((character) =>
          type === "all" ? true : character.type === type
        )
        .filter((character) =>
          character.title.toLowerCase().includes(search.trim().toLowerCase())
        )
        .map((character, index) => (
          <ScenarioCard key={names[index]} character={character} />
        ))}
    </div>
  );
};

export default Scenarios;
