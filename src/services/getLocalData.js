const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? data : undefined;
};

export default getLocalData