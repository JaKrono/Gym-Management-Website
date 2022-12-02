<template>
    <div dir="ltr" class="page">
        <div class="toolbar">
            <q-btn @click="openAddClassModal()" color="primary">افزودن کلاس</q-btn>
        </div>
        <div class="class-list">
            <template v-for="classItem in classList">
                <ClassComponent :classObject="classItem"></ClassComponent>
            </template>
        </div>
    </div>

    <div v-if="addClassModalShow" class="modal-shadow">
        <div class="modal-content">
            <div class="modal-header">
                <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                    @click="addClassModalShow = false">
            </div>
            <div class="modal-container">
                <div class="add-class-form">
                    <div class="form-item">
                        <label class="main-font">نام کلاس:</label>
                        <input v-model="newClassObject.name" class="form-input" type="text">
                    </div>
                    <!-- <div class="form-item">
                        <label class="main-font">نام مربی:</label>
                        <input v-model="newClassObject.coachname" class="form-input" type="text">
                    </div> -->
                    <div class="form-item">
                        <label class="main-font">ساعت کلاس:</label>
                        <input v-model="newClassObject.time" class="form-input" type="text">
                    </div>
                    <div class="form-button-field">
                        <q-btn @click="addClass()" color="primary">افزودن کلاس</q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ClassComponent from './ClassComponent.vue';
import type { ClassModel, NewClassModel } from '@/common/interfaces';
import { mapActions } from 'vuex';
import { classListService } from "@/repositories/index";

export default defineComponent({
    components: {
        ClassComponent
    },
    data: () => ({
        gymId: '1',//temp
        addClassModalShow: false,
        classList: [] as ClassModel[],
        newClassObject: {} as NewClassModel
    }),
    async mounted() {
        await this.getClassList();
    },
    methods: {
        ...mapActions({
            getClassListAsync: 'user/getClassList',
            addClassAsync: 'user/addClass'
        }),
        async getClassList() {
            try {
                // this.classList = await this.getClassListAsync();
                const result = await classListService.getClassList();
                if (result.status === 200) {
                    this.classList = result.data;
                }
                else {
                    this.classList = [];
                }
            }
            catch (err) { }
        },
        openAddClassModal() {
            this.addClassModalShow = true;

            this.newClassObject = {
                gym: this.gymId,
                name: '',
                time: ''
            }
        },
        async addClass() {
            try {
                // await this.addClassAsync(this.newClassObject);
                const result = await classListService.addClassItem(this.newClassObject);
                if (result.status === 201) {
                    this.classList.push(result.data);
                }
            }
            catch (err) { }

            this.addClassModalShow = false;
        }
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

.modal-shadow {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #000000, $alpha: 0.6);
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    &::-webkit-scrollbar {
        display: none;
    }
}

.modal-content {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    min-width: 320px;
    max-width: 427px;
    background-color: #ffffff;
    padding: 19px 19px 25px 21px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    position: absolute;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    &::-webkit-scrollbar {
        display: none;
    }

    .modal-header {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        height: 20px;
        justify-content: left;
        margin-bottom: 15px;
    }

    .close-icon {
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .modal-container {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
    }

    .button-field {
        width: 100%;
        display: flex;
        justify-content: left;

        .modal-button {
            @extend .centerlize-item;
            width: 120px;
            height: 40px;
            border-radius: 5px;
            color: #ffffff;
            background-color: #1e90ff;
            font-size: 16px;
            font-weight: 500;
            padding: 10px;
            cursor: pointer;

            &:hover {
                background-color: darken(#1e90ff, 10%);
            }
        }
    }
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

.add-class-form {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 20px;

    .form-item {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: left;
        gap: 5px;
    }

    .form-input {
        width: 100%;
        height: 40px;
        text-align: left;
        font-size: 18px;
        border: 2px solid $background;
    }

    label {
        min-width: 100px;
        text-align: left;
    }

    .form-button-field {
        width: 100%;
        display: flex;
        justify-content: right;
        align-items: center;
    }
}

@media all and (max-width: 599.99px) {
    .class-list {
        justify-content: center !important;
        padding: 20px;
    }
}
</style>