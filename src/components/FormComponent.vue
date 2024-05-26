<script setup lang="ts">
    import { ref } from "vue";
    import MultipleSelectInput from '../shared/MultipleSelectInput/MultipleSelectInput.vue';
    import TodosFilters from './TodosFilters.vue';
    import questionIcon from "/question.svg";
    const values = ref<Record<string, any>>({ posts: [], todos: [1, 13] });
    const searchFilters = ref<Record<string, any>>({});
    function setFilters(field: string, param: string, value: string) {
        searchFilters.value = { ...searchFilters.value, [field]: { ...searchFilters.value[field], [param]: value } };
    }
    function submitHandler() {
        console.log(values.value);
    }
    function resetFieldFilters(field: string) {
        searchFilters.value = { ...searchFilters.value, [field]: {} };
    }
</script>

<template>
    <form class="form">
        <div class="form__input">
            <MultipleSelectInput @resetFieldFilters="resetFieldFilters"
                field="posts" placeholder="Выберите значения" :values="values.posts" :showChosen="false">
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
                field="todos" placeholder="Выберите значения" :values="values.todos" :enableCreate="true"
                :showChosen="true">
                <template v-slot:filters>
                    <TodosFilters field="todos" @setFilters="setFilters" :searchFilters="searchFilters.todos || {}"></TodosFilters>
                </template>
            </MultipleSelectInput>
        </div>
        <button @click.prevent="submitHandler">Сохранить</button>
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

</style>
