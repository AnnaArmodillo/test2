<script setup lang="ts">
    import { ref } from "vue";
    import MultipleSelectInput from '../shared/MultipleSelectInput/MultipleSelectInput.vue';
    import questionIcon from "/question.svg";
    import completedIcon from "/checked.svg";
    import uncompletedIcon from "/unchecked.svg";
    const values = ref<Record<string, any>>({ posts: [], todos: [1, 13] });
    const searchFilters = ref<Record<string, any>>({ posts: {}, todos: {} });
    const textSearchValue = ref<string>("");
    function setFilters(field: string, param: string, value: string) {
        searchFilters.value = { ...searchFilters.value, [field]: { ...searchFilters.value[field], [param]: value } };
    }
    function submitHandler() {
        console.log(values);
    }
    function setTextSearch(field: string, value: string) {
        setFilters(field, 'textSearch', value);
    }
    function resetTextSearch() {
        textSearchValue.value = "";
    }
    function resetFieldFilters(field: string) {
        searchFilters.value = { ...searchFilters.value, [field]: {} };
    }
</script>

<template>
    <form class="form">
        <div class="form__input">
            <MultipleSelectInput @resetFieldFilters="resetFieldFilters" :searchFilters="searchFilters.posts"
                @resetTextSearch="resetTextSearch" field="posts" placeholder="Выберите значения" :values="values.posts"
                :showChosen="false">
                <template v-slot:before>
                    <div class="form__before">
                        <img :src="questionIcon" alt="someIcon1" />
                        <img :src="questionIcon" alt="someIcon2" />
                    </div>
                </template>
                <template v-slot:after>
                    <div class="form__after">
                        <img :src="questionIcon" alt="someIcon3" />
                    </div>
                </template>
            </MultipleSelectInput>
        </div>
        <div class="form__input form__input_full-width">
            <MultipleSelectInput @resetFieldFilters="resetFieldFilters" :searchFilters="searchFilters.todos"
                @resetTextSearch="resetTextSearch" field="todos" placeholder="Выберите значения" :values="values.todos"
                :enableCreate="true" :showChosen="true">
                <template v-slot:filters>
                    <div class="form__filters">
                        <img class="form__filter-input"
                            :title="searchFilters.todos?.completed === 'true' ? 'Завершенные' : 'Не завершенные'"
                            :src="searchFilters.todos?.completed === 'true' ? completedIcon : uncompletedIcon"
                            alt="user"
                            @click="searchFilters.todos?.completed === 'true' ? setFilters('todos', 'completed', 'false') : setFilters('todos', 'completed', 'true')">
                        <input class="form__filter-input" type="text" v-model="textSearchValue"
                            placeholder="Поиск по тексту" @input="setTextSearch('todos', textSearchValue)" />
                        <input class="form__filter-input" type="text" :value="searchFilters.todos?.userId"
                            placeholder="ID пользователя"
                            @input="(e) => setFilters('todos', 'userId', (e.target as HTMLInputElement).value)" />
                    </div>
                </template>
            </MultipleSelectInput>
        </div>
        <button @click="submitHandler">Сохранить</button>
    </form>
</template>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
    }

    .form__input {
        width: 300px;
    }

    .form__input:not(:last-child) {
        margin-bottom: 24px;
    }

    .form__input_full-width {
        width: 100%;
    }

    .form__filters {
        margin-bottom: 16px;
        justify-content: flex-start;
        width: 100%;
        flex-wrap: wrap;
    }

    .form__filter-input {
        margin-bottom: 4px;
    }
</style>
