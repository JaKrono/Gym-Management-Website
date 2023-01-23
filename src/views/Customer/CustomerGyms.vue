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

      <q-page class="col-12" v-else>
         <div class="row col-12 content-center q-px-lg">
            <div class="row col-12 q-my-lg">

               <div class="row col-12 justify-xs-center justify-sm-between items-center q-mb-sm">
                  <!-- Can also be favorite or recently added clubs. -->
                  <p class="col-sm-auto font-size-up-4 text-weight-bold">جستجوی باشگاه‌ها</p>
                  <q-btn @click="toggleState" class="col-12 col-sm-auto q-px-sm q-mt-sm q-mt-sm-none"
                     color="secondary">مشاهده باشگاه‌های ثبت‌نام شده</q-btn>
               </div>
               <q-separator class="col-12" size="2px" />
               <q-form class="row q-mt-sm col-12 justify-between">
                  <div class="col-12 col-sm-grow col-md-9">
                     <q-input class="col-12 q-mb-sm" dense clearable outlined v-model="nameText"
                        placeholder="نام باشگاه">
                        <template v-slot:prepend>
                           <q-icon name="business" />
                        </template>
                     </q-input>
                     <q-input class="col-12 q-mb-sm" dense clearable outlined v-model="addressText"
                        placeholder="آدرس باشگاه">
                        <template v-slot:prepend>
                           <q-icon name="place" />
                        </template>
                     </q-input>
                     <div class="row justify-between items-center q-pb-sm">
                        <p class="col-12 col-sm-auto q-mr-sm q-mb-sm q-mb-sm-none text-secondary">نوع دوره</p>
                        <q-select behavior="menu" transition-show="jump-down" transition-hide="jump-up"
                           :input-style="{ backgroundColor: 'red' }" class="col-grow" clearable
                           v-model="selectedCourseCategory" outlined dense :options="courseCategoryOptions" />
                     </div>
                  </div>
                  <div class="col-12 col-sm-auto q-ml-sm-md">
                     <q-btn @click="searchClicked" class="col-12 q-px-xl q-mt-xs-sm q-mt-sm-none" style="width: 100%"
                        color="primary">جستجو</q-btn>
                  </div>
               </q-form>

               <q-inner-loading :showing="!hasLoaded" color="primary" />
               <div v-if="hasLoaded" class="row col-12">
                  <div class="col">
                     <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                        <div v-if="searchResult.length > 0" class="col-xs-12 col-sm-6 col-lg-4 col-xl-3"
                           v-for="club in searchResult">
                           <GymCardComponent :model="club"></GymCardComponent>
                        </div>
                        <p class="q-ma-sm" v-if="searchResult.length === 0 && hasSearched">موردی یافت نشد</p>
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
import { CourseList } from '@/common/category-list';
import { QIcon } from 'quasar';
export default defineComponent({
   components: {
      GymCardComponent
   },
   data: () => ({
      CourseList,
      hasSearched: false,
      hasLoaded: false,
      nameText: '',
      courseText: '',
      addressText: '',
      selectedCourseCategory: '',
      courseCategoryOptions: [{}],
      oldQuery: {} as { name: string, address: string, category: string },
      searchState: false,
      searchResult: [],
      gymsOfCustomer: [],
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
         searchGymAM: 'customer/searchGym',
         getGymsOfCustomerAM: 'customer/getGymsOfCustomer',
      }),
      toggleState() {
         this.searchState = !this.searchState
         this.nameText = ''
         this.addressText = ''
         this.courseText = ''
         this.hasLoaded = true
      },
      navigateToGymProfile() {
         this.$router.push('/cgymprofile')
      },
      searchClicked() {
         this.search()
      },
      async search() {
         let newNameText = this.nameText
         if (!this.nameText || this.nameText === '') {
            newNameText = ' '
         }
         let newAddressText = this.addressText
         if (!this.addressText || this.addressText === '') {
            newAddressText = ' '
         }
         let newCourseText = ''
         if (!this.selectedCourseCategory || !this.selectedCourseCategory.value) {
            newCourseText = ' '
         } else {
            newCourseText = this.selectedCourseCategory.value
         }
         let query = { name: newNameText, address: newAddressText, category: newCourseText }
         if (query !== this.oldQuery) {
            this.hasLoaded = false
            this.oldQuery = query
            console.log(query)
            this.searchResult = await this.searchGymAM(query)
            this.hasLoaded = true
         }
      }
   },
   async mounted() {
      this.courseCategoryOptions = CourseList.map((o) => { return { label: o.title, value: o.id, color: o.color } })
      this.oldQuery = { name: ' ', address: ' ', category: ' ' }
      console.log(this.userId, this.customerId)
      this.gymsOfCustomer = await this.getGymsOfCustomerAM(this.customerId)
      this.hasLoaded = true
   },
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
         customerId: (state: any) => state.user.role_id,
      }),
   }
})
</script>
<style lang="scss" scoped>
.q-inner-loading {
   background-color: rgba(0, 0, 0, 0);
}

.q-input :deep(.q-field__native) {
   text-align: left;
}
</style>