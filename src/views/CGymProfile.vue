<template>
   <q-page class="q-pa-lg">
      <div class="row">
         <div class="col-12 flex justify-between">
            <p class="col-12 q-my-sm">نام: {{ information.name }}</p>
            <q-btn @click="navigateToGymsPage">
               <q-icon name="arrow_back" />
            </q-btn>
         </div>
         <p class="col-12 q-my-sm">آدرس: {{ information.address }}</p>
         <p class="col-12 q-my-sm">شماره تلفن: {{ information.phone }}</p>
         <p class="col-12 q-my-sm">کد ثبت باشگاه: {{ information.gym_reg_code }}</p>
         <q-btn @click="enrollClicked" class="q-my-sm">ثبت‌نام</q-btn>
      </div>

   </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
export default defineComponent({
   data: () => ({
      information :{
         name: 'زورخانه',
         address: 'ایران - تهران',
         phone: '02138566495',
         gym_reg_code: '15654',
      }
   }),
   methods: {
      enrollClicked() {
         
      },
      navigateToGymsPage() {
         this.$router.push('/cgyms')
      }
   }
})
</script>


<style></style>