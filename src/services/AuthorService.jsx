import axios from "axios";

const BASE_AUTHOR_URL = "http://localhost:8087/api/authors";

// get all authors
export const getAllAuthors = () => {
  return axios.get(`${BASE_AUTHOR_URL}`).then((response) => response.data);
};


// create an author
export const createAuthor = (author) => {
  return axios
    .post(`${BASE_AUTHOR_URL}`, author)
    .then((response) => response.data);
};
