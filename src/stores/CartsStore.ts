import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";

export const useCartsStore = defineStore("cartsStore", () => {
  const data = ref()
  const currentCart = ref()
  const error = ref()
  const loading = ref(false)

  const getAllCarts = async (limit?:any,skip?:any)=>{    
    try {
        const res = await useCrud('/carts').list({limit:limit, skip:skip})
        data.value = res?.data
        return data
    } catch (error) {
        console.log(error);
    }
  }
  const getCartById = async (id: number)=>{
    try {
       const res = await useCrud('/carts').get(id)
       currentCart.value = res.data
      data
    } catch (error) {
      console.log(error);
    }
  }

  return {
    data,
    currentCart,
    loading,
    error,
    getAllCarts,
    getCartById,
  };
});