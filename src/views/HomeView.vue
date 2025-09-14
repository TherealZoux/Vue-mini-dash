<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useProductsStore } from "@/stores/ProductsStore";
import { usePostsStore } from "@/stores/PostsStore";
import { useTodosStore } from "@/stores/TodosStore";
import { useCartsStore } from "@/stores/CartsStore";
import { useUserStore } from "@/stores/UserStore";
import { onMounted } from "vue";
import StateCard from "@/components/StateCard.vue";

const productStore = useProductsStore();
const postsStore = usePostsStore();
const todosStore = useTodosStore();
const cartsStore = useCartsStore();
const userStore = useUserStore();
const { t, locale } = useI18n();

onMounted(() => {
  Promise.all([
    productStore.getAllProducts(),
    postsStore.getAllPosts(),
    postsStore.getAllComments(),
    todosStore.getAlltodos(),
    cartsStore.getAllCarts(),
    userStore.getAllUsers()
  ]);
});
</script>

<template>
  <main class="w-full p-6 space-y-8">
    <!-- Overview Cards Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Overview Cards</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StateCard
          title="Users"
          :value="userStore?.data?.total || 100"
          icon="pi pi-user"
          customColor="#6366F1"
          insight="+21% last months"
          insightClass="text-green-600"
        />
        <StateCard
          title="Products"
          :value="productStore?.data?.total || 500"
          icon="pi pi-shopping-bag"
          customColor="#1E93AB"
          insight="+15% this month"
          insightClass="text-green-600"
        />
        <StateCard
          title="Posts"
          :value="postsStore?.posts?.total || 1500"
          icon="pi pi-comments"
          customColor="#F59E42"
          insight="+8% this week"
          insightClass="text-green-600"
        />
        <StateCard
          title="Carts"
          :value="cartsStore?.data?.total || 50"
          icon="pi pi-shopping-cart"
          customColor="#8B5CF6"
          insight="+12% today"
          insightClass="text-green-600"
        />
        <StateCard
          title="Todos"
          :value="todosStore?.data?.total || 120"
          icon="pi pi-check-square"
          customColor="#10B981"
          insight="+5% completed"
          insightClass="text-green-600"
        />
        <StateCard
          title="Comments"
          :value="postsStore?.comments?.total || 3000"
          icon="pi pi-comment"
          customColor="#EF4444"
          insight="+25% this month"
          insightClass="text-green-600"
        />
      </div>
    </section>

    <!-- Charts & Insights Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Charts & Insights</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Users Growth Chart -->
        <div class="bg-white rounded-lg shadow-sm p-6 ">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Users Growth</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <i class="pi pi-chart-line text-4xl text-gray-400 mb-2"></i>
              <p class="text-gray-500">Line Chart Placeholder</p>
              <p class="text-sm text-gray-400">Users growth over time</p>
            </div>
          </div>
        </div>

        <!-- Products by Price Chart -->
        <div class="bg-white rounded-lg shadow-sm p-6 ">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Products by Price</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <i class="pi pi-chart-bar text-4xl text-gray-400 mb-2"></i>
              <p class="text-gray-500">Bar Chart Placeholder</p>
              <p class="text-sm text-gray-400">Product distribution by price range</p>
            </div>
          </div>
        </div>

        <!-- Carts Overview Chart -->
        <div class="bg-white rounded-lg shadow-sm p-6 ">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Carts Overview</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <i class="pi pi-chart-pie text-4xl text-gray-400 mb-2"></i>
              <p class="text-gray-500">Pie Chart Placeholder</p>
              <p class="text-sm text-gray-400">Cart status distribution</p>
            </div>
          </div>
        </div>

        <!-- Top Active Users -->
        <div class="bg-white rounded-lg shadow-sm p-6 ">
          <h3 class="text-lg font-semibold text-gray-700 mb-4">Top Active Users</h3>
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <i class="pi pi-users text-4xl text-gray-400 mb-2"></i>
              <p class="text-gray-500">List Placeholder</p>
              <p class="text-sm text-gray-400">Most active users this month</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Activity / Feed Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Recent Activity / Feed</h2>
      <div class="bg-white rounded-lg shadow-sm ">
        <div class="p-6">
          <div class="space-y-4">
            <!-- Activity Item 1 -->
            <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="pi pi-user-plus text-blue-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-800">
                  <span class="font-medium">New user registered</span>
                  <span class="text-gray-600"> (John Doe)</span>
                </p>
                <p class="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>

            <!-- Activity Item 2 -->
            <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="pi pi-shopping-bag text-green-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-800">
                  <span class="font-medium">New product added</span>
                  <span class="text-gray-600"> (iPhone 15)</span>
                </p>
                <p class="text-sm text-gray-500">15 minutes ago</p>
              </div>
            </div>

            <!-- Activity Item 3 -->
            <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="pi pi-comment text-orange-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-800">
                  <span class="font-medium">Post created:</span>
                  <span class="text-gray-600"> "Tech in 2025"</span>
                </p>
                <p class="text-sm text-gray-500">1 hour ago</p>
              </div>
            </div>

            <!-- Activity Item 4 -->
            <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="pi pi-shopping-cart text-purple-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-800">
                  <span class="font-medium">Cart updated</span>
                  <span class="text-gray-600"> (#123, 3 items)</span>
                </p>
                <p class="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>

            <!-- Activity Item 5 -->
            <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="pi pi-check text-red-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-800">
                  <span class="font-medium">Todo completed</span>
                  <span class="text-gray-600">" Update user dashboard"</span>
                </p>
                <p class="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>

            <!-- Activity Item 6 -->
            <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="pi pi-comment text-indigo-600 text-sm"></i>
              </div>
              <div class="flex-1">
                <p class="text-gray-800">
                  <span class="font-medium">New comment added</span>
                  <span class="text-gray-600"> on "Vue 3 Best Practices"</span>
                </p>
                <p class="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
