<script setup lang="ts">
import closeIcon from "/close.svg";

defineProps<{ modalOpen: boolean }>();
const emit = defineEmits(['close'])
</script>

<template>
  <teleport to="body">
    <div v-if="modalOpen" class="modal" @click="emit('close')">
      <div class="modal__content" @click.stop>
        <img :src="closeIcon" alt="close" @click="emit('close')" class="modal__close"/>
        <slot name="modalContent"></slot>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
  .modal {
    position: absolute;
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0;
    background-color: rgba(0 ,0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .modal__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    width: 300px;
    height: 300px;
    padding: 20px;
    border-radius: 20px;
  }
  .modal__close {
    margin-left: auto;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
</style>