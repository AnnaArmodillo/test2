<script setup lang="ts" generic="T extends Record<string, any>">
  const props = defineProps<{
    selectOptionHandler: (title: string) => void,
    unselectOptionHandler: (title: string) => void,
    filteredOptions: T[],
    values: string[]
  }>();
  function isEnabled(value: string) {
    return !props.values.includes(value);
  }
</script>

<template>
  <ul class="select-group__options select-group_scrollable">
    <li v-for="option in filteredOptions" :key="option.id" @click="isEnabled(option.title) ? selectOptionHandler(option.title) : unselectOptionHandler(option.title)"
      :class="[!isEnabled(option.title) && 'select-group__option_disabled', 'select-group__option']">
      {{ option.title }}
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
    cursor: pointer
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
</style>
