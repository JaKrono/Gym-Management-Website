<template>
    <div class="page">
        <div class="page-container">
            <div class="search-section">
                <div class="search-bar q-md-sm">
                    <img class="search-icon" style="margin-right: 8px" src="src/assets/images/search-icon.png">
                    <input type="text" v-model="coachName" class="search-input"
                        placeholder="لطفا نام مربی مورد نظر خود رو وارد کنید ...">
                </div>
                <q-btn @click="getCoaches()" color="primary">جستجو</q-btn>
            </div>
            <div class="result-section">
                <!-- <div v-if="(coachList.length === 0)" class="empty-field ">موردی یافت نشد !</div> -->
                <!-- <template v-for="coach in coachList">
                    <CoachComponent2 class="coach-item" :coachObject="coach"></CoachComponent2>
                </template> -->
                <div v-if="(!flag)" class="empty-field ">موردی یافت نشد !</div>
                <template v-if="(flag)">
                    <CoachComponent2 class="coach-item" :coachObject="searchResult"></CoachComponent2>
                </template>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CoachComponent2 from './CoachComponent2.vue';
import type { CoachProfileModel, SearchCoachModel } from '@/common/interfaces';
import { mapActions } from 'vuex';
import { SearchCoachService } from "@/repositories/index";

export default defineComponent({
    components: {
        CoachComponent2
    },
    data: () => ({
        coachName: '',
        coachList: [] as CoachProfileModel[],
        searchResult: {} as SearchCoachModel,
        flag: false
    }),
    methods: {
        ...mapActions({
            searchCoachAsync: 'user/searchCoach'
        }),
        async getCoaches() {
            try {
                // this.coachList = await this.searchCoachAsync(this.coachName);
                const searchCoachOutput = await SearchCoachService.searchCoachList(this.coachName);
                if (searchCoachOutput.status === 200) {
                    this.searchResult = searchCoachOutput.data;
                    this.flag = true;
                }
                else {
                    this.flag = false;
                }
                console.log(this.searchResult);
            }
            catch (err) { }

            this.coachName = '';
        }
    }
})
</script>
<style lang="scss" scoped>
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
    background-color: white;
}

.page-container {
    @extend .centerlize-item;
    flex-flow: row wrap;
    max-width: 1516px;
    padding-top: 40px;

    .search-section {
        @extend .centerlize-item;
        justify-content: space-between;
        min-width: 768px;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        padding: 15px;
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
    justify-content: left;
    align-items: center;
    gap: 10px;
    min-width: 300px;
    margin-left: 24px;
    margin-right: 24px;

    .search-input {
        width: 300px;
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
            width: 300px;
            padding-left: unset;
            font-size: 12px;
        }
    }

    .empty-field {
        font-size: 18px;
    }
}
</style>