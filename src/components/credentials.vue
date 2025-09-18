<template>
  <div class="flex flex-col">
    <p class="">use this credentials:</p>
    <div class="pl-4 flex gap-2 justify-start items-center p-2 bg-gray-300">
      <p>emilys</p>
      <p>emilyspass</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";

const { setFieldValue } = useForm();

const handleCredentials = () => {
  setFieldValue("username", "emilys");
  setFieldValue("password", "emilyspass");
};
</script>

<style></style>
