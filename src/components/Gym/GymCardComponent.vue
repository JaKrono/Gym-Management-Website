<template>
   <q-card bordered>
      <q-card bordered>
         <q-card-section class="q-pa-none">

            <q-card-section class="q-pa-none">
               <q-img :src="model.picUrl" alt="Gym Image" :ratio="$q.screen.lt.sm ? 3 / 1 : 16 / 9" fit="cover">
                  <template v-slot:error>
                     <q-img class="q-pa-lg" alt="Dumbell Image" src="dumbell.svg" position="50% 103%" :ratio="16 / 9"
                        :img-style="{ filter: 'blur(4px)' }"></q-img>
                     <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر
                     </p>
                  </template>
               </q-img>
            </q-card-section>
            <!-- HEIGHT -->
            <q-card-section class="row q-pa-sm" style="height: 80px">
               <p class="col-12 font-size-up-1 text-weight-bold ellipsis-2-lines">{{ model.name }}</p>
            </q-card-section>

            <q-card-actions class="flex" align="right">
               <q-btn @click="viewGymDetailClicked" color="secondary">
                  <p class="font-size-down-1">مشاهده اطلاعات</p>
               </q-btn>
            </q-card-actions>

         </q-card-section>
      </q-card>
   </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
   data: () => ({
   }),
   props: [ 'model' ],
   methods: {
      viewGymDetailClicked() {
         // this.$emit('viewGymProfile', )
      }
   },
   computed: {
   }
})
</script>
<style>
</style>