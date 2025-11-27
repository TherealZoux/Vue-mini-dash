<template>
    <div class="w-[22rem] h-[35rem] border-1 border-gray-300 ">
        <div class="relative">
            <img :src="product?.thumbnail" class="w-full bg-gray-100 " alt="Product image">
            <Badge :value="product?.category"  class="absolute top-4 left-4"/>
        </div>
        <div class="p-4">
            <h1>{{ product?.title }}</h1>
            <p class="text-gray-600">{{ product?.description.slice(0,100) }}...</p>
            <Rating :model-value="product?.rating" class="text-red-300 p-2" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { Badge } from 'primevue';
import Rating from 'primevue/rating';
const props = defineProps({
    product: Object
})
</script>
<style scoped>
.p-rating {
  --p-rating-icon-active-color: #FFD700;
  --p-rating-icon-hover-color: #FFC700;
}
</style>