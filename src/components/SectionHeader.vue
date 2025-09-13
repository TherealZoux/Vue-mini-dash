<template>
  <div class="flex flex-col">
    <h1 class="text-4xl">{{ title }}</h1>
    <p class="text-xl">{{ desc }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string; desc?: string }>();
</script>
<style></style>
