<template>
  <nav class="border-b-1 border-gray-200">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-[2.4rem]">
        <!-- Left side - Search and Logo -->
        <div class="flex items-center space-x-4"></div>

        <!-- Right side - Actions and User Menu -->
        <div class="flex items-center space-x-4">
          <!-- Dark Mode Toggle -->
          <Button
            :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
            severity="secondary"
            text
            rounded
            @click="toggleDarkMode"
            class=" hover:!bg-gray-100 dark:hover:!bg-gray-700"
            v-tooltip.top="
              isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
            "
          />

          <!-- Language Switcher -->
          <div class="relative">
            <Button
              icon="pi pi-globe"
              severity="secondary"
              text
              rounded
              @click="toggleLanguageDropdown"
              class="!text-gray-600 dark:!text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-700"
              v-tooltip.top="'Change Language'"
            />
            <i class="pi pi-chevron-down text-xs ml-1 text-gray-400"></i>

            <!-- Language Dropdown -->
            <div
              v-if="showLanguageDropdown"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-600"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <span class="mr-3">{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
                <i
                  v-if="currentLanguage.code === lang.code"
                  class="pi pi-check ml-auto text-blue-500"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <div class="md:hidden px-4 pb-4">
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <i class="pi pi-search text-gray-400"></i>
        </div>
        <input
          type="text"
          placeholder="Search"
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import Button from "primevue/button";
import Badge from "primevue/badge";

const router = useRouter();
const userStore = useUserStore();

// Reactive data
const isDarkMode = ref(false);
const showLanguageDropdown = ref(false);
const showUserDropdown = ref(false);
const notificationCount = ref(3);
const cartCount = ref(2);

// User data
const userData = computed(() => userStore.data);

// Language options
const languages = ref([
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]);

const currentLanguage = ref(languages.value[0]);

// Dark mode functions
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode.value.toString());
};

// Language functions
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
  showUserDropdown.value = false;
};

const changeLanguage = (langCode: string) => {
  const selectedLang = languages.value.find((lang) => lang.code === langCode);
  if (selectedLang) {
    currentLanguage.value = selectedLang;
    localStorage.setItem("language", langCode);
    // Here you would typically implement i18n logic
    console.log("Language changed to:", selectedLang.name);
  }
  showLanguageDropdown.value = false;
};

// User dropdown functions
const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value;
  showLanguageDropdown.value = false;
};

const goToProfile = () => {
  router.push("/profile");
  showUserDropdown.value = false;
};

const goToSettings = () => {
  router.push("/settings");
  showUserDropdown.value = false;
};

const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".relative")) {
    showLanguageDropdown.value = false;
    showUserDropdown.value = false;
  }
};

// Initialize dark mode and language from localStorage
onMounted(() => {
  // Initialize dark mode
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "true") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  }

  // Initialize language
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage) {
    const lang = languages.value.find((l) => l.code === savedLanguage);
    if (lang) {
      currentLanguage.value = lang;
    }
  }

  // Add click outside listener
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
