<template>
    <q-page>
        <div class="row justify-center q-mt-xl q-mb-xl">
            <div class="col-xl-6 col-lg-6 col-md-8 col-12 col-sm-12">
                <SearchBarComponent @searchButtonClicked="search"></SearchBarComponent>
            </div>

        </div>
        <transition :duration="{ enter: 500, leave: 0 }" appear enter-active-class="animated fadeIn">
            <div v-if="coaches.length > 0" class="row justify-center q-pa-md flex-gap">
                <TransitionGroup :duration="{ enter: 1000, leave: 0 }" enter-active-class="animated fadeIn"
                    leaveFromClass="leave-from">
                    <div v-for="coach in coaches" class="col-lg-3 col-md-6 col-sm-6 col-12" :key="coach.id">
                        <CoachComponent2 :isInAddState="true" :coachObject="coach"></CoachComponent2>
                    </div>
                </TransitionGroup>
                <!-- <div class="col-lg-3">
            <CoachComponent1></CoachComponent1>
        </div>
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div> -->
            </div>
            <template v-else-if="(coaches.length == 0 && !loading)">
                <div class="row q-mt-xl justify-center">
                    <div class="col-12 text-center">
                        <img class="not-found-image" src="noItemFound.png" />
                        <p class="font-size-up-5">مربی پیدا نشد</p>
                        <!-- <p class="font-size-up-1 q-mt-sm"> برای اضافه کردن مربی <span @click="navigateToCoachSearch"
                                class="clickable">کلیک</span> کنید
                        </p> -->
                    </div>
                </div>

            </template>
        </transition>
        <q-inner-loading :showing="loading" color="primary" />

    </q-page>
</template>

<script lang="ts">
import CoachComponent1 from '@/components/CoachComponent1.vue';
import CoachComponent2 from '@/components/CoachComponent2.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import CoachComponent from "../components/CoachComponent.vue"

export default defineComponent({
    components: {
        CoachComponent,
        CoachComponent1,
        CoachComponent2,
        SearchBarComponent
    },
    data: () => ({
        leftDrawerOpen: true,
        coaches: [],
        loading: true,
        searched: false
    }),
    methods: {
        ...mapActions({
            searchCoachByName: 'user/searchCoach'
        }),
        async search(coachName: string) {

            if (coachName)
                this.coaches = await this.searchCoachByName(coachName);
            else
                this.coaches = []
            this.searched = true;
        }
    },
    mounted() {
        this.loading = false;
    }
})
</script>

<style>
.flex-gap {
    gap: 2em;
}

.filter-item {
    flex-grow: 1;
}

.dashboard-landing {
    background-color: black;
    height: 200px;
}

.manager-account {
    height: 10vh;
}

.options-list {
    height: 90vh;
    background-color: rgb(35, 34, 36);
}

.search-section {
    padding: 50px 200px;
}

.search-bar {
    box-shadow: 0 10px 20px 5px #8383838e;
}

.leave-from {
    opacity: 0;
    display: none;
}
</style>