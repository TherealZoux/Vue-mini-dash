import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";
export const useUserStore = defineStore("users", () => {
  const data = ref()
  const currenstUser =ref()
  const error = ref()
  const loading = ref(false)

  const getCurrentUser = async () => {
    try {
      const res = await useCrud("/auth/me").list();
      data.value = res?.data
      return data;
    } catch (error) {
      return false;
    } 
  };
  const getAllUsers = async ()=>{
    try {
       const res = await useCrud('/users').list()
      data.value = res?.data
      return data
    } catch (error) {
      console.log(error);
      
    }
  }
  const getUserById = async (id: number)=>{
    try {
      const res = await useCrud('/users').get(id)
      currenstUser.value = res?.data
      return res
    } catch (error) {
      console.log(error);
    }
  }

  return {
    data,
    currenstUser,
    loading,
    error,
    getCurrentUser,
    getAllUsers,
    getUserById,
  };
});
