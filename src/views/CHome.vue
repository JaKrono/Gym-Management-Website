<template>
   <q-page>
      <div class="row content-center q-px-lg">
         <div class="row col-12 q-pt-lg no-wrap verflow-hidden"> <!-- Hides the extra content in case of long username or emails. -->
            <q-avatar size="6em" class="text-white" icon="person" color="secondary"></q-avatar>
            <div class="column q-ml-md items-start justify-end" style="max-width: 300px;">
               <p class="q-mb-sm regular-title font-size-up-3" style="font-weight: bold">{{ this.name || this.username }}</p>
               <p class="q-mb-sm">{{ this.phoneNumber || this.email }}</p>
            </div>
         </div>
         <div class="row col-12 q-my-lg">

            <div class="row col-12 justify-xs-center justify-sm-between items-center q-mb-md">
               <p class="col-sm-auto font-size-up-4 bold-text">باشگاه‌های ثبت نام شده</p> <!-- Can also be favorite or recently added clubs. -->
               <q-btn class="col-12 col-sm-auto q-px-sm q-mt-sm q-mt-sm-none" color="primary">مدیریت باشگاه‌ها</q-btn>
            </div>

            <div class="row col-12">
               <div class="col">
                  <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                     <div class="col-xs-12 col-sm-6 col-lg-4 col-xl-3" v-for="club in clubs">
                        <q-card bordered>
                           <q-card-section class="q-pa-none">

                              <q-card-section class="q-pa-none">
                                 <q-img :src="club.img" alt="Gym Image" :ratio="$q.screen.lt.sm ? 3/1:16/9" fit="cover">
                                    <template v-slot:error>
                                       <q-img class="q-pa-lg" src="dumbell.svg" position="50% 103%" :ratio="16/9" :img-style="{ filter: 'blur(4px)' }"></q-img>
                                       <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر</p>
                                    </template>
                                 </q-img>
                              </q-card-section>
                              <!-- HEIGHT -->
                              <q-card-section class="q-pa-xs" style="height: 80px">
                                 <p class="q-ma-sm font-size-up-1 bold-text">{{ club.name }}</p>
                              </q-card-section>

                              <q-card-actions class="flex" align="right">
                                 <q-btn color="secondary">
                                    <p class="font-size-down-1">مشاهده اطلاعات</p>
                                 </q-btn>
                                 <q-btn color="secondary">
                                    <p class="font-size-down-1">مشاهده اطلاعات</p>
                                 </q-btn>
                              </q-card-actions>

                           </q-card-section>
                        </q-card>
                     </div>
                  </div>
               </div>
            </div>

         </div>
      </div>
   </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
   data: () => ({
      // name: 'بیژن مرتضوی',
      // phoneNumber: '09394057270',
      username: 'bizhan123',
      email: 'bizhan123@iust.ac.ir',
      clubs:  [{name: 'باشگاه دانشگاه علم و صنعت ایران شبعه آقایان علی‌الخصوص بیژن مرتضوی', img: 'gym1.jpg' },
               {name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym5.jpg' },
               {name: 'زورخانه قهرمان بیژن مرتضوی', img: 'gym2.jpg' },
               {name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym3.jpg' },
               {name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym4.jpg' },
               {name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym5.jpg' } ]
   })
})
</script>
<style>

</style>