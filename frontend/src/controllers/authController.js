import { registerUser, loginUser } from "../services/authService";

export async function register(userData) {
    try {
        return await registerUser(userData);
    } catch (error) {
        console.error("Error en register:", error);
        throw error;
    }
}

export async function login(credentials) {
    try {
        const { token } = await loginUser(credentials);
        localStorage.setItem("token", token); // guardar token
        return token;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
}

export function logout() {
    localStorage.removeItem("token");
}
