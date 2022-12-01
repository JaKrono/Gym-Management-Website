<template>
    <div v-if="classObject" class="class-box">
        <div class="class-header">
            <img @click="openEditModal()" class="edit-button" src="../assets/images/edit-icon.png"
                alt="edit button icon">
            <div class="class-name main-font">{{ classObject.name }}</div>
        </div>
        <div class="class-detail">
            <div class="class-detail-item secondary-font">مربی: {{ classObject.coachName }}</div>
            <div class="class-detail-item secondary-font">ساعت: {{ classObject.time }}</div>
            <div class="class-detail-item secondary-font">اعضا: {{ classObject.memberCount }}</div>
        </div>
    </div>
    <div v-if="editModalShow" class="modal-shadow">
        <div class="modal-content">
            <div class="modal-header">
                <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                    @click="editModalShow = false">
            </div>
            <div class="modal-container">
                <div class="edit-form">
                    <div class="form-item">
                        <input v-model="editClassObject.name" class="form-input" type="text">
                        <label class="main-font">:نام کلاس</label>
                    </div>
                    <div class="form-item">
                        <input v-model="editClassObject.coachName" class="form-input" type="text">
                        <label class="main-font">:نام مربی</label>
                    </div>
                    <div class="form-item">
                        <input v-model="editClassObject.time" class="form-input" type="text">
                        <label class="main-font">:ساعت کلاس</label>
                    </div>
                    <q-btn @click="editClass()" color="primary">ویرایش</q-btn>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { ClassModel } from '@/common/interfaces';

export default defineComponent({
    props: ['classObject'],
    data: () => ({
        editModalShow: false,
        editClassObject: {} as ClassModel
    }),
    methods: {
        openEditModal() {
            this.editModalShow = true;

            this.editClassObject = JSON.parse(JSON.stringify(this.classObject)) as typeof this.classObject;
        },
        async editClass() {// call edit class API
            try {
                this.editClassObject;
            }
            catch (err) { }
        }
    }
})
</script>
<style lang="scss">
* {
    box-sizing: border-box;
}

@keyframes fadeIn {
    0% {
        background: rgba(0, 0, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0.6);
    }
}

@keyframes blowUpModal {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
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

.centerlize-item {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
}

.main-font {
    font-size: 18px;
    font-weight: 700;
}

.secondary-font {
    font-size: 16px;
    font-weight: 500;
}

.class-box {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    min-width: 260px;
    max-width: 260px;
    height: 160px;
    border-radius: 8px;
    background-color: white;
    padding: 20px 15px;
    color: $secondary;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.class-header {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .edit-button {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
}

.class-detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    align-content: flex-start;
    gap: 5px;

    .class-detail-item {
        width: 100%;
        text-align: left;
    }
}

.edit-form {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: 20px;

    .form-item {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        gap: 5px;
        justify-content: left;
        align-items: center;
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
}
</style>