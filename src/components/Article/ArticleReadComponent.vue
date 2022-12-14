<template>
   <q-scroll-area :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle">
      <q-page class="row q-pa-lg">
         <div class="column col-xs-12 offset-xs-0 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
            <div class="flex justify-between q-my-sm q-mb-lg-md">
               <p class="text-weight-bold font-size-up-5">{{ model.title }}</p>
               <q-btn color="primary">ویرایش</q-btn>
            </div>
            <div class="flex no-wrap items-center">
               <q-icon name="timer" size="1.3em"></q-icon>
               <p class="q-ml-xs" style="margin-top: 2px">{{ model.readDuration }}
                  دقیقه</p>
            </div>
            <div @click="viewWriterClicked()" class="flex no-wrap items-center cursor-pointer">
               <q-icon name="fa-solid fa-user-pen"></q-icon>
               <p class="q-ml-sm">{{ model.writerName }}</p>
            </div>
            <div class="flex no-wrap items-center q-pt-xs">
               <q-icon name="calendar_month" class="font-size-up-5" style="margin: 0px -2px 2px 0px"></q-icon>
               <p class="q-ml-xs">{{ model.date }}</p>
            </div>
            <div class="flex items-center q-py-xs q-mb-sm q-mb-lg-md q-mb-xl-lg">
               <div v-for="item in categoryList" class="col-xs-12 q-mr-xs">
                  <q-badge class="q-pa-sm" rounded :label="item.title" :color="item.color"></q-badge>
               </div>
            </div>
            <p class="q-mb-md q-mb-md-md q-mb-lg-lg">{{ model.description }}</p>
            <q-img :src="model.picUrl || '?'" alt="Article Image" :ratio="16 / 9" fit="cover" class="rounded-borders q-mb-md q-mb-md-md q-mb-xl-lg">
               <template v-slot:error>
                  <q-img class="q-pa-lg" alt="Dumbell Image" src="dumbell.svg" position="50% 103%" :ratio="16 / 9"
                     :img-style="{ filter: 'blur(4px)' }"></q-img>
                  <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر</p>
               </template>
            </q-img>
            <p>{{ model.articleContent }}</p>
         </div>

      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { CategoryList } from '@/common/category-list';
import type { CategoryModel } from '@/common/interfaces';
import { getCssVar } from 'quasar';
import { defineComponent } from 'vue';
export default defineComponent({
   props: ['model', 'commaSperatedCategories'],
   methods: {
      viewWriterClicked() {

      }
   },
   data: () => ({
      pageScrollThumbStyle: {
         width: '4px',
         left: '1.5px',
         borderRadius: '5px',
         backgroundColor: getCssVar('primary'),
         opacity: 1
      },
      pageScrollBarStyle: {
         width: '7px',
         backgroundColor: getCssVar('primary'),
         opacity: 0.4,
      }
   }),
   computed: {
      categoryList() {
         let result: CategoryModel[] = []
         for (var index of this.commaSperatedCategories.split(',')) {
            result.push(CategoryList[parseInt(index) - 1])
         }
         return result
      }
   }
})
</script>
<style lang="scss">

</style>