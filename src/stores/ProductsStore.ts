import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";

export const useProductsStore = defineStore("productsStore", () => {
  const data = ref()
  const currentProduct = ref()
  const error = ref()
  const loading = ref(false)

  const getAllProducts = async (limit?:any,skip?:any)=>{    
    try {
        const res = await useCrud('/products').list({limit:limit, skip:skip})
        data.value = res?.data
        return data
    } catch (error) {
        console.log(error);
    }
  }
  const getProductById = async (id: number)=>{
    try {
       const res = await useCrud('/products').get(id)
       currentProduct.value = res.data
      data
    } catch (error) {
      console.log(error);
    }
  }

  return {
    data,
    currentProduct,
    loading,
    error,
    getAllProducts,
    getProductById,
  };
});

