<template>
  <div class="flex justify-center rounded-none m-2 w-[5.6rem]">
    <div
      class="w-full md:w-64 flex flex-col h-full shadow-lg transition-colors duration-300 rounded-lg border-1 border-gray-200"
    >
      <!-- Header -->
      <div
        class="p-4 pt-[22px] border-b border-gray-200 flex justify-center items-center"
      >
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
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="flex-1 overflow-y-auto py-4 flex flex-col justify-center">
        <div v-for="section in menuItems" :key="section.label || 'separator'">
          <!-- Section Separator -->
          <div
            v-if="section.separator"
            class="border-t border-gray-200 my-4"
          ></div>

          <!-- Section with Items -->
          <div v-else>
            <!-- Section Items -->
            <div class="space-y-1 flex flex-col justify-center items-center">
              <a
                v-for="item in section.items"
                :key="item.label"
                @click="item.command"
                :aria-current="isActive(item.to) ? 'page' : null"
                :class="[
  'group flex flex-col items-center justify-center w-full h-[3rem] px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 rounded-md glass',
  isActive(item.to) ? 'active-glass text-blue-700' : 'hover:text-blue-700',
]"
                :title="item.label"
                @mouseover="hoveredItemLabel = item.label"
                @mouseleave="hoveredItemLabel = null"
              >
                <!-- 3D cube wrapper -->
                <div class="cubeWrapper">
                  <div
                    class="cube"
                    :class="{
                      flipped:
                        hoveredItemLabel === item.label || isActive(item.to),
                    }"
                  >
                    <!-- FRONT (icon) -->
                    <i
                      :class="[
                        item.icon,
                        ' h-8 w-8 text-center',
                        isActive(item.to)
                          ? 'text-green-600'
                          : 'group-hover:text-green-500',
                      ]"
                      class="face face-front !flex !items-center !justify-center"
                    ></i>

                    <!-- TOP (label) -->
                    <span
                      class="face face-top text-green-600 text-sm font-medium"
                    >
                      {{ item.label }}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-200">
        <Button
          icon="pi pi-sign-out"
          severity="secondary"
          class="w-full !border-red-200 !text-white hover:!text-red-500 !border-solid !bg-red-400 hover:!bg-white"
          @click="handleLogout"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import Badge from "primevue/badge";
import router from "@/router";
import { Card } from "primevue";

// Menu items structure for PrimeVue Menu component
const menuItems = ref([
  // Dashboard Section
  {
    items: [
      {
        label: "Home",
        icon: "pi pi-home",
        to: "/",
        command: () => router.push("/"),
      },
    ],
  },

  /*  {
    separator: true,
  },
  {
    items: [
      {
        label: "Profile",
        icon: "pi pi-user",
        to: "/profile",
        command: () => router.push("/profile"),
      },
    ],
  }, */
  {
    separator: true,
  },
  // E-commerce Section
  {
    items: [
      {
        label: "Products",
        icon: "pi pi-box",
        to: "/products",
        command: () => router.push("/products"),
      },
      /* {
        label: 'Carts',
        icon: 'pi pi-shopping-cart',
        to: '/carts',
        command: () => router.push('/carts'),
        badge: '3'
        }*/
    ],
  },
  {
    separator: true,
  },
  // Content Management Section
  {
    items: [
      {
        label: "Posts",
        icon: "pi pi-pencil",
        to: "/posts",
        command: () => router.push("/posts"),
      },
      // {
      //   label: "Recipes",
      //   icon: "pi pi-book",
      //   to: "/recipes",
      //   command: () => router.push("/recipes"),
      // },
    ],
  },
  {
    separator: true,
  },
  // Management Section
  {
    items: [
      {
        label: "Users",
        icon: "pi pi-users",
        to: "/users",
        command: () => router.push("/users"),
      },
    ],
  },
]);

const route = useRoute();
const isActive = (path) => route.path === path;
const hoveredItemLabel = ref(null);
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

.itemIcon {
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}

.group:hover .itemIcon {
  transform: rotateY(180deg);
}

.itemLabel {
  transition: transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1), opacity 0.3s;
  transform-style: preserve-3d;
}

.group:hover .itemLabel {
  transform: rotateY(0deg);
  opacity: 1;
}
</style>
