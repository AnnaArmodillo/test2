<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
import Modal from "../Modal/Modal.vue";
import editIcon from "/edit.svg";
import closeIcon from "/close.svg";
import addIcon from "/add.svg";

defineProps<{
  options?: T[]
}>();

const modalOpen = ref<boolean>(false);
const values = ref<string[]>(["1", "2", "item"]);
const newValue = ref<string>("");
function deleteValueHandler(value: string) {
  values.value = values.value.filter((item) => item !== value);
}
function addValueHandler() {
  values.value.push(newValue.value);
  newValue.value = "";
  modalOpen.value = false;
}
function selectOptionHandler(option: string) {
  values.value.push(option);
  modalOpen.value = false;
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
      <template v-slot:modalContent>
        <div class="value-input">
          <input type="text" v-model="newValue" placeholder="Введите новое значение"/>
          <img :src="addIcon" alt="add" class="value-input__add" @click="addValueHandler"/>
        </div>
        <ul class="options">
          <li v-for="option in $props.options" :key="option.id" @click="selectOptionHandler(option.title)" class="options__option">
            {{ option.title }}
          </li>
        </ul>
      </template>
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
  .value-input {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .value-input__add {
    margin-left: 8px;
  }
  .options {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }
  .options__option {
    list-style-type: none;
  }
  .options__option:not(:last-child) {
    margin-bottom: 8px;
  }
</style>