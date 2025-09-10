<script setup lang="ts">
import Button from "primevue/button"

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark-mode');
}
</script>

<template>
  <main class="w-full p-4">
   
    <p class="text-3xl font-bold underline text-red-500">hello world</p>
  </main>
</template>
