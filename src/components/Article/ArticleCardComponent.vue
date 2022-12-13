<template>
   <q-card bordered>
      <q-card-section>
         <q-img :src="model.picUrl || '?' " alt="Gym Image" :ratio="$q.screen.lt.sm ? 3 / 1 : 16 / 9" fit="cover"
            class="rounded-borders">
            <template v-slot:error>
               <q-img class="q-pa-lg" alt="Dumbell Image" src="dumbell.svg" position="50% 103%" :ratio="16 / 9"
                  :img-style="{ filter: 'blur(4px)' }"></q-img>
               <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر</p>
            </template>
         </q-img>
      </q-card-section>
      <q-card-section class="q-pt-none">
         <div class="row q-mb-md justify-between content-between items-center">
            <div class="flex col-xs-12 col-sm-auto no-wrap q-mr-xs items-center">
               <div v-for="item in categoryList" class="col-xs-12 q-mr-xs">
                  <q-badge class="q-pa-sm" rounded :label="item[2]" :color="String(item[1])"></q-badge>
               </div>
            </div>
            <div class="flex col-xs-12 col-sm-auto q-mt-xs-sm q-mt-sm-none no-wrap items-center">
               <q-icon name="calendar_month" class="font-size-up-5" color="secondary" style="margin-bottom: 3px"></q-icon>
               <p class="q-ml-xs text-secondary ellipsis-1 font-size-down-1" color="secondary">{{ model.date }}</p>
            </div>
         </div>
         <div style="height: 95px">
            <p class="text-weight-bold font-size-up-3 ellipsis-1 q-mb-xs">{{ model.title }}</p>
            <p class="text-secondary ellipsis-3-lines">{{ model.description }}</p>
         </div>
      </q-card-section>
      <q-card-section class="q-pt-none items-center flex no-wrap justify-between">
         <div class="flex no-wrap items-center">
            <q-icon name="timer" color="secondary" size="1.3em"></q-icon>
            <p class="q-mx-xs text-secondary ellipsis font-size-down-1" style="margin-top: 2px">{{ model.readDuration }} دقیقه</p>
         </div>
         <div @click="viewWriterClicked()" class="flex no-wrap items-center q-ml-lg cursor-pointer">
            <q-icon name="fa-solid fa-user-pen" color="secondary"></q-icon>
            <p class="q-ml-sm text-secondary ellipsis-1 font-size-down-1">{{ model.writerName }}</p>
         </div>
      </q-card-section>
      <q-card-actions class="q-px-md q-pt-none q-pb-md justify-end">
         <q-btn @click="viewArticleClicked()" color="secondary">مشاهده مقاله</q-btn>
      </q-card-actions>
   </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
   props: ['model', 'categoryList'],
   methods: {
      viewArticleClicked() {

      },
      viewWriterClicked() {

      }
   }
})
</script>
<style lang="scss"></style>