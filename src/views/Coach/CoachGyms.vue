<template>
   <q-scroll-area>
      <q-page class="col-12">
         <q-inner-loading :showing="!hasLoaded" color="primary" />
         <GymPageViewComponent v-if="viewingGymPage" @resetPageData="getData" :gymId="viewingGymId" @finishViewing="showCoachGymsPage">
         </GymPageViewComponent>
         <div v-if="hasLoaded && !viewingGymPage" class="row col-12 content-center q-px-lg">

            <div class="row col-12 q-my-lg">
               <div class="row col-12 justify-xs-center justify-sm-between items-center q-mb-md">
                  <!-- Can also be favorite or recently added clubs. -->
                  <p class="col-sm-auto font-size-up-4 text-weight-bold">باشگاه‌های عضو شده</p>
                  <!-- <q-btn @click="" class="col-12 col-sm-auto q-px-sm q-mt-sm q-mt-sm-none" color="primary">عضویت
                     در باشگاه جدید</q-btn> -->
               </div>

               <div class="row col-12">
                  <div class="col">
                     <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in acceptedGyms">
                           <GymCardComponent @viewGym="showGymPage" :model="club"></GymCardComponent>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="row col-12 justify-xs-center justify-sm-between items-center q-mt-lg q-mb-md">
                  <!-- Can also be favorite or recently added clubs. -->
                  <p class="col-sm-auto font-size-up-4 text-weight-bold">باشگاه‌های دعوت کننده</p>
                  <!-- <q-btn @click="" class="col-12 col-sm-auto q-px-sm q-mt-sm q-mt-sm-none" color="primary">عضویت
                     در باشگاه جدید</q-btn> -->
               </div>

               <div class="row col-12">
                  <div class="col">
                     <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in pendingGyms">
                           <GymCardComponent :model="club" @viewGym="showGymPage" phoneNumber address>
                           </GymCardComponent>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </q-page>
   </q-scroll-area>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import GymCardComponent from '@/components/Gym/GymCardComponent.vue';
import GymPageViewComponent from '@/components/Gym/GymPageViewComponent.vue';
export default defineComponent({
   components: {
      GymCardComponent,
      GymPageViewComponent
   },
   data: () => ({
      hasLoaded: false,
      viewingGymPage: false,
      viewingGymId: -1,
      searchResult: [],
      acceptedGyms: [],
      pendingGyms: []
   }),
   methods: {
      ...mapActions({
         getAcceptedGyms: 'coach/getAcceptedGyms',
         getPendingGyms: 'coach/getPendingGyms'
      }),
      showGymPage(gymId: number) {
         this.viewingGymId = gymId
         this.viewingGymPage = !this.viewingGymPage
      },
      showCoachGymsPage() {
         this.viewingGymPage = !this.viewingGymPage
      },
      async getData() {
         this.hasLoaded = false
         const result1 = await this.getAcceptedGyms()
         const result2 = await this.getPendingGyms()
         this.acceptedGyms = result1
         this.pendingGyms = result2
         this.hasLoaded = true
      }
   },
   async mounted() {
      this.getData()
   }
})
</script>
<style class="scss">

</style>