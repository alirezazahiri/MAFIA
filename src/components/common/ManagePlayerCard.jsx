import React, { useState } from "react";

// Services
import getLocalData from "../../services/getLocalData";
import getColor from "../../services/getColor";

// Styles
import styles from "../../styles/ManagePlayerCard.module.css";

const ManagePlayerCard = ({ player, icon, role, type }) => {
  const playerData = getLocalData("players_data")
    ? getLocalData("players_data")[player]
    : undefined;
  const [data, setData] = useState(playerData ? playerData : "");

  const changeHandler = (e) => {
    const { value } = e.target;
    setData(value);
    let players_data = getLocalData("players_data");
    let current_player_status = value;
    players_data[player] = current_player_status;
    localStorage.setItem("players_data", JSON.stringify(players_data));
  };

  const color = getColor(type);

  return (
    <div
      className={styles.container}
      style={{
        border: `1px solid ${color}`,
        boxShadow: `0 0 12px ${color}`,
      }}
    >
      <div className={styles.hedearContainer} style={{ color: color }}>
        <h2>{player}</h2>
        <i className={icon}></i>
        <h2>{role}</h2>
      </div>
      <div>
        <textarea
          type="text"
          value={data}
          onChange={changeHandler}
          style={{ color: color }}
        />
      </div>
    </div>
  );
};

export default ManagePlayerCard;
