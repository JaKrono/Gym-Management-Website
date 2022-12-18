<template>
   <q-scroll-area>
      <q-page class="col-12">
         <q-inner-loading :showing="!hasLoaded" color="primary" />
         <div class="col-12 content-center col-12 q-px-lg" v-if="hasLoaded">
            <div class="col-12 q-py-lg">
               <div class="flex col-12 justify-center" :style="[$q.screen.lt.sm ? {'justify-content': 'center'} : {'justify-content': 'initial'} ]">
                  <!-- TODO_asghar: add image upload button in editing mode -->
                  <q-img :src="img" class="image" width="200px" height="200px" :ratio="10/10" fit="cover">
                     <div class="flex justify-center absolute-bottom text-center" style="height: 40px; padding: 0px !important">
                        <q-btn class="bg-red"></q-btn>
                     </div>
                  </q-img>
                  <!-- <q-avatar size="16em" class="text-white" icon="person" color="secondary"></q-avatar> -->
               </div>
               <!-- TODO_asghar: Change placeholder color of q-inputs -->
               <q-form greedy class="col-12" @reset="onReset" @submit.prevent="submitEdit" ref="profileForm">
                  <div class="row col-12 q-mt-lg">
                     <div class="col col-12">
                        <div class="row col-12 q-col-gutter-md">
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">نام کاربری</p>
                              <q-input class="" filled readonly rounded v-model="copiedProfileDetail.user.username">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">ایمیل</p>
                              <q-input class="" filled readonly rounded v-model="copiedProfileDetail.user.email">
                              </q-input>
                           </div>
                           <div class=" col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">نام</p>
                              <q-input :readonly="!editing" v-model="copiedProfileDetail.user.first_name" outlined
                                 color="primary" :rules="[rules.name]">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">نام خانوادگی</p>
                              <q-input class="" :readonly="!editing" v-model="copiedProfileDetail.user.last_name"
                                 lazy-rules outlined :rules="[rules.name]">
                              </q-input>
                           </div>
                           <div class="col-xs-12 col-md-6">
                              <p class="q-ma-sm text-weight-bold">شماره تلفن</p>
                              <q-input class="" :readonly="!editing" v-model="copiedProfileDetail.phone" outlined
                                 :rules="[rules.emptyPhoneNumber]">
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
      img: 'data:image/webp;base64,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',
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
         },
         {
            label: '',
            value: ''
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
         this.hasLoaded = false
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
            this.copiedProfileDetail = JSON.parse(JSON.stringify(this.profileDetail))
            this.editing = !this.editing
            this.hasLoaded = true
         }
         this.discardEdit()
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
<style scoped lang="scss">
.q-field :deep(.q-field__native) {
   justify-content: center;
}
.image {
   border-radius: 500px;
   border-style: solid;
   border-color: $primary;
   border-width: 5px;
}
</style>