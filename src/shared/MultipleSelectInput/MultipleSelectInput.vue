<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
import Modal from "../Modal/Modal.vue";
import editIcon from "/edit.svg";
import closeIcon from "/close.svg";
import addIcon from "/add.svg";

defineProps<{
  options?: T[],
  enableCreate?: boolean
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
  <div class="multiple-select">
    <div class="multiple-select__input">
      <ul class="multiple-select__values">
        <li v-for="value in values" :key="value" class="multiple-select__value">
          {{ value }}
          <img :src="closeIcon" alt="delete" @click="deleteValueHandler(value)" class="multiple-select__delete-icon"/>
        </li>
      </ul>
    </div>
    <img :src="editIcon" alt="edit" @click="modalOpen = true" class="multiple-select__edit-button"/>
    <Modal :modalOpen="modalOpen" @close="modalOpen = false">
      <template v-slot:modalContent>
        <div v-if="$props.enableCreate" class="multiple-select__value-input">
          <input type="text" v-model="newValue" placeholder="Введите новое значение"/>
          <img :src="addIcon" alt="add" class="multiple-select__add" @click="addValueHandler"/>
        </div>
        <ul class="multiple-select__options">
          <li v-for="option in $props.options" :key="option.id" @click="selectOptionHandler(option.title)" class="multiple-select__option">
            {{ option.title }}
          </li>
        </ul>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
  .multiple-select {
    display: flex;
    align-items: flex-start;
  }
  .multiple-select__edit-button {
    margin-left: 8px;
  }
  .multiple-select__input {
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
  .multiple-select__values {
    display: flex;
    padding: 4px 0 0 0;
    margin: 0;
    flex-wrap: wrap;
  }
  .multiple-select__value {
    list-style-type: none;
    background-color: #F2F2F2;
    border-radius: 8px;
    padding: 8px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-bottom: 4px;
    margin-right: 8px;
  }
  .multiple-select__value-input {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .multiple-select__add {
    margin-left: 8px;
  }
  .multiple-select__options {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }
  .multiple-select__option {
    list-style-type: none;
  }
  .multiple-select__option:not(:last-child) {
    margin-bottom: 8px;
  }
  .multiple-select__delete-icon {
    margin-left: 8px;
  }
</style>