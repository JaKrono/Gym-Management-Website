<template>
    <div class="page">
        <div class="page-container">
            <div class="search-section">
                <div class="search-bar">
                    <img class="search-icon" src="src/assets/images/search-icon.png">
                    <input type="text" class="search-input" placeholder="لطفا نام مربی مورد نظر خود رو وارد کنید ...">
                </div>
                <div class="search-button">جستجو</div>
            </div>
            <div class="result-section">
                <div class="empty-field ">موردی یافت نشد !</div>
                <CoachComponent2 class="coach-item"></CoachComponent2>
                <CoachComponent2 class="coach-item"></CoachComponent2>
                <CoachComponent2 class="coach-item"></CoachComponent2>
                <CoachComponent2 class="coach-item"></CoachComponent2>
                <CoachComponent2 class="coach-item"></CoachComponent2>
                <CoachComponent2 class="coach-item"></CoachComponent2>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CoachComponent2 from './CoachComponent2.vue';
export default defineComponent({
    components: {
        CoachComponent2
    },
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
    align-content: center;
}

.bold-font {
    font-size: 24px;
    font-weight: 700;
}

.main-font {
    font-size: 18px;
    font-weight: 500;
}

.page {
    width: 100%;
    height: 100%;
    background-color: $background;
}

.page-container {
    @extend .centerlize-item;
    flex-flow: row wrap;
    max-width: 1516px;
    padding-top: 40px;

    .search-section {
        @extend .centerlize-item;
        justify-content: space-between;
        min-width: 1024px;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        padding: 15px 20px;
        border-radius: 1px;
        margin-bottom: 50px;
    }

    .result-section {
        display: flex;
        flex-flow: row wrap;
        justify-content: left;
        width: 100%;
        padding: 30px;
        gap: 30px;
        margin-bottom: 50px;
    }
}

.search-bar {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 10px;

    .search-input {
        width: 720px;
        height: 40px;
        border: none;
        text-align: left;
        padding-left: 10px;
        cursor: text;
    }
}

.search-icon {
    min-width: 24px;
    max-width: 24px;
    height: 24px;
}

.search-button {
    @extend .centerlize-item;
    @extend .main-font;
    width: 120px;
    height: 40px;
    padding: 5px 10px;
    color: #ffffff;
    background-color: $primary;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: darken($primary, 10%);
    }
}

.coach-item {
    width: 260px;
}

.empty-field {
    width: 100%;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    color: red;
}

@media all and (max-width: 720px) {
    .search-icon {
        display: none;
    }

    .page-container {
        padding-top: 20px;

        .result-section {
            justify-content: center !important;
            width: 100%;
        }
    }
}

@media all and (max-width: 1080px) {
    .page-container {
        max-width: 700px;

        .search-section {
            min-width: unset;
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
        }
    }

    .search-bar {
        gap: 5px;

        .search-input {
            width: 200px;
            padding-left: unset;
            font-size: 12px;
        }
    }

    .search-button {
        width: 80px;
    }

    .empty-field {
        font-size: 18px;
    }
}
</style>