<script setup lang="ts">
  import closeIcon from "/close.svg";

  defineProps<{ modalOpen: boolean }>();
  const emit = defineEmits(['close'])
</script>

<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="modalOpen" class="modal" @click="emit('close')">
        <div class="modal__content" @click.stop>
          <img :src="closeIcon" alt="close" @click="emit('close')" class="modal__close" title="Закрыть" />
          <slot name="modalContent"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
  .modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 5;
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

  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.5s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
</style>