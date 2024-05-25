<script setup lang="ts">
  import { ref } from "vue";
  import MultipleSelectInput from './shared/MultipleSelectInput/MultipleSelectInput.vue';
import { fetchOptions } from "./api/apiOptions";

  const options = ref([]);
  // const values = ref([]);
  const values = ref([1, 10]);
  fetchOptions().then((data) => options.value = data);
</script>

<template>
  <MultipleSelectInput :values="values" :options="options" :enableCreate="true" :showChosen="true">
  </MultipleSelectInput>
</template>

<style scoped></style>
