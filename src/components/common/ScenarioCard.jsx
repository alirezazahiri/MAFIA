import React from "react";

// Services
import getColor from '../../services/getColor';

const ScenarioCard = ({ title, description, html, type, icon }) => {
  const color = getColor(type)

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
        <div dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    </div>
  );
};

export default ScenarioCard;
