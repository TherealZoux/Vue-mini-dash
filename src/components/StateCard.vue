<template>
  <Card class="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1" :pt="{
      root: 'bg-white rounded-lg shadow-sm p-6'
    }">
    <template #content>
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <h3 class="text-sm font-medium  uppercase tracking-wide mb-2">{{ title }}</h3>
          <div class="text-3xl font-bold  mb-1">{{ value }}</div>
          <p class="text-sm ">{{ subtitle }}</p>
        </div>
        <div class="w-12 h-12 rounded-lg flex items-center justify-center" :style="{backgroundColor: customColor, color: 'white'}">
          <i :class="icon"></i>
        </div>
      </div>
    </template>
    <template #footer>
        <span :class="insightClass">{{ insight }}</span>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import { computed } from "vue";

interface Props {
  title?: string;
  value?: string;
  subtitle?: string;
  icon?: string;
  customColor?: string;
  insight?: string; 
  insightClass?: string
}

const props = withDefaults(defineProps<Props>(), {});




</script>
