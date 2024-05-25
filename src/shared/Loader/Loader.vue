<script setup lang="ts">
</script>

<template>
  <div class="loader">
    <div class="loader__spinner"></div>
  </div>
</template>

<style scoped>
  .loader {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  
  .loader__spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #F2F2F2;
    animation: rotate 1s infinite linear;
    border-width: 4px;
    border-right-style: none;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
