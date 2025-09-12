import { defineStore } from "pinia";
import { useCrud } from "../composables/useCrud";
import { ref } from "vue";

export const useUserStore = defineStore("users", () => {
  const { items, loading, error, list, get, create, update, remove } =
    useCrud("/users");

  const getCurrentUser = async () => {
    try {
      const res = await useCrud("/auth/me").list();
      return true;
    } catch (error) {
      return false;
    } 
  };
  return {
    items,
    loading,
    error,
    list,
    get,
    create,
    update,
    remove,
    getCurrentUser,
  };
});
