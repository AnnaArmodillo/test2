<script setup lang="ts">
    import { ref } from "vue";
    import MultipleSelectInput from '../shared/MultipleSelectInput/MultipleSelectInput.vue';
    import { fetchOptions } from "../api/apiOptions";
    import questionIcon from "/question.svg";
    const options = ref<Record<string, any>>({ posts: [], todos: [] });
    const values = ref<Record<string, any>>({ posts: [], todos: [1, 13] });
    function setOptions() {
        Object.keys(options.value).forEach((field) => {
            fetchOptions(field).then((data) => options.value = { ...options.value, [field]: data });
        })
    }
    function submitHandler() {
        console.log(values);
    }
    setOptions();
</script>

<template>
    <form class="form">
        <div class="form__input">
            <MultipleSelectInput field="posts" :setOptions="setOptions" placeholder="Выберите значения"
                :values="values.posts" :options="options.posts" :enableCreate="true" :showChosen="true">
                <template v-slot:before>
                    <div>
                        <img :src="questionIcon" alt="someIcon1" />
                        <img :src="questionIcon" alt="someIcon2" />
                    </div>
                </template>
                <template v-slot:after>
                    <div>
                        <img :src="questionIcon" alt="someIcon3" />
                    </div>
                </template>
            </MultipleSelectInput>
        </div>
        <div class="form__input form__input_full-width">
            <MultipleSelectInput field="todos" :setOptions="setOptions" placeholder="Выберите значения"
                :values="values.todos" :options="options.todos" :enableCreate="true" :showChosen="true"
            >
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
</style>
