import React from "react";
import parse from "html-react-parser";

const ScenarioCard = ({ title, description, html, type, icon }) => {
  
  const getColor = () => {
    if (type === "citizen") return "#66DE93";
    if (type === "mafia") return "#DA0037";
    if (type === "independent") return "#5C527F";
    if (type === "mid-independent") return "#F6D167";
  };
  const color = getColor()

  return (
    <div style={{ border: `1px solid ${color}` }}>
      <div>
        <div>
          <i
            style={{ color: color }}
            className={icon + " fa-2x"}
            aria-hidden="true"
          ></i>
        </div>
        <h1>{title}</h1>
      </div>
      <div>
        <p>{description}</p>
        {html && parse(html)}
      </div>
    </div>
  );
};

export default ScenarioCard;
