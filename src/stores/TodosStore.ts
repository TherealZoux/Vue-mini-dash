import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";

export const useTodosStore = defineStore("todosStore", () => {
  const data = ref()
  const currentTodo = ref()
  const error = ref()
  const loading = ref(false)

  const getAlltodos = async (limit?:any,skip?:any)=>{    
    try {
        const res = await useCrud('/todos').list({limit:limit, skip:skip})
        data.value = res?.data
        return data
    } catch (error) {
        console.log(error);
    }
  }
  const getTodoById = async (id: number)=>{
    try {
       const res = await useCrud('/todos').get(id)
       currentTodo.value = res.todos
      return data
    } catch (error) {
      console.log(error);
    }
  }
  const getUserTodos = async (id: number)=>{
    try {
       const res = await useCrud('/todos/user').get(id)
       console.log(res);
       data.value = res       
    } catch (error) {
      console.log(error);
    }
  }




  return {
    data,
    currentTodo,
    loading,
    error,
    getAlltodos,
    getTodoById,
    getUserTodos,
  };
});

