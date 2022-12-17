<template>
   <q-page>
      <div class="row col-12 content-center q-px-lg">
         <div class="row col-12 q-my-lg">

            <div class="row col-12 justify-xs-center justify-sm-between items-center q-mb-md">
               <!-- Can also be favorite or recently added clubs. -->
               <p class="col-sm-auto font-size-up-4 text-weight-bold">باشگاه‌های ثبت نام شده</p>
               <q-btn @click="navigateToGymsPage" class="col-12 col-sm-auto q-px-sm q-mt-sm q-mt-sm-none"
                  color="primary">مدیریت باشگاه‌ها</q-btn>
            </div>

            <div class="row col-12">
               <div class="col">
                  <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                     <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in clubs">
                        <GymCardComponent :model="club"></GymCardComponent>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </q-page>
</template>
<script lang="ts">
import GymCardComponent from '@/components/Gym/GymCardComponent.vue';
import { defineComponent } from 'vue'
export default defineComponent({
   components: {
      GymCardComponent
   },
   data: () => ({
      // name: 'بیژن مرتضوی',
      // phoneNumber: '09394057270',
      username: 'Bizhan123',
      email: 'bizhan123@iust.ac.ir',
      clubs: [
         { name: 'باشگاه دانشگاه علم و صنعت ایران شعبه آقایان علی‌الخصوص بیژن مرتضوی', img: 'gym1.jpg' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym5.jpg' },
         { name: 'زورخانه قهرمان بیژن مرتضوی', img: 'gym2.jpg' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym3.jpg' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym4.jpg' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym5.jpg' }
      ]
   }),
   methods: {
      navigateToGymsPage() {
         this.$router.push('/gyms')
      },
      navigateToGymProfile() {
         this.$router.push('/cgymprofile')
      }
   }
})
</script>
<style>

</style>