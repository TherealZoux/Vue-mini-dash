<template>
  <div class="flex justify-center rounded-none">
    <div class="w-full md:w-64 flex flex-col h-full bg-white shadow-lg">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200">
        <div class="inline-flex items-center gap-2">
          <svg
            width="35"
            height="40"
            viewBox="0 0 35 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-8"
          >
            <path
              d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
              fill="var(--p-primary-color)"
            />
            <path
              d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
              fill="var(--p-text-color)"
            />
          </svg>
          <span class="text-xl font-semibold text-gray-800">
            PRIME<span class="text-blue-600">APP</span>
          </span>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="flex-1 overflow-y-auto py-4">
        <!-- Dashboard Section -->
        <div class="mb-6">
          <div class="px-4 mb-3">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dashboard</h3>
          </div>
          <nav class="space-y-1">
            <a
              v-for="item in dashboardItems"
              :key="item.label"
              @click="item.action"
              class="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
            >
              <i :class="item.icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"></i>
              {{ item.label }}
            </a>
          </nav>
        </div>

        <!-- E-commerce Section -->
        <div class="mb-6">
          <div class="px-4 mb-3">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-commerce</h3>
          </div>
          <nav class="space-y-1">
            <a
              v-for="item in ecommerceItems"
              :key="item.label"
              @click="item.action"
              class="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
            >
              <i :class="item.icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"></i>
              {{ item.label }}
              <Badge v-if="item.badge" class="ml-auto" :value="item.badge" severity="info" />
            </a>
          </nav>
        </div>

        <!-- Content Management Section -->
        <div class="mb-6">
          <div class="px-4 mb-3">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</h3>
          </div>
          <nav class="space-y-1">
            <a
              v-for="item in contentItems"
              :key="item.label"
              @click="item.action"
              class="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
            >
              <i :class="item.icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"></i>
              {{ item.label }}
            </a>
          </nav>
        </div>

        <!-- User Management Section -->
        <div class="mb-6">
          <div class="px-4 mb-3">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Management</h3>
          </div>
          <nav class="space-y-1">
            <a
              v-for="item in managementItems"
              :key="item.label"
              @click="item.action"
              class="group flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors duration-150"
            >
              <i :class="item.icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-blue-500"></i>
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200">
        <Button 
          label="Log out" 
          icon="pi pi-sign-out" 
          class="w-full !bg-red-50 !border-red-200 hover:!bg-red-100 !text-red-600 hover:!text-red-700 !border-solid" 
          @click="handleLogout" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Badge from "primevue/badge";
import router from "@/router";

// Dashboard items
const dashboardItems = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    action: () => router.push('/')
  },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    action: () => router.push('/profile')
  }
]);

// E-commerce items
const ecommerceItems = ref([
  {
    label: 'Products',
    icon: 'pi pi-box',
    action: () => router.push('/products')
  },
  {
    label: 'Carts',
    icon: 'pi pi-shopping-cart',
    action: () => router.push('/carts'),
    badge: '3' // Example badge for cart items
  }
]);

// Content management items
const contentItems = ref([
  {
    label: 'Posts',
    icon: 'pi pi-pencil',
    action: () => router.push('/posts')
  },
  {
    label: 'Recipes',
    icon: 'pi pi-book',
    action: () => router.push('/recipes')
  }
]);

// Management items
const managementItems = ref([
  {
    label: 'Users',
    icon: 'pi pi-users',
    action: () => router.push('/users')
  }
]);

const handleLogout = () => {
  localStorage.clear();
  window.location.reload();
};

</script>

<style scoped>
/* Custom scrollbar for the navigation area */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions for hover effects */
.group {
  transition: all 0.15s ease-in-out;
}

/* Active state styling */
.group:active {
  transform: translateX(2px);
}

/* Focus states for accessibility */
.group:focus {
  outline: 2px solid #3b82f6;
  outline-offset: -2px;
}
</style>