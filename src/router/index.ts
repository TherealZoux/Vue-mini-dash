import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { useAuthStore } from "@/stores/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/products",
      name: "Products",
      component: () => import("../views/products.vue"),
    },
    {
      path: "/carts",
      name: "Carts",
      component: () => import("../views/carts.vue"),
    },
    {
      path: "/posts",
      name: "Posts",
      component: () => import("../views/posts.vue"),
    },
    {
      path: "/recipes",
      name: "Recipes",
      component: () => import("../views/recipes.vue"),
    },
    {
      path: "/users",
      name: "Users",
      component: () => import("../views/users.vue"),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/profile.vue"),
    },
  ],
});
router.beforeEach(async(to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = await authStore.checkAuth();
  const isLoginRoute = to.path === "/login";
  
  if (!isAuthenticated && !isLoginRoute) {
    // Not authenticated and trying to access a protected route
    next("/login");
  } else if (isAuthenticated && isLoginRoute) {
    // Authenticated user trying to access login page
    next("/");
  } else {
    next();
  }
});

export default router;
