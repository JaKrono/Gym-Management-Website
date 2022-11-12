<template>
    <div class="page">
        <div class="header"></div>
        <div class="container">
            <div class="avatar-field"></div>
            <div class="button-field">
                <div class="button-option message-btn">ارسال پیام</div>
                <div class="button-option edit-btn">ویرایش</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
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
}

.header {
    width: 100%;
    height: 150px;
    background-color: #8Ebc8e;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);
}

.container {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #ffffff;
}

.avatar-field {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 7px solid #ffffff;
    background-color: #eeeeee;
    position: absolute;
    left: 150px;
    top: -100px;
}

.button-field {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 15px;
    width: 100%;
    height: 45px;
    padding-left: 400px;
    margin-top: 30px;

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

    .message-btn {
        background-color: #1e90ff;

        &:hover {
            background: darken(#1e90ff, 10%);
        }
    }

    .edit-btn {
        background-color: #bebebe;

        &:hover {
            background: darken(#bebebe, 10%);
        }
    }
}
</style>