<script setup lang="ts">
import { ref } from "vue";
import MultipleSelectInput from './shared/MultipleSelectInput/MultipleSelectInput.vue';

const options = ref([]);
  async function fetchOptions() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos`
  );
  options.value = await res.json();
}
fetchOptions();
</script>

<template>
  <MultipleSelectInput :options="options">
  </MultipleSelectInput>
</template>

<style scoped>

</style>
