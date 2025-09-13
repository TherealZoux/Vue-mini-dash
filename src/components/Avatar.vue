<template>
    <svg width="120" height="120" viewBox="0 0 120 120">
      <!-- Hair -->
      <path d="M10,40 Q60,0 110,40" :fill="hairColor" />
      <!-- Face -->
      <circle cx="60" cy="70" r="40" fill="#fcd5b5" />
      <!-- Eyes -->
      <circle cx="45" cy="65" r="5" :fill="eyeColor" />
      <circle cx="75" cy="65" r="5" :fill="eyeColor" />
    </svg>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const hairColor = ref('#000000') // from user data
  const eyeColor = ref('#1e90ff')  // from user data
  </script>