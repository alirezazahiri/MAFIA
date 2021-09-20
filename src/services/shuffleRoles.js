import getLocalData from './getLocalData';

const getList = (n) => {
    let list = []
    for(let i = 0; i < n; i++) list.push(i)
    return list
}

const shuffleIndexedList = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
}

const giveRoles = (players, characters) => {

    const indexedList = getList(getLocalData("playersCount"))
    const shuffledList = shuffleIndexedList(indexedList)

    let player_role_dictionary = {}

    for(let i = 0; i < players.length; i++) {
        player_role_dictionary[players[i]] = characters[shuffledList[i]]
    }

    return player_role_dictionary
}

export default giveRoles