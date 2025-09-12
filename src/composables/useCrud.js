import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'
const token = localStorage.getItem('accessToken')

export function useCrud(endpoint) {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  const list = async (params = {}) => {
    loading.value = true
    try {
      const res = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      items.value = res.data
      return res
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const get = async (id, params = {}) => {
    try {
      const res = await axios.get(`${BASE_URL}${endpoint}/${id}`, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      return res.data
      
    } catch (err) {
      error.value = err
    }
  }

  const create = async (data, params = {}) => {
    try {
      const res = await axios.post(`${BASE_URL}${endpoint}`, data, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      items.value.push(res.data)
      return res.data
    } catch (err) {
      error.value = err
    }
  }

  const update = async (id, data, params={}) => {
    try {
      const res = await axios.put(`${BASE_URL}${endpoint}/${id}`, data, {
        params: { ...params },
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      const index = items.value.findIndex(i => i.id === id)
      if (index !== -1) items.value[index] = res.data
      return res.data
    } catch (err) {
      error.value = err
    }
  }

  const remove = async (id) => {
    try {
      await axios.delete(`${BASE_URL}${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      items.value = items.value.filter(i => i.id !== id)
    } catch (err) {
      error.value = err
    }
  }

  return { items, loading, error, list, get, create, update, remove }
}
