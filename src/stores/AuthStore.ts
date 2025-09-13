import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import { useCrud } from "@/composables/useCrud";

export const useAuthStore = defineStore("AuthStore", () => {
  const toast = useToast();
  const sidebar = ref(false);
  const { data, loading, error } = useCrud("/users");

  const checkAuth = async () => {
    try {
      const res = await useCrud("/auth/me").list();
      if (res?.status == 200) {
        data.value = res.data;
        sidebar.value = true;
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  
  const handleLogin = async (values: any) => {
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password,
      });
      data.value = res.data;

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      toast.add({
        severity: "success",
        summary: "Login successful",
        detail: `Welcome ${res.data.username}`,
        life: 3000,
      });
      if(res.status === 200){
        sidebar.value = true;
      }
      return res;
    } catch (err: any) {
      console.log(err);

      toast.add({
        severity: "error",
        summary: "Login failed",
        detail:
          err.response.data.message || "Failed to Login, Check crefintails",
        life: 3000,
      });
    } 
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  return {
    data,
    sidebar,
    loading,
    error,
    handleLogin,
    checkAuth,
  };
});
