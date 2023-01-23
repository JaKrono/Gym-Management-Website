<template>
    <q-page>
        <div class="row content-center q-px-lg" style="align-items:center">

            <h5 class="">مربی ها</h5>
            <q-space></q-space>
            <q-btn @click="navigateToCoachSearch" color="primary" icon="add" style="height:40px">افزودن مربی</q-btn>
        </div>
        <template v-if="(coaches.length > 0 && !loading)">
            <q-scroll-area style="height:90%; width:100%;">
                <div class="row justify-start q-pa-lg" :class="{ 'justify-center': $q.screen.xs }">

                    <div v-for="coach in coaches" class="q-pa-md col-lg-4 col-sm-6 col-xs-12">
                        <CoachComponent2 :coachObject="coach" :isInAddState="false"></CoachComponent2>
                    </div>

                </div>
            </q-scroll-area>
        </template>
        <template v-else-if="(coaches.length == 0 && !loading)">
            <div class="row q-mt-lg justify-center">
                <div class="col-12 text-center">
                    <img class="not-found-image" src="noItemFound.png" />
                    <p class="font-size-up-5">مربی پیدا نشد</p>
                    <p class="font-size-up-1 q-mt-sm"> برای اضافه کردن مربی <span @click="navigateToCoachSearch"
                            class="clickable">کلیک</span> کنید
                    </p>
                </div>
            </div>

        </template>
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
        search: '',
        loading: true
    }),
    computed: {
        ...mapState({
            coaches: state => state.owner.coaches,
            ownerId: state => state.user.userId,
            gym: state => state.user.gym
        })
    },
    async mounted() {
        await this.getCoaches(this.gym.id)
        this.loading = false
    },
    methods: {
        navigateToCoachSearch() {
            this.$router.push('/search-coach')
        },
        ...mapActions({
            getCoaches: 'owner/getCoachesData'
        })
    }
})
</script>

<style>
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

.grow-flex-1 {
    flex-grow: 1;
}

.not-found-image {
    min-width: 200px;
    max-width: 100%;
    margin: auto;
}
</style>