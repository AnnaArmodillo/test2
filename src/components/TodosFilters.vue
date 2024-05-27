<script setup lang="ts" generic="T extends Record<string, any>">
    import { inject } from 'vue';
    import completedIcon from "/checked.svg";
    import uncompletedIcon from "/unchecked.svg";
    import { FiltersKey } from '../interfaces/Filters';

    const { searchFilters, setFilters } = inject(FiltersKey, {searchFilters: {}, setFilters: () => {}});
</script>

<template>
    <div class="filters">
        <img class="filters__input"
            :title="searchFilters?.completed ? 'Завершенные' : 'Не завершенные'"
            :src="searchFilters?.completed ? completedIcon : uncompletedIcon" alt="user"
            @click="searchFilters?.completed ? setFilters('completed', false) : setFilters('completed', true)">
        <input class="filters__input" type="text" :value="searchFilters?.textSearch" placeholder="Поиск по тексту"
            title="Фильтр по названию"
            @input="(e) => setFilters('textSearch', (e.target as HTMLInputElement).value)" />
        <input class="filters__input" type="text" :value="searchFilters?.userId" placeholder="ID пользователя"
            title="Фильтр по пользователям"
            @input="(e) => setFilters('userId', (e.target as HTMLInputElement).value)" />
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
