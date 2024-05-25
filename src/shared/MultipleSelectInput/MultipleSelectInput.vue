<script setup lang="ts" generic="T extends Record<string, any>">
  import { ref, computed, watch } from "vue";
  import Modal from "../Modal/Modal.vue";
  import SelectGroup from "../SelectGroup/SelectGroup.vue";
  import { createOption, fetchOptions } from "../../api/apiOptions.ts";
  import editIcon from "/edit.svg";
  import closeIcon from "/close.svg";
  import addIcon from "/add.svg";
  import expandIcon from "/expand.svg";
  import saveIcon from "/save.svg";

  const props = defineProps<{
    values: number[], // значения инпута из формы
    enableCreate?: boolean, // допустимо ли добавление собственных вариантов
    showChosen?: boolean, // показывать ли в списке вариантов уже выбранные значения
    placeholder?: string, // плэйсхолдер для отображения в инпуте, если нет выбранных значений
    field: string, // название поля в форме
    searchFilters: Record<string, any> // фильтры для получения вариантов
  }>();
  const emit = defineEmits(['resetTextSearch', 'resetFieldFilters']);
  const values = ref(props.values); // текущие значения инпута
  const modalOpen = ref<boolean>(false);
  const selectGroupOpen = ref<boolean>(false);
  const newOptionTitle = ref<string>("");
  const createdOptions = ref<Pick<T, "id" | "title" | "not_saved">[]>([]);
  const searchFilters = computed(() => props.searchFilters);
  const allOptions = ref<T[]>([]);   // все варианты (получаем один раз при монтировании компонента, нужны для корректного отображения title выбранных значений)
  const filteredOptions = ref<T[]>([]); // варианты, полученные с бэка по выбранным фильтрам
  const isLoading = ref<boolean>(false);
  const isValuesEmpty = ref<boolean>(!values.value.length);
  const visibleOptions = computed(() => {   // значения, которые будут отображаться в списке вариантов
    return props.showChosen ? [createdOptions.value, filteredOptions.value || []].flat() : [createdOptions.value, filteredOptions.value || []].flat().filter((item) => !values.value.includes(item.id))
  });
  function setFilteredOptions(searchParams?: Record<string, string>) {
    isLoading.value = true;
    fetchOptions(props.field, searchParams || {}).then((data) => {
      filteredOptions.value = data;
      isLoading.value = false;
    });
  }
  function initOptions() {
    fetchOptions(props.field, {}).then((data) => {
      allOptions.value = data;
      filteredOptions.value = data;
    });
  }
  function openModalHandler() {
    modalOpen.value = true;
    selectGroupOpen.value = false;
    setFilteredOptions(searchFilters.value);
  }
  function closeModalHandler() {
    emit("resetTextSearch");
    emit("resetFieldFilters", props.field);
    modalOpen.value = false;
  }
  function deleteValueHandler(id: number) {
    values.value = values.value.filter((item) => item !== id);
  }
  function createOptionHandler() {
    const newOptionId = new Date().getTime();
    values.value.push(newOptionId);
    createdOptions.value.push({ id: newOptionId, title: newOptionTitle.value, not_saved: true } as Pick<T, "id" | "title" | "not_saved">);
    newOptionTitle.value = "";
  }
  function selectOptionHandler(optionId: number) {
    values.value.push(optionId);
  }
  function unselectOptionHandler(optionId: number) {
    values.value = values.value.filter((value) => value !== optionId);
  }
  function saveCreatedOptions() {
    Promise.all(createdOptions.value.map(async (option) => {
      createOption(option.title, props.field);
    }))
      .then(() => {
        setFilteredOptions();
        createdOptions.value = [];
      })
  }
  initOptions();
  watch(searchFilters, () => setFilteredOptions(searchFilters.value));
</script>

<template>
  <div class="multiple-select">
    <div class="multiple-select__input">
      <slot name="before"></slot>
      <p v-if="isValuesEmpty" class="multiple-select__placeholder">{{ placeholder }}</p>
      <transition-group name="values" tag="ul" class="multiple-select__values"
        @before-enter="isValuesEmpty = values.length ? false : true"
        @after-leave="isValuesEmpty = values.length ? false : true">
        <li v-for="value in values" :key="value" class="multiple-select__value">
          {{ allOptions?.find((option) => option.id === value)?.title }}
          <img :src="closeIcon" alt="delete" @click="deleteValueHandler(value)" class="multiple-select__delete-icon" />
        </li>
      </transition-group>
      <img :src="expandIcon" alt="open" @click="selectGroupOpen = !selectGroupOpen"
        class="multiple-select__expand-button" />
      <transition name="options">
        <div v-if="selectGroupOpen" class="multiple-select__select-group">
          <SelectGroup :isLoading="isLoading" :unselectOptionHandler="unselectOptionHandler" :values="values"
            :selectOptionHandler="selectOptionHandler" :visibleOptions="visibleOptions" />
        </div>
      </transition>
      <slot name="after"></slot>
    </div>
    <img :src="editIcon" alt="edit" @click="openModalHandler" class="multiple-select__action-button" />
    <img :src="saveIcon" alt="save" @click="saveCreatedOptions" class="multiple-select__action-button" />
    <Modal :modalOpen="modalOpen" @close="closeModalHandler">
      <template v-slot:modalContent>
        <div v-if="$props.enableCreate" class="multiple-select__value-input">
          <input type="text" v-model="newOptionTitle" placeholder="Введите новое значение"
            @keyup.enter="createOptionHandler" />
          <img :src="addIcon" alt="add" class="multiple-select__add" @click="createOptionHandler" />
        </div>
        <slot name="filters"></slot>
        <SelectGroup :isLoading="isLoading" :unselectOptionHandler="unselectOptionHandler" :values="values"
          :selectOptionHandler="selectOptionHandler" :visibleOptions="visibleOptions" />
      </template>
    </Modal>
  </div>
</template>

<style scoped>
  .multiple-select {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .multiple-select__action-button {
    margin-left: 8px;
  }

  .multiple-select__input {
    display: flex;
    align-items: flex-start;
    border-radius: 20px;
    padding: 12px;
    border: 1px solid #F2F2F2;
    position: relative;
    width: 100%;
  }

  img,
  :slotted(img) {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .multiple-select__values {
    display: flex;
    padding: 0;
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

  .multiple-select__placeholder {
    margin: 0;
    opacity: 0.8;
  }

  :slotted(div) {
    display: flex;
    align-items: center;
  }

  :slotted(.form__before) {
    margin-right: 12px;
  }

  :slotted(.form__after) {
    margin-left: 12px;
  }

  :slotted(*):not(:last-child) {
    margin-right: 8px;
  }

  .values-enter-active,
  .values-leave-active {
    transition: opacity 0.5s ease;
  }

  .values-enter-from,
  .values-leave-to {
    opacity: 0;
  }

  .options-enter-active,
  .options-leave-active {
    transition: opacity 1s ease, transform 0.5s ease;
  }

  .options-enter-from,
  .options-leave-to {
    opacity: 0;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 1s ease;
  }
</style>