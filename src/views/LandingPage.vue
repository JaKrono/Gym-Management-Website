<template>
   <q-scroll-area>
      <q-page>
         <div class="row col-12 justify-center q-px-lg">
            <div class="row justify-center col-12 q-my-lg">
               <div class="row justify-center col-12">
                  <q-btn @click="loginOwner" class="q-mr-sm q-mb-sm col-12 col-sm-auto" color="secondary">ورود به عنوان صاحب
                     باشگاه</q-btn>
               </div>
               <div class="row justify-center col-12">
                  <q-btn @click="loginCoach" class="q-mr-sm q-mb-sm col-12 col-sm-auto" color="secondary">ورود به عنوان مربی</q-btn>
               </div>
               <div class="row justify-center col-12">
                  <q-btn @click="loginCustomer" class="q-mr-sm q-mb-sm col-12 col-sm-auto" color="secondary">ورود به عنوان ورزشکار</q-btn>
               </div>

            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
   components: {
   },
   data: () => ({
   }),
   methods: {
      loginOwner() {
         this.$router.push('/login?role=owner')
      },
      loginCoach() {
         this.$router.push('/login?role=coach')
      },
      loginCustomer() {
         this.$router.push('/login?role=customer')
      },
   }
})
</script>
<style>

</style>