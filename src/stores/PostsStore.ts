import { defineStore } from "pinia";
import { useCrud } from "@/composables/useCrud";
import { ref } from "vue";

export const usePostsStore = defineStore("postsStore", () => {
  const posts = ref();
  const comments = ref();
  const currentPost = ref();
  const error = ref();
  const loading = ref(false);

  const getAllPosts = async (limit?: any, skip?: any) => {
    try {
      const res = await useCrud("/posts").list({ limit: limit, skip: skip });
      posts.value = res;
      return posts;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllComments = async (limit?: any, skip?: any) => {
    try {
      const res = await useCrud("/comments").list({ limit: limit, skip: skip });
      comments.value = res;
      return comments;
    } catch (error) {
      console.log(error);
    }
  };

  const getPostById = async (id: number) => {
    try {
      const res = await useCrud("/posts").get(id);
      currentPost.value = res;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserPosts = async (id: number) => {
    try {
      const res = await useCrud("/posts/user").get(id);
      posts.value = res;
    } catch (error) {
      console.log(error);
    }
  };
  const getPostComments = async (id: number) => {
    try {
      const res = await useCrud("/comments/post").get(id);
      comments.value = res;
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const createPost = async (payload: any) => {
    try {
      const res = await useCrud("/posts/add").create(payload);
      posts.value.data.posts.unshift(res);
      console.log(res);

      return res;
    } catch (err: any) {
      console.log(err);
      error.value = err;
      return false;
    }
  };

  return {
    posts,
    comments,
    currentPost,
    loading,
    error,
    getAllPosts,
    getAllComments,
    getPostById,
    getUserPosts,
    getPostComments,
    createPost,
  };
});
