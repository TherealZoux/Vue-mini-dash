import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";
export const useUserStore = defineStore("users", () => {
  const data = ref();
  const currenstUser = ref();
  const error = ref();
  const loading = ref(false);

  const getCurrentUser = async () => {
    loading.value = true;
    try {
      const res = await useCrud("/auth/me").list();
      data.value = res?.data;
      return data;
    } catch (error) {
      return false;
    } finally {
      loading.value = false;
    }
  };
  const getAllUsers = async (limit = 0, skip = 0) => {
    try {
      const res = await useCrud("/users").list({ limit: limit, skip: skip });
      data.value = res?.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserById = async (id: number) => {
    try {
      const res = await useCrud("/users").get(id);
      currenstUser.value = res?.data;
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async (payload: any) => {
    loading.value = true;
    try {
      const res = await useCrud("/users/add").create(payload);
      if (data.value && data.value.users) {
        data.value.users.unshift(res);
      }
      return res;
    } catch (err) {
      error.value = err;
      return false;
    } finally {
      loading.value = false;
    }
  };
  return {
    data,
    currenstUser,
    loading,
    error,
    getCurrentUser,
    getAllUsers,
    getUserById,
    createUser,
  };
});
