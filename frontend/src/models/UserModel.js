export default class User {
    constructor({ id = null, username, email, password }) {
        if (!username) throw new Error("El nombre de usuario es obligatorio");
        if (!email) throw new Error("El email es obligatorio");
        if (!password) throw new Error("La contraseña es obligatoria");

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
