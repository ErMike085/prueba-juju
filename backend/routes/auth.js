import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ username: req.body.username, email: req.body.email, password: hashedPassword });

        response.json(user);
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        response.status(500).json({ message: "Error al registrar usuario" });
    }
});

// Login
router.post("/login", async (req, response) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user) {
            return response.status(404).json({ message: "Usuario no encontrado" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return response.status(401).json({ message: "Contraseña incorrecta" });
        }

        const toke = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        response.json({ token: toke });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        response.status(500).json({ message: "Error al iniciar sesión" });
    }
});

export default router;
