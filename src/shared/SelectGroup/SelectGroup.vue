<script setup lang="ts" generic="T extends Record<string, any>">
  import Loader from "../Loader/Loader.vue";
  
  const props = defineProps<{
    selectOptionHandler: (optionId: number) => void,
    unselectOptionHandler: (optionId: number) => void,
    visibleOptions: T[],
    values: number[],
    isLoading: boolean
  }>();
  function isEnabled(valueId: number) {
    return !props.values.includes(valueId);
  }
</script>

<template>
  <Loader v-if="isLoading"></Loader>
  <p v-else-if="!visibleOptions?.length">Варианты не найдены</p>
  <ul v-else class="select-group__options select-group_scrollable">
    <li v-for="option in visibleOptions" :key="option.id"
      @click="isEnabled(option.id) ? selectOptionHandler(option.id) : unselectOptionHandler(option.id)"
      :class="[!isEnabled(option.id) && 'select-group__option_disabled', 'select-group__option']">
      {{ option.title }}
      <span v-if="option.not_saved" class="select-group__not-saved-mark">Новое</span>
    </li>
  </ul>
</template>

<style scoped>
  .select-group__options {
    display: flex;
    flex-direction: column;
    padding: 0 4px 0 0;
    margin: 0;
    overflow-y: auto;
    max-height: 200px;
    width: 100%;
  }

  .select-group__option {
    list-style-type: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  .select-group__option:not(:last-child) {
    margin-bottom: 8px;
  }

  .select-group__option_disabled {
    opacity: 0.5;
  }

  .select-group_scrollable::-webkit-scrollbar {
    width: 8px;
  }

  .select-group_scrollable::-webkit-scrollbar-thumb {
    background: #F2F2F2;
    width: 8px;
    border-radius: 8px;
  }

  .select-group__not-saved-mark {
    color: green;
    opacity: 0.5;
  }
</style>
