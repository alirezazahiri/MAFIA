import React, { useEffect, useState } from "react";

// Services
import getLocalData from "../../services/getLocalData";

const ManagePlayerCard = ({ player, icon, role }) => {
  const players_data = JSON.parse(getLocalData("players_data"));
  const [data, setData] = useState("");

  const changeHandler = (e) => {
    const { value } = e.target;
    setData(value);

    players_data[player] = value;
    localStorage.setItem("players_data", JSON.stringify(players_data));
  };

  useEffect(() => {
    setData(players_data[player])
  }, [player, players_data])

  return (
    <div>
      <div>
        <h2>{player}</h2>
        <i className={icon}></i>
        <h2>{role}</h2>
      </div>
      <div>
        <input type="text" value={data} onChange={changeHandler} />
      </div>
    </div>
  );
};

export default ManagePlayerCard;
