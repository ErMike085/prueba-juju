import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

import bookRoutes from "./routes/books.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Base de datos sincronizada"))
  .catch((err) => console.error("❌ Error al conectar BD:", err));

app.listen(process.env.PORT || 4000, () => {
  console.log("Servidor corriendo en puerto", process.env.PORT || 4000);
});
