<script setup lang="ts">
import { useProductsStore } from "@/stores/ProductsStore";
import { usePostsStore } from "@/stores/PostsStore";
import { useTodosStore } from "@/stores/TodosStore";
import { useCartsStore } from "@/stores/CartsStore";
import { useUserStore } from "@/stores/UserStore";
import { onMounted, computed } from "vue";
import Card from "primevue/card";
import { h } from "vue";

import StateCard from "@/components/StateCard.vue";
import AppTable from "@/components/AppTable.vue";

const productStore = useProductsStore();
const postsStore = usePostsStore();
const todosStore = useTodosStore();
const cartsStore = useCartsStore();
const userStore = useUserStore();

const topProducts = computed(() =>
  productStore?.data?.products?.filter((product: any) => product?.rating > 4)
);
const topProductsColumns = [
  { field: "title", header: "Title" },
  {
    field: "thumbnail",
    header: "Image",
    template: (row: any) => {
      return h("img", {
        src: row.thumbnail,
        class: "w-1/2",
        alt: row.title || "thumbnail",
      });
    },
  },
  { field: "brand", header: "Brand" },
  { field: "price", header: "Price", formatter: (val: number) => val + "$" },
  {
    field: "discountPercentage",
    header: "Discount (%)",
    formatter: (val: number) => (val ? val.toFixed(2) + "%" : "_"),
  },
  { field: "stock", header: "Stock" },
  { field: "category", header: "Category" },
  { field: "warrantyInformation", header: "Warranty" },
  { field: "shippingInformation", header: "Shipping" },
  {
    field: "rating",
    header: "Rating",
    template: (row: any) => {
      const stars = [];
      const fullStars = Math.floor(row.rating);
      const hasHalf = row.rating % 1 >= 0.5;
      const maxStars = 5;

      for (let i = 0; i < fullStars; i++) {
        stars.push(h("i", { class: "pi pi-star-fill text-yellow-500 mr-1" }));
      }

      if (hasHalf) {
        stars.push(
          h("i", { class: "pi pi-star-half-fill text-yellow-500 mr-1" })
        );
      }

      while (stars.length < maxStars) {
        stars.push(h("i", { class: "pi pi-star text-yellow-500 mr-1 " }));
      }

      return h("div", { class: "flex items-center" }, [
        ...stars,
        `(${row.rating})`,
      ]);
    },
  },
  {
    field: "availabilityStatus",
    header: "Availability",
    template: (row: any) => {
      let colorClass = "";
      if (row.availabilityStatus === "In Stock") {
        colorClass = "bg-green-100 rounded p-1 text-green-600";
      } else if (row.availabilityStatus === "Low Stock") {
        colorClass = "bg-yellow-100 rounded p-1 text-yellow-700";
      } else {
        colorClass = "bg-red-300 rounded border-1";
      }
      return h("span", { class: colorClass }, row.availabilityStatus);
    },
  },
];
onMounted(() => {
  Promise.all([
    productStore.getAllProducts(),
    productStore.getProductsCategories(),
    postsStore.getAllPosts(),
    postsStore.getAllComments(),
    todosStore.getAlltodos(),
    cartsStore.getAllCarts(),
    userStore.getAllUsers(),
  ]);
});
</script>

<template>
  <main class="p-8">
    <!-- Overview Cards Section -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Overview Cards</h2>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
      >
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
    <!-- <section>
      <Card>
        <template #content>
        <div class="rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Products by Price</h3>
          <div class="h-[25rem] flex items-center justify-center rounded-lg">
            <PolarAreaChart
              :labels="[]"
              :values="counts"
              title="Products by Category"
            />
          </div>
        </div>
        </template>
      </Card>
    </section> -->

    <section class="space-y-4">
      <div class="rounded-lg shadow-sm w-full">
        <AppTable
          :data="topProducts"
          :columns="topProductsColumns"
          :loading="productStore.loading"
          header="Top selling products"
        />
      </div>
    </section>
  </main>
</template>
