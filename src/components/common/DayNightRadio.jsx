import React, { useState } from "react";
import Switch from "react-switch";

// Thumbnails
import nightSong from "../../styles/thumbnails/night.mp3";

const DayNightRadio = () => {
  const song = new Audio(nightSong)
  song.load();

  const [audio, setAudio] = useState(song);
  const [night, setNight] = useState(false);

  const changeHandler = () => {
    let night;
    setNight((prevStatus) => {
      night = !prevStatus;
      return night;
    });
    if (night) {
      audio.play();
    } else {
      audio.pause();
      setAudio(song);
    }
  };

  return (
    <div
      style={{
        marginBottom: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div style={{ background: "none", width: "100px" }}>
        <label>
          <Switch
            onChange={changeHandler}
            checked={night}
            checkedIcon={
              <i
                className="fa fa-moon-o fa-2x ml-2 mt-1"
                style={{ color: "#D5EEBB" }}
              ></i>
            }
            uncheckedIcon={
              <i
                className="fa fa-sun-o fa-2x ml-3 mt-1"
                style={{ color: "#FFE459" }}
              ></i>
            }
            height={40}
            width={90}
            boxShadow="0px 0px 20px rgba(255, 255, 255, 0.2)"
            activeBoxShadow="0px 0px 10px rgba(255, 255, 255, 0.6)"
            onColor="#11052C"
            offColor="#64C9CF"
            onHandleColor="#3E2C41"
            offHandleColor="#6E85B2"
          />
        </label>
      </div>
    </div>
  );
};

export default DayNightRadio;
