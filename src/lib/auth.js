export const getToken = () => {
  return localStorage.getItem('eb-admin-app');
};

export const deleteToken = () => {
  return localStorage.removeItem('eb-admin-app');
};

export const setToken = token => {
  return localStorage.setItem('eb-admin-app', token);
};
