import { ref } from "vue";
import api from "../api";
import Book from "../models/BookModel";

// Estado global reactivo
export const books = ref([]);
export const book = ref([]);

// Obtener todos los libros
export async function fetchBooks() {
    const { data } = await api.get("/books");
    books.value = data.map((b) => new Book(b));
    return books.value;
}

// Obtener un libro por ID
export async function fetchBook(id) {
    const { data } = await api.get(`/books/${id}`);
    book.value = new Book(data);
    return book.value;
}

// Crear un libro
export async function createBook(bookData) {
    const newBook = new Book(bookData);
    const { data } = await api.post("/books", newBook);
    const created = new Book(data);
    books.value.push(created); // actualiza estado global
    return created;
}

// Actualizar un libro
export async function updateBook(id, bookData) {
    const updatedBook = new Book(bookData);
    const { data } = await api.put(`/books/${id}`, updatedBook);
    const result = new Book(data);

    // actualizar en la lista global
    const index = books.value.findIndex((b) => b.id === id);
    if (index !== -1) books.value[index] = result;

    return result;
}

// Eliminar un libro
export async function deleteBook(id) {
    await api.delete(`/books/${id}`);
    books.value = books.value.filter((b) => b.id !== id); // actualiza global
}
