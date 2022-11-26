<template>
    <div dir="ltr" class="page">
        <div class="toolbar">
            <q-btn color="primary">افزودن کلاس</q-btn>
        </div>
        <div class="class-list">
            <ClassComponent></ClassComponent>
            <ClassComponent></ClassComponent>
            <ClassComponent></ClassComponent>
            <ClassComponent></ClassComponent>
            <ClassComponent></ClassComponent>
            <ClassComponent></ClassComponent>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ClassComponent from './ClassComponent.vue';
export default defineComponent({
    components: {
        ClassComponent
    },
    data: () => ({

    }),
    methods: {

    }
})
</script>
<style lang="scss">
.centerlize-item {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
}

.page {
    @extend .centerlize-item;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
    background-color: $background;
}

.toolbar {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: right;
    padding: 0 40px 0 0;
}

.class-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
    align-items: flex-start;
    align-content: flex-start;
    gap: 20px;
    padding: 20px 60px;
}
</style>