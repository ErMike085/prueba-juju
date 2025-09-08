<template>
    <div>
        <h2>📝 Registro</h2>
        <form @submit.prevent="handleRegister">
            <input v-model="username" placeholder="Nombre de usuario" required />
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Contraseña" required />
            <button type="submit">Registrarse</button>
        </form>
        <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
        <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "../controllers/authController";

const username = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const handleRegister = async () => {
    try {
        await register({ username: username.value, email: email.value, password: password.value });
        router.push("/login");
    } catch {
        errorMessage.value = "Error al registrarse";
    }
};
</script>