<template>
   <q-scroll-area>
      <q-page class="col-12">
         <q-inner-loading :showing="!hasLoaded" color="primary" />
         <div class="col-12 content-center col-12 q-px-lg" v-if="hasLoaded">
            <div class="col-12 q-py-lg">
               <div class="flex col-12 justify-center"
                  :style="[$q.screen.lt.md ? { 'justify-content': 'center' } : { 'justify-content': 'initial' }]">
                  <q-img v-if="hasImage" :src="copiedProfileDetail?.user.picUrl" spinner-color="white"
                     class="profile-image" :ratio="1 / 1" fit="cover">
                     <template v-slot:default>
                        <div v-if="editing" class="absolute-bottom center q-mb-lg"
                           style="padding: 0px; height: 30px; background-color: unset;">
                           <div class="flex q-gutter-x-xs justify-center q-mb-sm items-center">
                              <div>
                                 <q-btn @click="deleteImage" class="profile-image-button" flat icon="delete"></q-btn>
                              </div>
                              <div>
                                 <q-btn @click="uploadImage" class="profile-image-button" flat>
                                    <q-icon name="upload" size="1.9em"></q-icon>
                                 </q-btn>
                              </div>
                           </div>
                        </div>
                     </template>
                  </q-img>
                  <q-img v-else spinner-color="white" class="profile-image" :ratio="1 / 1" fit="cover">
                     <template v-slot:default>
                        <div class="flex flex-center full-width full-height" style="background-color: unset">
                           <q-icon name="person" size="9em"></q-icon>
                           <div v-if="editing" class="absolute-bottom center q-mb-lg"
                              style="padding: 0px; height: 30px; background-color: unset;">
                              <div class="flex q-gutter-x-xs justify-center q-mb-sm items-center">
                                 <div>
                                    <q-btn @click="uploadImage" class="profile-image-button" flat>
                                       <q-icon name="upload" size="1.9em"></q-icon>
                                    </q-btn>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </template>
                  </q-img>
               </div>
               {{ hasImage }}
               <!-- TODO_asghar: Change placeholder color of q-inputs -->
               <q-form greedy class="col-12" @submit.prevent="submitEdit" ref="profileForm">
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
      image: '',
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
      deleteImage() {
         this.copiedProfileDetail.user.picUrl = ''
      },
      uploadImage() {
         console.log("ASDASD")
         const element = document.createElement("input")
         element.type = 'file'
         element.accept = 'image/*'
         element.click()
         element.onchange = async (event) => {
            this.image = ((event.target) as any).files[0] as any
            const reader = new FileReader()
            reader.readAsDataURL(this.image as unknown as Blob)
            reader.onload = () => (this.copiedProfileDetail.user.picUrl = reader.result as string)
         }
      },
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
         ;(this.$refs['profileForm'] as any).resetValidation()
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
      }),
      hasImage() {
         return this.copiedProfileDetail.user.picUrl.length !== 0
      }
   }
})
</script>
<style scoped lang="scss">
.q-field :deep(.q-field__native) {
   justify-content: center;
}

.profile-image {
   border-radius: 50px;
   border-style: solid;
   border-color: $primary;
   background-color: $primary;
   border-radius: 50%;
   width: 200px;
   height: 200px;
}

.profile-image-button {
   height: 40px;
   width: 40px;
   background-color: rgba(0, 0, 0, 0.4);
}
</style>