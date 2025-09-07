import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createBook,
  listBooks,
  getBookById,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";

const router = express.Router();

// CRUD
router.post("/", authMiddleware, createBook);
router.get("/", listBooks);
router.get("/:id", getBookById);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;
