<script setup lang="ts">
    import { ref } from "vue";
    import MultipleSelectInput from '../shared/MultipleSelectInput/MultipleSelectInput.vue';
    import TodosFilters from './TodosFilters.vue';
    import questionIcon from "/question.svg";
    const values = ref<Record<string, any>>({ posts: [], todos: [1, 13] });
    function submitHandler() {
        console.log(values.value);
    }
    function updateValues(field: string, fieldValues: number[]) {
        values.value = {...values.value, [field]: fieldValues};
    }
</script>

<template>
    <form class="form">
        <div class="form__input">
            <MultipleSelectInput @updateValues="updateValues"
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
            <MultipleSelectInput @updateValues="updateValues" field="todos" placeholder="Выберите значения" :values="values.todos" :enableCreate="true"
                :showChosen="true">
                <template v-slot:filters>
                    <TodosFilters></TodosFilters>
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
