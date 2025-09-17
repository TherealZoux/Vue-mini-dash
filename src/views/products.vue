<template>
  <section class="w-[95%] ml-8 mt-8">
    <SectionHeader
      title="Products"
      desc="View all products details here."
      :show-add-button="true"
      add-button-title="Add new product"
      @add="openAddDialog"
    />
    <hr class="text-gray-200 mt-4" />
    <AppTable
      :columns="columns"
      :data="products"
      header="All products"
      class="mt-8"
      :actions="actions"
      :initialValues="initialValues"
      :fields="fields"
      :visible="visible"
      :validationSchema="validationSchema"
      @close="handleCloseDialog"
      @save="handleAddProduct"
      :submit="handleAddProduct"
    />
  </section>
</template>

<script lang="ts" setup>
import AppTable from "@/components/AppTable.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import { useProductsStore } from "@/stores/ProductsStore";
import { computed, onMounted, h, ref } from "vue";
import * as yup from "yup";

const store = useProductsStore();
const products = computed(() => store?.data?.products);
const visible = ref(false);

const columns = [
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
const initialValues = {
  title: "",
  description: "",
  category: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  tags: [],
  brand: "",
  sku: "",
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  warrantyInformation: "",
  shippingInformation: "",
  returnPolicy: "",
  minimumOrderQuantity: 0,
  thumbnail: "",
  image: [],
};

const actions = ["view", "edit", "delet"];

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  category: yup.string(),
  price: yup.number().min(0, "Price must be positive"),
  discountPercentage: yup
    .number()
    .min(0, "Discount must be positive")
    .max(100, "Discount cannot exceed 100%"),
  rating: yup
    .number()
    .min(0, "Rating must be positive")
    .max(5, "Rating cannot exceed 5"),
  stock: yup.number().min(0, "Stock must be positive"),
  tags: yup.string(),
  brand: yup.string(),
  sku: yup.string(),
  weight: yup.number().min(0, "Weight must be positive"),
  dimensions: yup.string(),
  warrantyInformation: yup.string(),
  shippingInformation: yup.string(),
  returnPolicy: yup.string(),
  minimumOrderQuantity: yup
    .number()
    .min(0, "Minimum order quantity must be positive"),
  thumbnail: yup.string().url("Must be a valid URL"),
  image: yup.string(),
});

const fields = computed(() => [
  { name: "title", type: "text", required: true },
  { name: "description", type: "textarea", required: false },
  { name: "category", type: "text", required: false },
  { name: "price", type: "number", required: false },
  { name: "discountPercentage", type: "number", required: false },
  { name: "rating", type: "number", required: false },
  { name: "stock", type: "number", required: false },
  { name: "tags", type: "text", required: false },
  { name: "brand", type: "text", required: false },
  { name: "sku", type: "text", required: false },
  { name: "weight", type: "number", required: false },
  { name: "dimensions", type: "text", required: false },
  { name: "warrantyInformation", type: "textarea", required: false },
  { name: "shippingInformation", type: "textarea", required: false },
  { name: "returnPolicy", type: "textarea", required: false },
  { name: "minimumOrderQuantity", type: "number", required: false },
  { name: "thumbnail", type: "text", required: false },
  { name: "image", type: "text", required: false },
]);

const openAddDialog = () => {
  visible.value = true;
};
const handleCloseDialog = () => {
  visible.value = false;
};
const handleAddProduct = async (values: any) => {
  try {
    await store.createProduct(values);
  } catch (error) {}
};
onMounted(async () => {
  await store.getAllProducts();
});
</script>

<style></style>
