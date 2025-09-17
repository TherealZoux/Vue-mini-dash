<template>
  <section class="flex justify-between items-center1">
    <div class="flex flex-col">
      <h1 class="text-4xl">{{ title }}</h1>
      <p class="text-xl">{{ desc }}</p>
    </div>
    <Button :label="addButtonTitle" v-if="showAddButton" severity="info" @click="$emit('add')" class="h-10"/>
  </section>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';


const props = defineProps<{
  title: string;
  desc?: string;
  showAddButton?: boolean;
  addButtonTitle: string;
}>();

const emits = defineEmits(['add'])
</script>
<style></style>
