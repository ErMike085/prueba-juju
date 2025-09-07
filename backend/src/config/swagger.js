import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Libros 📚",
            version: "1.0.0",
            description: "Documentación de la API para el sistema de gestión de libros con Node.js, Express y Sequelize",
        },
        servers: [
            {
                url: "http://localhost:4000/api",
            },
        ],
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    apis: ["./src/routes/*.js"], // aquí le decimos que lea los comentarios en tus rutas
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
