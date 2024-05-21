<script setup lang="ts">
import { ref } from "vue";
import Modal from "../Modal/Modal.vue";
import editIcon from "/edit.svg";
import closeIcon from "/close.svg";

const modalOpen = ref<boolean>(false);
const values = ref<string[]>(["1", "2", "item"]);
function deleteValueHandler(value: string) {
  values.value = values.value.filter((item) => item !== value);
}
</script>

<template>
  <div class="input">
    <ul class="values">
      <li v-for="value in values" :key="value" class="values__value">
        {{ value }}
        <img :src="closeIcon" alt="delete" @click="deleteValueHandler(value)" class="delete-icon"/>
      </li>
    </ul>
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
  .values {
    display: flex;
    padding: 0;
    margin: 0;
  }
  .values__value {
    list-style-type: none;
    background-color: #F2F2F2;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
</style>