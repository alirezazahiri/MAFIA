import React, { useContext } from "react";

// Contexts
import { RolesContext } from "../contexts/RolesContextProvider";
import ScenarioCard from "./common/ScenarioCard";

const Scenarios = () => {
  const { characters, names } = useContext(RolesContext);
  return (
    <div>
      {characters.map((character, index) => (
        <ScenarioCard key={names[index]} {...character} />
      ))}
    </div>
  );
};

export default Scenarios;
