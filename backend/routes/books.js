import express, { response } from "express";
import Book from "../models/Book.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create book
router.post("/", authMiddleware, async (req, response) => {
  try {
    const book = await Book.create(req.body);
    response.json(book);
  } catch (error) {
    console.error("Error al crear libro:", error);
    response.status(500).json({ message: "Error al crear libro" });
  }
});

// List books
router.get("/", async (req, response) => {
  try {
    const books = await Book.findAll();
    response.json(books);
  } catch (error) {
    console.error("Error al listar libros:", error);
    response.status(500).json({ message: "Error al listar libros" });
  }
});

// List books by id
router.get("/:id", async (req, response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      response.json(book);
    } else {
      response.status(404).json({ message: "Libro no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar libros:", error);
    response.status(500).json({ message: "Error al buscar libros" });
  }
});

// Update book
router.put("/:id", authMiddleware, async (req, response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      response.json(book);
    } else {
      response.status(404).json({ message: "No se pudo actualizar el libro" });
    }
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    response.status(500).json({ message: "Error al actualizar el libro" });
  }
});

// Delete book
router.delete("/:id", authMiddleware, async (req, response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      response.json({ message: "Libro eliminado" });
    } else {
      response.status(404).json({ message: "No se pudo eliminar el libro" });
    }
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    response.status(500).json({ message: "Error al eliminar el libro" });
  }
});

export default router;
