const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
};

export default getLocalData