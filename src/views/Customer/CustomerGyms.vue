<template>
   <q-scroll-area>
      <q-page class="col-12" v-if="!searchState">

         <div class="row col-12 content-center q-px-lg">
            <div class="row col-12 q-my-lg">

               <div class="row col-12 justify-xs-center justify-sm-between items-center q-mb-md">
                  <!-- Can also be favorite or recently added clubs. -->
                  <p class="col-sm-auto font-size-up-4 text-weight-bold">باشگاه‌های ثبت نام شده</p>
                  <q-btn @click="toggleState" class="col-12 col-sm-auto q-px-sm q-mt-sm q-mt-sm-none"
                     color="primary">عضویت
                     در باشگاه جدید</q-btn>
               </div>

               <div class="row col-12">
                  <q-inner-loading :showing="!hasLoaded" color="primary" />
                  <div class="col" v-if="hasLoaded">
                     <div class="row q-col-gutter-x-lg q-col-gutter-y-md" v-if="gymsOfCustomer.length > 0">
                        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="gym in gymsOfCustomer">
                           <GymCardComponent :model="gym" address phoneNumber></GymCardComponent>
                        </div>
                     </div>
                     <div v-else>
                        <p>شما تاکنون در باشگاهی ثبت‌نام نکرده‌اید.</p>
                     </div>
                  </div>
               </div>

            </div>
         </div>
      </q-page>

      <q-page class="col-12" v-if="searchState">
         <div class="row col-12 content-center q-px-lg">
            <div class="row col-12 q-my-lg">

               <div class="row col-12 justify-xs-center justify-sm-between items-center q-mb-md">
                  <!-- Can also be favorite or recently added clubs. -->
                  <p class="col-sm-auto font-size-up-4 text-weight-bold">جستجوی باشگاه‌ها</p>
                  <q-btn @click="toggleState" class="col-12 col-sm-auto q-px-xl q-mt-sm q-mt-sm-none"
                     color="secondary">بازگشت</q-btn>
               </div>

               <div class="row q-my-lg col-12 justify-between">
                  <div class="col-12 col-sm-8">
                     <q-input class="col-12" dense clearable outlined v-model="searchText"
                        placeholder="نام باشگاه را وارد کنید">
                        <template v-slot:prepend>
                           <q-icon name="search" />
                        </template>
                     </q-input>
                  </div>
                  <div class="col-12 col-sm-auto">
                     <q-btn @click="searchClicked" class="col-12 q-px-xl q-mt-xs-md q-mt-sm-none" style="width: 100%"
                        color="primary">جستجو</q-btn>
                  </div>
               </div>

               <div class="row col-12">
                  <div class="col">
                     <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                        <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in searchResult">
                           <GymCardComponent :model="club"></GymCardComponent>
                        </div>
                        <p v-if="searchResult.length === 0">موردی یافت نشد</p>
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
import GymCardComponent from '@/components/Gym/GymCardComponent.vue';
import { mapActions, mapState } from 'vuex';
import { getCssVar } from 'quasar';
import CoachCustomers from '../Coach/CoachCustomers.vue';
export default defineComponent({
   components: {
      GymCardComponent
   },
   data: () => ({
      searchText: '',
      searchState: false,
      searchResult: [],
      gymsOfCustomer: [],
      hasLoaded: false,
      clubs: [
         { name: 'زورخانه پهلوان بیژن مرتضوی علی‌الخصوص بیژن مرتضوی بددت شستی هتشسی  شس یشس یشس یشس یشس یث شی   ', picUrl: 'gym1.jpg', phone: '۰۲۵۱۶۶۶۶۶۶۶', address: 'تهران پارس فلکه سوم تهرانپارس ضلع جنوب بیمارستان کوچه قمصری پلاک ۷ طبقه دوم جنوبی' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', picUrl: 'gym2.jpg', phone: '', address: 'تهران پارس فلکه سوم تهرانپارس ضلع جنه قمصری پلاک ۷ طبقه دوم جنوبی' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', picUrl: 'gym3.jpg', phone: '۰۲۵۱۶۶۶۶۶۶۶', address: '' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', picUrl: 'gym4.jpg', phone: '۰۲۵۱۶۶۶۶۶۶۶', address: 'تهران پارس فلکه سوم تهرانپارس ضلع جنوب بیمارستان کوی پلاک ۷ طبقه دوم جنوبی' },
         { name: 'زورخانه پهلوان بیژن مرتضوی', picUrl: 'gym5.jpg', phone: '۰۲۵۱۶۶۶۶۶۶۶', address: 'تهران پارس فلکه سوم تهرانپارس ضلع جنوب ی' },
      ],
   }),
   methods: {
      ...mapActions({
         searchGymAM: 'customer/getGymByName',
         getGymsOfCustomerAM: 'customer/getGymsOfCustomer',
      }),
      toggleState() {
         this.searchState = !this.searchState
         this.searchText = ''
      },
      navigateToGymProfile() {
         this.$router.push('/cgymprofile')
      },
      searchClicked() {
         this.search(this.searchText)
      },
      async search(gymName: string) {
         const result = await this.searchGymAM(gymName)
         console.log(result[0].name)

         this.searchResult = result

      }
   },
   async mounted() {
      console.log(this.userId, this.customerId)
      this.gymsOfCustomer = await this.getGymsOfCustomerAM(this.customerId)
      this.hasLoaded = true
   },
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
         customerId: (state: any) => state.customer.customerId,
      }),
   }
})
</script>
<style lang="scss" scoped>
.q-inner-loading {
   background-color: rgba(0, 0, 0, 0);
}
</style>