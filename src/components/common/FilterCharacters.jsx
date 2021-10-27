import React, { useReducer, useContext } from "react";
import getColor from "../../services/getColor";

// Styles
import styles from "../../styles/FilterCharacters.module.css";

// Contexts
import { LanguageContext } from "../../contexts/LanguageContextProvider";
import { getFilterCharacters } from "../../services/getData";

const initialState = {
    mafia: false,
    citizen: false,
    all: false,
    independent: false,
    "mid-independent": false,
};

const reducer = (state, action) => {
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
    const [hover, dispatch] = useReducer(reducer, initialState);

    const { language } = useContext(LanguageContext);
    const { filters } = getFilterCharacters(language);

    const clickHandler = (e) => {
        setType(e.target.name);
    };

    const getStyles = (type) => {
        return {
            color: getColor(type),
            border: `1px solid ${getColor(type)}`,
            boxShadow: hover[type] ? `0 0 12px ${getColor(type)}` : "",
            padding: "1px 5px",
            width: "18%",
            height: "80px",
            transition: "all 0.2s",
        };
    };

    const sides_list = Object.keys(filters) // side keys ["mafia", "citizen", ...]

    return (
        <div className={styles.container}>
            {sides_list.map((side) => (
                <button
                    key={side}
                    onClick={clickHandler}
                    name={side}
                    style={getStyles(side)}
                    onMouseOver={() => dispatch(side)}
                >
                    {filters[side]}
                </button>
            ))}
        </div>
    );
};

export default FilterCharacters;
