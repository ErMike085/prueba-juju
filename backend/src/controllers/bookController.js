import Book from "../models/Book.js";

// Crear libro
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(500).json({ message: "Error al crear libro" });
  }
};

// Listar libros
export const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error("Error al listar libros:", error);
    res.status(500).json({ message: "Error al listar libros" });
  }
};

// Buscar libro por ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Libro no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar libro:", error);
    res.status(500).json({ message: "Error al buscar libro" });
  }
};

// Actualizar libro
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.json(book);
    } else {
      res.status(404).json({ message: "No se pudo actualizar el libro" });
    }
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ message: "Error al actualizar libro" });
  }
};

// Eliminar libro
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.json({ message: "Libro eliminado" });
    } else {
      res.status(404).json({ message: "No se pudo eliminar el libro" });
    }
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    res.status(500).json({ message: "Error al eliminar libro" });
  }
};
