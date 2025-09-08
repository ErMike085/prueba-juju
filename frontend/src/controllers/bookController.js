import { fetchBooks, fetchBook, createBook, updateBook, deleteBook, books, book } from "../services/bookService";

export { books, book };

export async function getAllBooks() {
    return await fetchBooks();
}

export async function getBookById(id) {
    return await fetchBook(id);
}

export async function addBook(bookData) {
    return await createBook(bookData);
}

export async function editBook(id, bookData) {
    return await updateBook(id, bookData);
}

export async function removeBook(id) {
    return await deleteBook(id);
}
