<script setup lang="ts">
    import completedIcon from "/checked.svg";
    import uncompletedIcon from "/unchecked.svg";

    const props = defineProps<{
        field: string,
        searchFilters: Record<string, any>
    }>();
    const emit = defineEmits(['setFilters']);
</script>

<template>
    <div class="filters">
        <img class="filters__input"
            :title="props.searchFilters?.completed ? 'Завершенные' : 'Не завершенные'"
            :src="props.searchFilters?.completed ? completedIcon : uncompletedIcon" alt="user"
            @click="props.searchFilters?.completed ? emit('setFilters', props.field, 'completed', false) : emit('setFilters', props.field, 'completed', true)">
        <input class="filters__input" type="text" :value="props.searchFilters?.textSearch" placeholder="Поиск по тексту"
            title="Фильтр по названию"
            @input="(e) => emit('setFilters', props.field, 'textSearch', (e.target as HTMLInputElement).value)" />
        <input class="filters__input" type="text" :value="props.searchFilters?.userId" placeholder="ID пользователя"
            title="Фильтр по пользователям"
            @input="(e) => emit('setFilters', props.field, 'userId', (e.target as HTMLInputElement).value)" />
    </div>
</template>

<style scoped>
    .filters {
        margin-bottom: 16px;
        justify-content: flex-start;
        width: 100%;
        flex-wrap: wrap;
    }

    .filters__input {
        margin-bottom: 4px;
    }

    .filters__input:not(:last-child) {
        margin-right: 8px;
    }

    img {
        width: 24px;
        height: 24px;
    }
</style>
