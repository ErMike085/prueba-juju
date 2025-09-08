import api from "../api";
import User from "../models/UserModel";

// Registro de usuario
export async function registerUser(userData) {
    const user = new User(userData);
    const { data } = await api.post("/auth/register", user);
    return data;
}

// Login de usuario
export async function loginUser(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    return data; // devuelve token
}
