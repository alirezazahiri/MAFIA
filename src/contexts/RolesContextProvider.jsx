import React, { createContext, useContext } from "react";

// Services
import getRoles from "../services/getData";
import { LanguageContext } from "./LanguageContextProvider";

export const RolesContext = createContext();

const RolesContextProvider = ({ children }) => {
  const { language } = useContext(LanguageContext);
  console.log(language)
  const { characters, names } = getRoles(language);

  return (
    <RolesContext.Provider value={{ characters, names }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContextProvider;
