import getLocalData from "./getLocalData";

const make = (players) => {
  let data_dict = {};
  let dead_or_alive_dict = {};

  const players_data = getLocalData("players_data");
  const d_o_a_data = getLocalData("dead_or_alive_dict");

  for (let i = 0; i < players.length; i++) {
    data_dict[players[i]] = players_data
      ? players_data[players[i]]
        ? players_data[players[i]]
        : ""
      : "";
    dead_or_alive_dict[players[i]] = d_o_a_data
      ? d_o_a_data[players[i]]
        ? d_o_a_data[players[i]]
        : false
      : false;
  }

  localStorage.setItem("players_data", JSON.stringify(data_dict));
  localStorage.setItem(
    "dead_or_alive_dict",
    JSON.stringify(dead_or_alive_dict)
  );
};

export default make;
