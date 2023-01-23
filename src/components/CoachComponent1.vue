<template>
    <div class="row content-center q-pa-sm coach-card">
        <div class="col-lg-8 q-px-lg row column justify-center">
            <div style="font-size:1.3em">{{ model.name }}</div>
            <div class="q-mt-sm">مربی : {{ model.coachname }}</div>
            <div class="q-mt-sm">ساعت : {{ model.time }} </div>
            <div class="q-mt-sm">{{ getDisplayCategroy(model.CourseCategory) }}</div>
        </div>
        <q-space></q-space>
        <div class="col-lg-4 row column justify-end">
            <!-- <q-btn flat color="secondary" class="self-end q-mb-auto" round icon="delete">
            </q-btn> -->
            <q-btn @click="view" dense outline color="primary">مشاهده </q-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { CourseList } from '@/common/category-list';
export default defineComponent({
    props: ['model'],
    methods: {
        getDisplayCategroy(courseId: number) {
            return CourseList.find(item => item.id == courseId)?.title
        },
        view() {
            this.$emit('view')
        }
    }
})
</script>
<style scoped lang="scss">
.coach-card {
    box-shadow: 0 0 4px 0.3px #000;
    border-radius: 5px;
    transition: all .3s ease-in-out;
    min-height: 120px;

    .img-container {
        overflow: hidden;
        border-radius: 50%;
        width: 100px;
        height: 100px;
    }

    .coach-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        transition: all .3s ease-in-out;

    }

    // &:hover {
    //     box-shadow: 0 0 5px 1px #000;

    //     .coach-image {
    //         transform: scale(1.05);
    //         transition: all .3s ease-in-out;

    //     }
    // }
}
</style> 