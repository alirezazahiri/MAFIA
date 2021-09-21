import React, { useEffect, useState, useRef } from "react";

// Styles
import styles from "../../styles/PlayerName.module.css";
import tailwindStyles from "../../styles/tailwindClasses/Common";

const PlayerName = ({ name, index, setPlayers, players }) => {
  const [canEdit, setCanEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [currentName, setCurrentName] = useState(name)

  const inputRef = useRef();

  useEffect(() => {
    if (canEdit) {
      inputRef.current.select();
    }
  }, [canEdit]);

  const changeHandler = (e) => {
    const { value } = e.target;
    setNewName(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let newPlayers = players;
    if (
      !players.find(
        (player) => player.trim().toLowerCase() === newName.trim().toLowerCase()
      )
    ) {
      console.log(
        !players.find(
          (player) =>
            player.trim().toLowerCase() === newName.trim().toLowerCase()
        )
      );
      setCurrentName(newName)
      newPlayers[index] = newName;
      setPlayers(newPlayers);
      localStorage.setItem("players", JSON.stringify(newPlayers));
      setCanEdit(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nameIndexContainer}>
        <span>
          <i className="fa fa-user"></i>
        </span>
        {canEdit ? (
          <form onSubmit={submitHandler} className={styles.formContainer}>
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={changeHandler}
            />
            <button type="submit" onClick={submitHandler}>
              submit
            </button>
          </form>
        ) : (
          <h1>{currentName}</h1>
        )}
      </div>
      <i
        className={tailwindStyles["edit-icon"]}
        onClick={() => setCanEdit((prevStatus) => !prevStatus)}
      ></i>
    </div>
  );
};

export default PlayerName;
