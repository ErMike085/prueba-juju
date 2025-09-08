<template>
    <div class="container">
        <h2>📚 Lista de Libros</h2>

        <!-- Botones de acción -->
        <div class="actions">
            <router-link to="/books/new" class="btn btn-primary">
                ➕ Nuevo Libro
            </router-link>
        </div>

        <!-- Pantalla de carga -->
        <div v-if="loading" class="loading">⏳ Cargando libros...</div>

        <!-- Mensaje de error -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <!-- Lista de libros -->
        <table v-if="!loading && books.length" class="books-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Año</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.id }}</td>
                    <td>{{ book.title }}</td>
                    <td>{{ book.year }}</td>
                    <td>
                        <span :class="['status', book.status === 'disponible' ? 'available' : 'reserved']">
                            {{ book.status }}
                        </span>
                    </td>
                    <td>
                        <router-link :to="`/books/${book.id}/edit`" class="btn btn-warning">
                            ✏️ Editar
                        </router-link>
                        <button @click="deleteBook(book.id)" class="btn btn-danger">
                            🗑 Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Si no hay libros -->
        <p v-if="!loading && !books.length" class="empty">
            ⚠️ No hay libros registrados.
        </p>
    </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { books, getAllBooks, removeBook } from "../controllers/bookController";

export default {
    name: "Books",
    setup() {
        const errorMessage = ref("");
        const loading = ref(true);

        const loadBooks = async () => {
            try {
                loading.value = true;
                await getAllBooks(); // llena el estado global `books`
            } catch {
                errorMessage.value = "❌ Error al cargar los libros.";
            } finally {
                loading.value = false;
            }
        };

        const deleteBook = async (id) => {
            if (confirm("¿Seguro que quieres eliminar este libro?")) {
                try {
                    await removeBook(id);
                } catch {
                    errorMessage.value = "❌ Error al eliminar el libro.";
                }
            }
        };

        onMounted(loadBooks);

        return { books, errorMessage, loading, deleteBook };
    },
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    animation: fadeIn 0.5s ease-in-out;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.books-table {
    width: 100%;
    border-collapse: collapse;
    animation: fadeIn 0.3s ease-in;
}

.books-table th,
.books-table td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
}

.books-table th {
    background-color: #007bff;
    color: white;
}

.status {
    padding: 5px 10px;
    border-radius: 6px;
    font-weight: bold;
    text-transform: capitalize;
}

.status.available {
    background: #28a745;
    color: white;
}

.status.reserved {
    background: #ffc107;
    color: black;
}

.btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin: 2px;
    font-weight: bold;
    transition: all 0.2s;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-warning {
    background: #ffc107;
    color: black;
}

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn:hover {
    transform: scale(1.05);
    opacity: 0.9;
}

.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}

.loading {
    text-align: center;
    font-style: italic;
}

.empty {
    text-align: center;
    color: gray;
    margin-top: 20px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
