import React, { createContext, useState, useContext } from "react";

// Services
import getRoles from "../services/getData";
import { LanguageContext } from "./LanguageContextProvider";

export const RolesContext = createContext();

const RolesContextProvider = ({ children }) => {
  const { language } = useContext(LanguageContext);
  const [roles, setRoles] = useState(getRoles(language));
  const { characters, names } = roles;

  return (
    <RolesContext.Provider value={{ characters, names, setRoles }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContextProvider;
