<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 flex-1"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
      ></div>
    </div>

    <!-- Main Container -->
    <div class="relative w-full max-w-md">
      <!-- Login Card -->
      <div
        class="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8"
      >
        <!-- Header -->
        <div class="text-center space-y-2">
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p class="text-gray-600 text-sm">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <AppForm
          :validation-schema="LoginSchema"
          :onSubmit="handleLogin"
          :initial-values="initialValues"
          :login="true"
          v-if="!loading"
        >
          <template #default="{ errors }">
            <div class="space-y-6">
              <!-- Username Field -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700"
                  >Username</label
                >
                <Field name="username" v-slot="{ field }">
                  <div class="relative">
                    <InputText
                      v-bind="field"
                      v-model="initialValues.username"
                      placeholder="Enter your username"
                      class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                    />
                    <div
                      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </Field>
                <span
                  v-if="errors.username"
                  class="text-red-500 text-xs flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ errors.username }}
                </span>
              </div>

              <!-- Password Field -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700"
                  >Password</label
                >
                <Field name="password" v-slot="{ field }">
                  <div class="relative">
                    <Password
                      v-bind="field"
                      v-model="initialValues.password"
                      placeholder="Enter your password"
                      :feedback="false"
                      :toggleMask="true"
                      class="w-full"
                      inputClass="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                    />
                    <div
                      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </Field>
                <span
                  v-if="errors.password"
                  class="text-red-500 text-xs flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ errors.password }}
                </span>
              </div>
            </div>
            <div class="flex flex-col">
              <p class="">use this credentials:</p>
              <div
                class="pl-4 flex flex-col justify-start items-start p-2 bg-gray-100"
              >
                <!-- <i
                  class="pi pi-clone hover:cursor-pointer"
                  @click="handleCredentials"
                ></i> -->
                <p>emilys</p>

                <p>emilyspass</p>
              </div>
            </div>
          </template>
        </AppForm>

        <!-- Loading State -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-8 space-y-4"
        >
          <Spinner />
          <p class="text-gray-600 text-sm">Signing you in...</p>
        </div>
      </div>

      <!-- Footer -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Spinner from "@/components/Spinner.vue";
import AppForm from "@/components/AppForm.vue";
import { useForm } from "vee-validate";
import { Field } from "vee-validate";
import { LoginSchema } from "@/schema/LoginSchema";
import { useAuthStore } from "@/stores/AuthStore";

const AuthStore = useAuthStore();
const loading = ref(false);
const initialValues = ref({
  username: "",
  password: "",
});
const { setFieldValue } = useForm();

const handleLogin = async (values) => {
  try {
    loading.value = true;
    const res = await AuthStore.handleLogin(values);
    if (res.status === 200) {
      localStorage.setItem("username", initialValues.value.username);
      window.location.reload();

    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
// This function is not working as intended because setFieldValue is from useForm() in setup,
// but the form instance is not properly referenced or passed.
// If you want to set the credentials, you should update initialValues directly:
const handleCredentials = () => {
  initialValues.value.username = "emilys";
  initialValues.value.password = "emilyspass";
};
</script>
