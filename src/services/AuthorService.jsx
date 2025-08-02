import { myAxios, privateAxios } from "./Helper";

// get all authors with optional sorting
export const getAllAuthors = (sortBy = []) => {
  const params = {};

  if (sortBy.length > 0) {
    params.sortBy = sortBy.join(','); // e.g., 'nationality,fullName'
  }

  return myAxios.get(`/authors`, { params }).then((response) => response.data);
};

// get author by Id
export const getAuthor = (authorId) => {
  return myAxios.get(`/authors/${authorId}`).then((response) => response.data);
};

// add an author
export const addAuthor = (author) => {
  return privateAxios
    .post(`/authors`, author)
    .then((response) => response.data);
};

// update an author by Id
export const updateAuthor = (author, authorId) => {
  return privateAxios
    .put(`/authors/${authorId}`, author)
    .then((response) => response.data);
};
