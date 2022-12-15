<template>
   <q-card bordered>
      <q-card bordered>
         <q-card-section class="q-pa-none">

            <q-card-section class="q-px-sm q-pt-sm q-pb-none">
               <q-img class="rounded-borders" :src="model.picUrl" alt="Gym Image" :ratio="$q.screen.lt.sm ? 3 / 1 : 16 / 9" fit="cover">
                  <template v-slot:error>
                     <q-img class="q-pa-lg" alt="Dumbell Image" src="dumbell.svg" position="50% 103%" :ratio="16 / 9"
                        :img-style="{ filter: 'blur(4px)' }"></q-img>
                     <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر
                     </p>
                  </template>
               </q-img>
            </q-card-section>
            
            <q-card-section class="row q-pa-sm">
               <p class="col-12 font-size-up-1 text-weight-bold ellipsis-2-lines" style="height: 42px">{{ model.name }}</p>
               <div class="flex no-wrap col-12 q-pt-sm" v-if="address">
                  <q-icon name="place" class="font-size-up-4" style="margin: 0px -4px 0px 4px"></q-icon>
                  <p class="ellipsis-2-lines" style="height: 42px">{{ model.address }}</p>
               </div>
               <div class="flex no-wrap col-12 q-pt-sm" v-if="phoneNumber">
                  <q-icon name="call" class="font-size-up-3" style="margin: 0px -2px 0px 4px"></q-icon>
                  <p class="ellipsis-1" style="height: 21px">{{ model.phone }}</p>
               </div>
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
import type { PropType } from 'vue';
import type { GymModel } from '@/common/interfaces';
export default defineComponent({
   data: () => ({
   }),
   props: {
      model: Object as PropType<GymModel>,
      address: Boolean,
      phoneNumber: Boolean
   },
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