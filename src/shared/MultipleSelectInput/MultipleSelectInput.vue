<script setup lang="ts" generic="T extends Record<string, any>">
  import { ref, computed } from "vue";
  import Modal from "../Modal/Modal.vue";
  import SelectGroup from "../SelectGroup/SelectGroup.vue";
  import editIcon from "/edit.svg";
  import closeIcon from "/close.svg";
  import addIcon from "/add.svg";
  import expandIcon from "/expand.svg";

  const props = defineProps<{
    options?: T[],
    values: number[],
    enableCreate?: boolean,
    showChosen?: boolean
  }>();
  const values = ref(props.values);
  const modalOpen = ref<boolean>(false);
  const selectGroupOpen = ref<boolean>(false);
  const newOptionTitle = ref<string>("");
  const createdOptions = ref<Pick<T, "id" | "title">[]>([]);
  const filteredOptions = computed(() => {
    return props.showChosen ? [createdOptions.value, props.options || []].flat() : [createdOptions.value, props.options || []].flat().filter((item) => !values.value.includes(item.title))});
  function openModalHandler() {
    modalOpen.value = true;
    selectGroupOpen.value = false;
  }
  function deleteValueHandler(id: number) {
    values.value = values.value.filter((item) => item !== id);
  }
  function createOptionHandler() {
    const newOptionId = new Date().getTime();
    values.value.push(newOptionId);
    createdOptions.value.push({id: newOptionId, title: newOptionTitle.value} as Pick<T, "id" | "title">);
    newOptionTitle.value = "";
  }
  function selectOptionHandler(optionId: number) {
    values.value.push(optionId);
  }
  function unselectOptionHandler(optionId: number) {
    values.value = values.value.filter((value) => value !== optionId);
  }
</script>

<template>
  <div class="multiple-select">
    <div class="multiple-select__input">
      <ul class="multiple-select__values">
        <li v-for="value in values" :key="value" class="multiple-select__value">
          {{ filteredOptions?.find((option) => option.id === value)?.title }}
          <img :src="closeIcon" alt="delete" @click="deleteValueHandler(value)" class="multiple-select__delete-icon" />
        </li>
      </ul>
      <img :src="expandIcon" alt="open" @click="selectGroupOpen = !selectGroupOpen"
        class="multiple-select__expand-button" />
      <div v-if="selectGroupOpen" class="multiple-select__select-group">
        <SelectGroup :unselectOptionHandler="unselectOptionHandler" :values="values" :selectOptionHandler="selectOptionHandler" :filteredOptions="filteredOptions" />
      </div>
    </div>
    <img :src="editIcon" alt="edit" @click="openModalHandler" class="multiple-select__edit-button" />
    <Modal :modalOpen="modalOpen" @close="modalOpen = false">
      <template v-slot:modalContent>
        <div v-if="$props.enableCreate" class="multiple-select__value-input">
          <input type="text" v-model="newOptionTitle" placeholder="Введите новое значение" />
          <img :src="addIcon" alt="add" class="multiple-select__add" @click="createOptionHandler" />
        </div>
        <SelectGroup :unselectOptionHandler="unselectOptionHandler" :values="values" :selectOptionHandler="selectOptionHandler" :filteredOptions="filteredOptions" />
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
    position: relative;
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

  .multiple-select__delete-icon {
    margin-left: 8px;
  }

  .multiple-select__expand-button {
    margin-left: auto;
  }

  .multiple-select__select-group {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: #FFFFFF;
    border: 1px solid #F2F2F2;
    padding: 12px;
    transform: translateY(100%);
    border-radius: 20px;
  }
</style>