<template>
    <div class="class-box">
        <div class="class-header">
            <img class="edit-button" src="../assets/images/edit-icon.png" alt="edit button icon">
            <div class="class-name main-font">بدن سازی</div>
        </div>
        <div class="class-detail">
            <div class="class-detail-item secondary-font">مربی: سیدحسام حسینی</div>
            <div class="class-detail-item secondary-font">ساعت: 18 - 20</div>
            <div class="class-detail-item secondary-font">اعضا: 20</div>
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
* {
    box-sizing: border-box;
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
</style>