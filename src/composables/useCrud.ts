import { ref } from "vue";
import axios from "axios";

type ApiResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
};

const BASE_URL = "https://dummyjson.com";
const token = localStorage.getItem("accessToken");

export function useCrud(endpoint: string) {
  const data = ref<any>();
  const loading = ref(false);
  const error = ref<unknown>(null);

  const list = async (
    params: Record<string, any> = {}
  ): Promise<ApiResponse | undefined> => {
    loading.value = true;
    try {
      const res = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = res;
      return res;
    } catch (err) {
      error.value = err;
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  const get = async (
    id: string | number,
    params: Record<string, any> = {}
  ): Promise<any | undefined> => {
    try {
      const res = await axios.get(`${BASE_URL}${endpoint}/${id}`, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return undefined;
    }
  };

  const create = async (
    payload: any,
    params: Record<string, any> = {}
  ): Promise<any | undefined> => {
    try {
      const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
        params: { ...params },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return undefined;
    }
  };

  const update = async (
    id: string | number,
    payload: any,
    params: Record<string, any> = {}
  ): Promise<any | undefined> => {
    try {
      const res = await axios.put(`${BASE_URL}${endpoint}/${id}`, payload, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = res.data;
      return res.data;
    } catch (err) {
      error.value = err;
      return undefined;
    }
  };

  const remove = async (id: string | number): Promise<boolean> => {
    try {
      const res = await axios.delete(`${BASE_URL}${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      data.value = res.data;
      return true;
    } catch (err) {
      error.value = err;
      return false;
    }
  };

  return { data, loading, error, list, get, create, update, remove };
}
