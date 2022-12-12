<template>
   <q-page class="q-pa-lg">
      <p class="q-mb-md text-weight-bold font-size-up-4">مقالات</p>
      <div class="row col-12 q-mb-md">
         <q-scroll-area class="row" :thumb-style="thumbStyle" :bar-style="barStyle" style="height: 46px; width: 100%;">
            <div class="row no-wrap" style="width: 100%">
               <div v-for="c in categories" class="col-grow">
                  <q-btn 
                     @click="categoryClicked(Number(c[0]))" 
                     :color="getButtonColor(Number(c[0]))" 
                     square 
                     class="ellipsis bottom-border-black" 
                     style="width: 100%">
                     {{ c[2] }}
                  </q-btn>
               </div>
            </div>
         </q-scroll-area>
         
         <!-- <q-btn-group class="col-12 bottom-border" spread flat>
            <q-btn @click="clicked0" :color="selectedCategory === 0 ? categories[0][0] : 'black'"
               :flat="selectedCategory !== 0" rounded>{{ categories[0][1] }}</q-btn>
            <q-btn @click="clicked1" :color="selectedCategory === 1 ? categories[1][0] : 'black'"
               :flat="selectedCategory !== 1" rounded>{{ categories[1][1] }}</q-btn>
            <q-btn @click="clicked2" :color="selectedCategory === 2 ? categories[2][0] : 'black'"
               :flat="selectedCategory !== 2" rounded>{{ categories[2][1] }}</q-btn>
            <q-btn @click="clicked3" :color="selectedCategory === 3 ? categories[3][0] : 'black'"
               :flat="selectedCategory !== 3" rounded>{{ categories[3][1] }}</q-btn>
            <q-btn @click="clicked4" :color="selectedCategory === 4 ? categories[4][0] : 'black'"
               :flat="selectedCategory !== 4" rounded>{{ categories[4][1] }}</q-btn>
            <q-btn @click="clicked5" :color="selectedCategory === 5 ? categories[5][0] : 'black'"
               :flat="selectedCategory !== 5" rounded>شثشمبکشasdma nfmjnfajsnassfnfajsfn jsa
               nfjasnfalksfnljkئمشکئک</q-btn>
         </q-btn-group> -->
      </div>
      <div class="row col-12">
         <div class="col">
            <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
               <div class="col-xs-12 col-sm-6 col-lg-4 col-xs-3">
                  <q-card bordered>
                     <q-card-section>
                        <q-img src="creatine.jpg" alt="Gym Image" :ratio="$q.screen.lt.sm ? 3 / 1 : 16 / 9" fit="cover"
                           class="rounded-borders"></q-img>
                     </q-card-section>
                     <q-card-section class="q-pt-none">
                        <div class="flex no-wrap q-mb-md items-center">
                           <q-badge class="q-pa-sm" rounded :color="String(categories[1][1])">{{ categories[1][2] }}</q-badge>
                           <!-- <p class="text-secondary font-size-down-1">مکمل‌ها</p> -->
                           <q-separator class="q-mx-sm" vertical color="secondary"></q-separator>
                           <q-icon name="calendar_month" class="font-size-up-5" color="secondary"></q-icon>
                           <p class="q-ml-xs text-secondary font-size-down-1" color="secondary">۲۳ فروردین ۱۴۰۱</p>
                        </div>
                        <p class="text-weight-bold font-size-up-3 ellipsis-2-lines q-mb-xs">کراتین چیست؟</p>
                        <p class="text-secondary ellipsis-3-lines">کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت
                           می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از
                           این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار
                           متداول است.</p>
                     </q-card-section>
                     <q-card-section class="q-pt-none items-center flex justify-between">
                        <div class="flex no-wrap items-center">
                           <q-icon name="timer" color="secondary" size="1.3em"
                              ></q-icon>
                           <p class="q-mx-xs text-secondary ellipsis font-size-down-1"
                              style="margin-top: 2px">۵ دقیقه</p>
                        </div>
                        <div class="flex no-wrap items-center">
                           <q-icon name="fa-solid fa-user-pen" color="secondary"></q-icon>
                           <p class="q-ml-sm text-secondary ellipsis font-size-down-1">بیژن مرتضوی‌زاده اصل</p>
                        </div>
                     </q-card-section>
                     <q-card-actions class="q-px-md q-py-nne q-pb-md justify-end">
                        <q-btn color="secondary">مشاهده مقاله</q-btn>
                     </q-card-actions>
                  </q-card>
               </div>
               <div class="col-xs-12 col-sm-6 col-lg-4 col-xs-3">
                  <q-card bordered>
                     <q-card-section>
                        <q-img src="gym4.jpg" alt="Gym Image" :ratio="$q.screen.lt.sm ? 3 / 1 : 16 / 9" fit="cover"
                           class="rounded-borders"></q-img>
                     </q-card-section>
                     <q-card-section class="q-pt-none">
                        <div class="flex no-wrap q-mb-md items-center">
                           <q-badge class="q-pa-sm" rounded :color="String(categories[1][1])">{{ categories[1][2] }}</q-badge>
                           <!-- <p class="text-secondary font-size-down-1">مکمل‌ها</p> -->
                           <q-separator class="q-mx-sm" vertical color="secondary"></q-separator>
                           <q-icon name="calendar_month" class="font-size-up-5" color="secondary"></q-icon>
                           <p class="q-ml-xs text-secondary font-size-down-1" color="secondary">۲۳ فروردین ۱۴۰۱</p>
                        </div>
                        <p class="text-weight-bold font-size-up-3 ellipsis-2-lines q-mb-xs">کراتین چیست؟</p>
                        <p class="text-secondary ellipsis-3-lines">کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت
                           می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از
                           این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار
                           متداول است.</p>
                     </q-card-section>
                     <q-card-section class="q-pt-none items-center flex justify-between">
                        <div class="flex no-wrap items-center">
                           <q-icon name="timer" color="secondary" size="1.3em"
                              ></q-icon>
                           <p class="q-mx-xs text-secondary ellipsis font-size-down-1"
                              style="margin-top: 2px">۵ دقیقه</p>
                        </div>
                        <div class="flex no-wrap items-center">
                           <q-icon name="fa-solid fa-user-pen" color="secondary"></q-icon>
                           <p class="q-ml-sm text-secondary ellipsis font-size-down-1">بیژن مرتضوی‌زاده اصل</p>
                        </div>
                     </q-card-section>
                     <q-card-actions class="q-px-md q-py-nne q-pb-md justify-end">
                        <q-btn color="secondary">مشاهده مقاله</q-btn>
                     </q-card-actions>
                  </q-card>
               </div>
            </div>
         </div>
      </div>
   </q-page>
</template>

<script lang="ts">
import { categories } from '@/common/enums';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { getCssVar } from 'quasar';
export default defineComponent({
   data: () => ({
      categories: [
         [0, 'red-10', 'همه دسته‌ها'], [1, 'indigo-10', 'مکمل‌ها'], [2, 'teal-10', 'رژیم غذایی'],
         [3, 'brown-10', 'تمرین‌های ورزشی'], [4, 'brown-4', 'دسته‌ای از مقالات'], [5, 'green-10', 'دسته‌ای دیگر از مقالات مربوط به بدنسازی'],
      ],
      selectedCategory: 0,
      thumbStyle: {
         height: '4px',
         bottom: '3px',
         borderRadius: '5px',
         backgroundColor: getCssVar('primary'),
         width: '50px',
         opacity: 1
      },
      barStyle: {
         opacity: 0
      }
   }),
   methods: {
      categoryClicked(categoryId: number) {
         this.selectedCategory = categoryId
      },
      getButtonColor(categoryId: number) {
         if (this.selectedCategory == categoryId)
            return this.categories[categoryId][1]
      }
   }
})
</script>


<style scoped lang="scss">
.bottom-border-black {
   border-bottom-style: solid;
   border-color: $dark;
   border-bottom-width: 3px;
   border-bottom-left-radius: 0px;
   border-bottom-right-radius: 0px;
}
</style>