<template>
   <q-page>
      <div class="row content-center q-px-lg">
         <div class="row q-py-lg">
            <div class="col-12">
               <!-- TODO_asghar: add image upload button in editing mode -->
               <q-avatar size="12em" class="text-white" icon="person" color="secondary"></q-avatar>
            </div>
            <!-- TODO_asghar: Change placeholder color of q-inputs -->
            <q-form class="col-12">
               <div class="row col-12 q-mt-lg">
                  <div class="col col-12">
                     <div class="row col-12 q-col-gutter-md">
                        <div class="col-xs-12 col-md-6 col-md-4">
                           <p class="q-ma-sm text-weight-bold">نام کاربری</p>
                           <q-input class="" filled readonly rounded :placeholder="profileDetail.username">
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-md-6 col-md-4 bordered">
                           <p class="q-ma-sm text-weight-bold">ایمیل</p>
                           <q-input class="" filled readonly rounded :placeholder="profileDetail.email">
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-md-6 col-md-4 bordered">
                           <p class="q-ma-sm text-weight-bold">نام</p>
                           <q-input class="" :rounded="editing" :readonly="!editing" v-model="name" outlined
                              :placeholder="profileDetail.name" color="primary">
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-md-6 col-md-4 bordered">
                           <p class="q-ma-sm text-weight-bold">نام خانوادگی</p>
                           <q-input class="" :rounded="editing" :readonly="!editing" v-model="lastname" outlined
                              :placeholder="profileDetail.lastname">
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-md-6 col-md-4 bordered">
                           <p class="q-ma-sm text-weight-bold">شماره تلفن</p>
                           <q-input class="" :rounded="editing" :readonly="!editing" v-model="phoneNumber" outlined
                              :placeholder="profileDetail.phoneNumber">
                           </q-input>
                        </div>
                        <div class="col-xs-12 col-md-6 col-md-4 bordered">
                           <p class="q-ma-sm text-weight-bold">جنسیت</p>
                           <q-select class="row" transition-show="jump-up" transition-hide="jump-up" behavior="menu" outlined
                              :rounded="editing" :readonly="!editing" v-model="sex" :options="sexOptions"
                              input-style="justify-content: center">
                              <!-- TODO_asghar: style this slot -->
                              <template v-slot:selected>{{ this.sex.label || profileDetail.sex }}</template>
                           </q-select>
                        </div>
                     </div>
                     <div class="row justify-end">
                        <q-btn @click="editClicked" class="col-xs-12 col-md-3 q-my-lg" color="primary" v-if="!editing">
                           ویرایش اطلاعات شخصی
                        </q-btn>

                        <q-btn @click="saveClicked" class="col-xs-12 col-md-2 q-my-lg" color="primary" v-if="editing">
                           ذخیره
                        </q-btn>
                        <q-btn @click="discardClicked()" class="col-xs-12 col-md-2 q-ml-md-md q-my-md-lg"
                           color="secondary" v-if="editing">
                           لغو
                        </q-btn>
                     </div>
                  </div>
               </div>
            </q-form>

         </div>
      </div>
   </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { CustomerProfileModel } from '@/common/interfaces'
import { mapActions } from 'vuex'
export default defineComponent({
   data: () => ({
      editing: false,
      name: '',
      lastname: '',
      phoneNumber: '',
      sex: '',
      profileDetail: {
         username: 'Bizhan123',
         email: 'bizhan123@iust.ac.ir',
         name: 'بیژن',
         lastname: 'مرتضوی',
         phoneNumber: '09394057270',
         sex: 'آقا'
      },
      sexOptions: [
         {
            label: 'آقا',
            value: 'M'
         },
         {
            label: 'خانم',
            value: 'F'
         },
         {
            label: 'دیگر',
            value: 'O'
         }
      ]
   }),
   mounted(){
      
   },
   methods: {
      ...mapActions({
         submitForm: 'customer/saveCustomerProfile',
         getForm: 'customer/getCustomerProfile'
      }),
      // TODO_asghar: set delay for editClicked and discardClicked
      editClicked(): void {
         this.editing = !this.editing
      },
      saveClicked() {
         const model: CustomerProfileModel = { username: this.profileDetail.username, email: this.profileDetail.email, name: this.name, lastname: this.lastname, phoneNumber: this.phoneNumber, sex: this.sex }
         this.submitProfileForm(model)
      },
      discardClicked() {
         this.$data.name = ''
         this.$data.lastname = ''
         this.$data.phoneNumber = ''
         this.$data.sex = ''
         this.editing = !this.editing
      },
      async submitProfileForm(model: CustomerProfileModel) {
         const result = await this.submitForm(model)
         if (result) {

         }
      },
      async getProfileForm() {
         const result = await this.getForm()
         if (result) {
            
         }
      }
   }
})
</script>
<style>

</style>