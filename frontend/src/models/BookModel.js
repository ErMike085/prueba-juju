export default class Book {
    constructor({ id = null, title, year, status = "disponible" }) {
        if (!title) throw new Error("El título es obligatorio");
        if (!year) throw new Error("El año es obligatorio");

        this.id = id;
        this.title = title;
        this.year = year;
        this.status = status;
    }
}
