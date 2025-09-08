import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import Books from "../views/BooksView.vue";
import BookForm from "../views/BookFormView.vue";

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/books", component: Books },
    { path: "/books/new", component: BookForm },
    { path: "/books/:id/edit", component: BookForm, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/register"];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem("token");

    if (authRequired && !token) {
        return next("/login");
    }
    next();
});

export default router;
