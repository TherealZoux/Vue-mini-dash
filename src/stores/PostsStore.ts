import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";

export const usePostsStore = defineStore("postsStore", () => {
  const posts = ref()
  const comments = ref()
  const currentPost = ref()
  const error = ref()
  const loading = ref(false)

  const getAllPosts = async (limit?:any,skip?:any)=>{    
    try {
        const res = await useCrud('/posts').list({limit:limit, skip:skip})
        posts.value = res?.data
        return posts
    } catch (error) {
        console.log(error);
    }
  }
  const getAllComments = async (limit?:any,skip?:any)=>{    
    try {
        const res = await useCrud('/comments').list({limit:limit, skip:skip})
        comments.value = res?.data
        return comments
    } catch (error) {
        console.log(error);
    }
  }
  
  const getPostById = async (id: number)=>{
    try {
       const res = await useCrud('/posts').get(id)
       currentPost.value = res.data
      
    } catch (error) {
      console.log(error);
    }
  }

  return {
    posts,
    comments,
    currentPost,
    loading,
    error,
    getAllPosts,
    getAllComments,
    getPostById,
  };
});

