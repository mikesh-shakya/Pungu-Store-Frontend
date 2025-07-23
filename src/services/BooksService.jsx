import axios from "axios";

const BASE_BOOK_URL = "http://localhost:8082/api/books";

// get all books
export const getAllBooks = () => {
  return axios
    .get(`${BASE_BOOK_URL}/getAll`)
    .then((response) => response.data);
};
