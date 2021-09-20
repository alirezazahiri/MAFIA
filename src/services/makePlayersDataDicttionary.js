const make = (players) => {
  let data_dict = {};
  for (let i = 0; i < players.length; i++) {
    data_dict[players[i]] = "";
  }

  localStorage.setItem("players_data", JSON.stringify(data_dict));
};

export default make
