import { myAxios, privateAxios } from "./Helper";

export const signUp = (user) => {
  return myAxios.post(`/auth/register`, user).then((response) => response.data);
};

export const loginUser = (loginData) => {
  return myAxios
    .post(`/auth/login`, loginData)
    .then((response) => response.data);
};


// get user by username...
export const getUserByUsername = (username) => {
  return privateAxios.get(`/users/${username}`).then((response) => response.data);
};

// get user by user Id
export const getUserByUserId = (userId) => {
  return privateAxios.get(`/users/${userId}`).then((response) => response.data);
};
