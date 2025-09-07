import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createBook, listBooks, getBookById, updateBook, deleteBook } from "../controllers/bookController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - year
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del libro
 *         title:
 *           type: string
 *           description: Título del libro
 *         author:
 *           type: string
 *           description: Autor del libro
 *         year:
 *           type: integer
 *           description: Año de publicación
 *         status:
 *           type: string
 *           enum: [disponible, reservado]
 *           description: Estado del libro
 *       example:
 *         id: 1
 *         title: "El Quijote"
 *         author: "Miguel de Cervantes"
 *         year: 1605
 *         status: "disponible"
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API para gestionar libros
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Obtener todos los libros
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Lista de libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", listBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Obtener un libro por ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Crear un nuevo libro
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       401:
 *         description: No autorizado
 */
router.post("/", authMiddleware, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Actualizar un libro por ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Libro actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Libro no encontrado
 *       401:
 *         description: No autorizado
 */
router.put("/:id", authMiddleware, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Eliminar un libro por ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro a eliminar
 *     responses:
 *       200:
 *         description: Libro eliminado correctamente
 *       404:
 *         description: Libro no encontrado
 *       401:
 *         description: No autorizado
 */
router.delete("/:id", authMiddleware, deleteBook);

export default router;
