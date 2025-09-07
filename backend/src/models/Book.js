import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("disponible", "reservado"),
        allowNull: false,
        defaultValue: "disponible",
    },
});

export default Book;
