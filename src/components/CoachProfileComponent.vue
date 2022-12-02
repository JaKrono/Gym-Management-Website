<template>
    <div class="page">
        <div class="header"></div>
        <div class="container">
            <div class="avatar-field">
                <img class="avatar-icon" src="src/assets/images/avtar-icon.png" alt="avatar-icon">
            </div>
            <div class="mobile-edit-button">
                <img v-if="false" class="edit-icon" src="src/assets/images/edit-icon.png" alt="edit-icon"
                    @click="editModalShow = true">
            </div>
            <div class="avatar-detail-field">
                <div class="avatar-detail">
                    <div class="font-size-up-5">سیدحسام حسینی</div>
                    <div class="q-py-lg font-size-up-1">متن تستی فقط برای دیدن جای خالی و اندازه ها است.
                        متن تستی فقط برای دیدن جای خالی و اندازه ها است.
                        متن تستی فقط برای دیدن جای خالی و اندازه ها است.
                    </div>
                </div>
                <div class="button-field">
                    <div class="button-option invite-btn" @click="inviteModalShow = true">دعوت</div>
                    <div v-if="false" class="button-option edit-btn" @click="editModalShow = true">ویرایش</div>
                </div>
            </div>
            <div class="page-section">
                <div class="section-title">مشخصات :</div>
                <div class="table">
                    <div class="table-row">
                        <div class="table-row-section main-section">قد</div>
                        <div class="table-row-section detail-section">183</div>
                    </div>
                    <div class="table-row">
                        <div class="table-row-section main-section">سن</div>
                        <div class="table-row-section detail-section">23</div>
                    </div>
                    <div class="table-row">
                        <div class="table-row-section main-section">جنسیت</div>
                        <div class="table-row-section detail-section">مرد</div>
                    </div>
                </div>
            </div>
            <div class="page-section">
                <div class="section-title">دستاورد ها :</div>
                <div class="achievement-list">
                    <div class="achievement-item">
                        <img class="achievement-icon" src="src/assets/images/achievement-icon.png"
                            alt="achievement-icon">
                        <div class="achievement-detail">
                            <div class="achievement-title">اولین قهرمانی</div>
                            <div class="achievement-date">1399 - 1398</div>
                        </div>
                    </div>
                    <div class="achievement-item">
                        <img class="achievement-icon" src="src/assets/images/achievement-icon.png"
                            alt="achievement-icon">
                        <div class="achievement-detail">
                            <div class="achievement-title">دومین قهرمانی</div>
                            <div class="achievement-date">1400 - 1399</div>
                        </div>
                    </div>
                    <div class="achievement-item">
                        <img class="achievement-icon" src="src/assets/images/achievement-icon.png"
                            alt="achievement-icon">
                        <div class="achievement-detail">
                            <div class="achievement-title">سومین قهرمانی</div>
                            <div class="achievement-date">1401 - 1400</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="inviteModalShow" class="modal-shadow">
        <div class="modal-content">
            <div class="modal-header">
                <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                    @click="inviteModalShow = false">
            </div>
            <div class="modal-container">
                <textarea class="text-field" cols="30" rows="10"></textarea>
                <div class="button-field">
                    <div class="modal-button">ارسال دعوتنامه</div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editModalShow" class="modal-shadow">
        <div class="modal-content">
            <div class="modal-header">
                <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                    @click="editModalShow = false">
            </div>
            <div class="modal-container">
                <div>Edit Profile Modal</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data: () => ({
        inviteModalShow: false,
        editModalShow: false
    }),
    methods: {

    }
})
</script>
<style scoped lang="scss">
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

.centerlize-item {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
}

* {
    cursor: default;
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

.text-field {
    width: 100%;
    height: 180px;
    margin-bottom: 10px;
}

.page {
    @extend .centerlize-item;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
}

.header {
    width: 100%;
    height: 150px;
    background-color: $primary;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);
}

.container {
    width: 100%;
    position: relative;
    background-color: #ffffff;
}

.mobile-edit-button {
    display: none;
}

.avatar-field {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 7px solid #ffffff;
    background-color: #eeeeee;
    position: absolute;
    left: 90px;
    top: -100px;

    .avatar-icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}

.avatar-detail-field {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 0 25px 0 300px;
    margin: 30px 0;

    .avatar-detail {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        align-content: flex-start;
        justify-content: left;
        gap: 15px;
        height: 150px;
    }

    .avatar-name {
        width: 100%;
        font-size: 36px;
        font-weight: 700;
        text-align: left;
    }

    .avatar-description {
        width: 100%;
        min-width: 720px;
        max-width: 720px;
        font-size: 18px;
        font-weight: 500;
        text-align: justify;
        position: absolute;
        top: 120px;
        left: 150px;
    }

    .button-field {
        display: flex;
        height: 45px;
        align-items: center;
        align-content: flex-start;
        flex-flow: row nowrap;
        gap: 15px;
    }

    .button-option {
        @extend .centerlize-item;
        width: 170px;
        height: 45px;
        border-radius: 8px;
        color: white;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
    }

    .invite-btn {
        background-color: $primary;

        &:hover {
            background: darken($primary, 10%);
        }
    }

    .edit-btn {
        background-color: #bebebe;

        &:hover {
            background: darken(#bebebe, 10%);
        }
    }
}

.page-section {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 0 90px;
    margin-bottom: 30px;

    .section-title {
        width: 100%;
        font-size: 24px;
        font-weight: 700;
        text-align: left;
        margin-bottom: 25px;
    }

    .table {
        width: 100%;
        max-width: 480px;
        display: flex;
        flex-flow: row wrap;
        justify-content: left;
        align-items: flex-start;
        align-content: flex-start;
        gap: 15px;

        .table-row {
            @extend .centerlize-item;
            width: 100%;
            height: 55px;
            flex-flow: row nowrap;
            border-radius: 8px;
        }

        .table-row-section {
            @extend .centerlize-item;
            width: 100%;
            height: 100%;
            color: white;
            font-size: 18px;
            font-weight: 700;
        }

        .main-section {
            background-color: $secondary;
            border-radius: 8px 0 0 8px;
        }

        .detail-section {
            background-color: $primary;
            border-radius: 0 8px 8px 0;
        }
    }

    .achievement-list {
        display: flex;
        align-content: flex-start;
        width: 100%;
        justify-content: left;
        flex-flow: row wrap;
        gap: 15px;

        .achievement-item {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: left;
            width: 100%;
            max-width: 720px;
            height: 85px;
            border-radius: 8px;
            background-color: #e8e8e8;
            padding: 10px 15px;
            gap: 20px;
        }

        .achievement-icon {
            width: 65px;
            height: 65px;
            box-sizing: border-box;
        }

        .achievement-detail {
            display: flex;
            flex-flow: column nowrap;
        }

        .achievement-title {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
        }

        .achievement-date {
            font-size: 16px;
            font-weight: 500;
            color: #7b7b7b;
        }
    }
}

@media all and (min-width: 721px) and (max-width: 1080px) {
    .header {
        height: 100px;
    }

    .avatar-field {
        width: 150px;
        height: 150px;
        left: 7%;
        top: -75px;
    }

    .avatar-detail-field {
        padding: 0 25px 0 calc(7% + 170px);
        margin: 30px 0;

        .avatar-name {
            font-size: 24px;
        }

        .avatar-description {
            min-width: 620px;
            max-width: 620px;
            font-size: 14px;
            font-weight: 400;
            top: 120px;
            left: 50px;
        }

        .button-option {
            width: 100px;
            height: 35px;
            font-size: 16px;
            font-weight: 500;
        }
    }

    .page-section {
        padding: 0 50px;
        margin-bottom: 15px;

        .section-title {
            font-size: 18px;
            margin-bottom: 15px;
        }

        .table {
            max-width: unset;
            gap: 10px;

            .table-row {
                height: 45px;
            }
        }

        .achievement-list {

            .achievement-item {
                max-width: unset;
                background-color: unset;
            }
        }
    }
}

@media all and (max-width: 720px) {
    .mobile-edit-button {
        width: 100%;
        height: 25px;
        display: flex;
        justify-content: right;
        padding-right: 25px;
        margin-top: 20px;

        .edit-icon {
            width: 25px;
            height: 100%;
            box-sizing: border-box;
            cursor: pointer;
        }
    }

    .header {
        height: 100px;
    }

    .avatar-field {
        width: 150px;
        height: 150px;
        left: 5%;
        top: -75px;
    }

    .avatar-detail-field {
        flex-flow: row wrap;
        justify-content: left;
        padding: 0 35px !important;
        margin: 30px 0 0 0;

        .avatar-detail {
            height: 170px;
        }

        .avatar-name {
            width: 100%;
            font-size: 24px;
        }

        .avatar-description {
            width: 100%;
            min-width: unset;
            max-width: calc(100% - 40px);
            font-size: 16px;
            font-weight: 400;
            top: 120px;
            left: 20px;
        }

        .button-field {
            width: 100%;
            margin-bottom: 15px;
        }

        .button-option {
            width: 100%;
            font-size: 18px;
            font-weight: 500;
            border-radius: 50px;
        }

        .edit-btn {
            display: none;
        }
    }

    .page-section {
        padding: 0 30px;
        margin-bottom: 25px;

        .section-title {
            font-size: 18px;
            margin-bottom: 15px;
        }

        .table {
            max-width: unset;
            gap: 10px;
            margin: 0 20px;

            .table-row {
                height: 45px;
                border-radius: 20px;
            }
        }

        .achievement-list {

            .achievement-item {
                max-width: 100%;
                background-color: unset;
                height: 65px;
                padding: 10px 5px;
                gap: 20px;
            }

            .achievement-icon {
                width: 45px;
                height: 45px;
            }

            .achievement-detail {
                gap: 7px;
            }

            .achievement-title {
                font-size: 16px;
                font-weight: 500;
            }

            .achievement-date {
                font-size: 12px;
                font-weight: 400;
            }
        }
    }
}
</style>