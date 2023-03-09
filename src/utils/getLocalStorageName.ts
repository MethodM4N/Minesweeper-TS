export const getLocalStorageName = (): string => {
  const data = localStorage.getItem('userName');
  const name = data ? JSON.parse(data) : 'Unknown';
  return name;
};
