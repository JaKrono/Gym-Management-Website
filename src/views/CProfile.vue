<template>
   <q-scroll-area>
      <q-page class="col-12">
         <q-inner-loading :showing="!hasLoaded" color="primary" />
         <div class="col-12 content-center col-12 q-px-lg" v-if="hasLoaded">
            <div class="col-12 q-py-lg">
               <div class="col-12">
                  <!-- TODO_asghar: add image upload button in editing mode -->
                  <q-avatar size="12em" class="text-white" icon="person" color="secondary"></q-avatar>
               </div>
               <!-- TODO_asghar: Change placeholder color of q-inputs -->
               <q-form greedy class="col-12" @reset="onReset" @submit.prevent="submitEdit" ref="profileForm">
                  <div class="row col-12 q-mt-lg">
                     <div class="col col-12">
                        <div class="row col-12 q-col-gutter-md">
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">نام کاربری</p>
                              <q-input class="" filled readonly rounded v-model="copiedProfileDetail.user.username"
                                 :placeholder="profileDetail.user.username">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">ایمیل</p>
                              <q-input class="" filled readonly rounded v-model="copiedProfileDetail.user.email"
                                 :placeholder="profileDetail.user.email">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">نام</p>
                              <q-input :readonly="!editing" v-model="copiedProfileDetail.user.first_name"
                                 outlined :placeholder="profileDetail.user.first_name" color="primary" :rules="[ rules.name ]">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">نام خانوادگی</p>
                              <q-input class="" :readonly="!editing" v-model="copiedProfileDetail.user.last_name" lazy-rules
                                 outlined :placeholder="profileDetail.user.last_name" :rules="[ rules.name ]">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">شماره تلفن</p>
                              <q-input class="" :readonly="!editing" v-model="copiedProfileDetail.phone" outlined
                                 :placeholder="profileDetail.phone" :rules="[ rules.phoneNumber ]">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">جنسیت</p>
                              <!-- TODO_asghar: this way of selecting is probably not the best option performance-wise -->
                              <q-select class="row" transition-show="jump-up" transition-hide="jump-up" behavior="menu"
                                 outlined :readonly="!editing" :hide-dropdown-icon="!editing"
                                 v-model="copiedProfileDetail.user.gender" options-selected-class="bg-grey-3"
                                 map-options emit-value :options="sexOptions" options-value="value"
                                 option-label="label">
                              </q-select>
                           </div>
                        </div>
                        <div class="row q-my-lg justify-end">
                           <q-btn @click="editClicked" class="col-xs-12 col-md-shrink q-px-md-lg" color="primary"
                              v-if="!editing">
                              <div class="flex no-wrap">
                                 <q-icon class="q-mr-sm" name="edit"></q-icon>
                                 <p>ویرایش اطلاعات شخصی</p>
                              </div>
                           </q-btn>
                           <div class="row col-xs-12 col-md-4" v-if="editing">
                              <q-btn type="submit" class="col-12 q-mb-md q-mb-sm-none q-mr-sm-sm col-sm-grow"
                                 color="primary">
                                 ذخیره
                              </q-btn>
                              <!-- <q-space></q-space> -->
                              <q-btn @click="discardEdit" class="col-12 col-sm-grow q-ml-sm-sm" color="secondary">
                                 لغو
                              </q-btn>
                           </div>
                        </div>
                     </div>
                  </div>
               </q-form>

            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { CustomerProfileModel, UpdateCustomerProfileModel } from '@/common/interfaces'
import { mapActions, mapState } from 'vuex'
export default defineComponent({
   data: () => ({
      hasLoaded: false,
      editing: false,
      profileDetail: {} as CustomerProfileModel,
      copiedProfileDetail: {} as CustomerProfileModel,
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
   methods: {
      ...mapActions({
         submitProfileAM: 'customer/updateCustomerProfile',
         getProfileAM: 'customer/getCustomerProfile'
      }),
      // TODO_asghar: set delay for editClicked and descardEdit
      editClicked(): void {
         this.editing = !this.editing
      },
      submitEdit() {
         let model: UpdateCustomerProfileModel = {
            user_id: this.userId,
            customerProfileModel: this.copiedProfileDetail
         }
         this.submitProfile(model)
      },
      discardEdit() {
         this.copiedProfileDetail = JSON.parse(JSON.stringify(this.profileDetail))
         this.$refs.profileForm.resetValidation()
         this.editing = !this.editing
      },
      async submitProfile(model: UpdateCustomerProfileModel) {
         const result = await this.submitProfileAM(model)
         if (result) { // Can probably be a seperate function
            this.hasLoaded = false
            this.profileDetail = await this.getProfileAM(this.userId)
            this.hasLoaded = true
            this.discardEdit()
         } else {
            this.discardEdit()
         }
      }
   },
   async mounted() {
      this.profileDetail = await this.getProfileAM(this.userId)
      this.copiedProfileDetail = JSON.parse(JSON.stringify(this.profileDetail))
      this.hasLoaded = true
   },
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
         user: (state: any) => state.user
      })
   }
})
</script>
<style>

</style>