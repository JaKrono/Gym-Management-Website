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
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
                <div class="coach-item">
                    <div class="coach-icon"></div>
                    <div class="coach-detail bold-font">محمد محمدی</div>
                    <div class="coach-detail main-font">مربی بدنسازی</div>
                </div>
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
    background-color: #e8e8e8;
    // padding: 50px 0;
}

.page-container {
    @extend .centerlize-item;
    flex-flow: row wrap;
    width: 1516px;
    height: 100%;
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
    background-color: #1976d2;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background: darken(#1976d2, 10%);
    }
}

.coach-item {
    display: flex;
    flex-flow: column;
    width: 260px;
    height: 340px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    cursor: pointer;
    padding: 20px;

    .coach-icon {
        width: 220px;
        height: 220px;
        background-color: #b4b4b4;
        border-radius: 4px;
    }

    .coach-detail {
        text-align: left;
        margin-top: 10px;
    }
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

        .result-section {
            justify-content: center;
            width: 100%;
        }
    }
}

@media all and (max-width: 1080px) {
    // .page {
    // padding: 20px 0;
    // }

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