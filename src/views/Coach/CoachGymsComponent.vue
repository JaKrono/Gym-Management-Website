<template>
   <q-scroll-area>
      <q-page class="col-12">
         <div class="row col-12 content-center q-px-lg">

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
                        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in joinedGyms">
                           <GymCardComponent :model="club"></GymCardComponent>
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
                        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in invitedGyms">
                           <GymCardComponent :model="club" phoneNumber address></GymCardComponent>
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
export default defineComponent({
   components: {
      GymCardComponent
   },
   data: () => ({
      searchResult: [],
      joinedGyms: [
         { name: 'باشگاه دانشگاه علم و صنعت ایران شعبه آقایان علی‌الخصوص بیژن مرتضوی', img: 'gym1.jpg' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym5.jpg' },
      ],
      invitedGyms: [
         { name: 'باشگاه دعوت کننده اول', address: '', phone: '', string: '' },
         { name: 'باشگاه دعوت کننده اول', address: '', phone: '', string: '' },
      ]
   }),
   methods: {
      ...mapActions({
         searchGym: 'customer/getGymByName'
      }),
   }
})
</script>
<style class="scss">

</style>