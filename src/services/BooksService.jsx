import { myAxios, privateAxios } from "./Helper";

// get all books
export const getAllBooks = (sortBy = []) => {
  const params = {};

  if (sortBy.length > 0) {
    params.sortBy = sortBy.join(",");
  }

  return myAxios.get(`/books`, { params }).then((response) => response.data);
};

// Get a book By id
export const getBook = (bookId) => {
  return myAxios.get(`/books/${bookId}`).then((response) => response.data);
};

// Get all books by an author Id
export const getAllBooksByAuthor = (authorId) => {
  return myAxios
    .get(`/books/author/${authorId}`)
    .then((response) => response.data);
};

// add a book
export const addBook = (book) => {
  return privateAxios.post(`/books`, book).then((response) => response.data);
};

// update a book
export const updateBook = (book, bookId) => {
  return privateAxios
    .put(`/books/${bookId}`, book)
    .then((response) => response.data);
};

// delete a book
export const deleteBook = (bookId) => {
  return privateAxios
    .delete(`/books/${bookId}`)
    .then((response) => response.data);
};
