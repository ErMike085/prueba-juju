<template>
    <div>
        <h2>🔑 Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Contraseña" required />
            <button type="submit">Entrar</button>
        </form>
        <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
        <p>¿No tienes cuenta? <router-link to="/register">Regístrate</router-link></p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../controllers/authController";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
    try {
        await login({ email: email.value, password: password.value });
        router.push("/books");
    } catch {
        errorMessage.value = "Credenciales inválidas";
    }
};
</script>