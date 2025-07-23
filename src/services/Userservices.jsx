import axios from "axios";
import { BASE_URL } from "./Helper";

const BASE_USER_URL = "http://localhost:8081/api";

export const signUp = (user) => {
  return axios
    .post(`${BASE_USER_URL}/auth/register`, user)
    .then((response) => response.data);
};

export const loginUser = (loginData) => {
  return axios
    .post(`${BASE_USER_URL}/auth/login`, loginData)
    .then((response) => response.data);
};

export const getUser = (userId) => {
  return axios
    .get(`${BASE_USER_URL}/users/${userId}`)
    .then((response) => response.data);
};
