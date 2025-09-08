<template>
    <div class="container">
        <h2>{{ isEdit ? "✏️ Editar Libro" : "➕ Crear Libro" }}</h2>

        <form @submit.prevent="handleSubmit" class="form">
            <label>Título</label>
            <input v-model="book.title" placeholder="Título" required />

            <label>Año</label>
            <input v-model="book.year" type="number" placeholder="Año de publicación" required />

            <label>Estado</label>
            <select v-model="book.status">
                <option value="disponible">Disponible</option>
                <option value="reservado">Reservado</option>
            </select>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    {{ isEdit ? "Actualizar" : "Crear" }}
                </button>
                <button type="button" @click="$router.back()" class="btn btn-secondary">
                    ⬅️ Cancelar
                </button>
            </div>
        </form>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { book, getBookById, addBook, editBook } from "../controllers/bookController";

export default {
    name: "BookForm",
    setup() {
        const route = useRoute();
        const router = useRouter();

        const isEdit = ref(false);
        const errorMessage = ref("");

        onMounted(async () => {
            if (route.params.id) {
                isEdit.value = true;
                try {
                    await getBookById(route.params.id); // llena `book`
                } catch {
                    errorMessage.value = "❌ No se pudo cargar el libro.";
                }
            }
        });

        const handleSubmit = async () => {
            try {
                if (isEdit.value) {
                    await editBook(route.params.id, book.value);
                } else {
                    await addBook(book.value);
                }
                router.push("/books");
            } catch {
                errorMessage.value = "❌ Error al guardar el libro.";
            }
        };

        return {
            isEdit,
            book,
            errorMessage,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: 40px auto;
    padding: 25px;
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

.form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

label {
    font-weight: bold;
    margin-top: 8px;
}

input,
select {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.btn {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
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

.btn:hover {
    transform: scale(1.05);
    opacity: 0.9;
}

.error {
    margin-top: 15px;
    color: red;
    font-weight: bold;
    text-align: center;
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
