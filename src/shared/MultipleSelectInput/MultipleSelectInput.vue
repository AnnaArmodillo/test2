<script setup lang="ts">
import { ref } from "vue";
import Modal from "../Modal/Modal.vue";
import editIcon from "/edit.svg";

const modalOpen = ref<boolean>(false);
</script>

<template>
  <div class="input">
    <img :src="editIcon" alt="edit" @click="modalOpen = true"/>
    <Modal :modalOpen="modalOpen" @close="modalOpen = false">
    </Modal>
  </div>
</template>

<style scoped>
  .input {
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 12px;
    border: 1px solid #F2F2F2;
  }
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
</style>