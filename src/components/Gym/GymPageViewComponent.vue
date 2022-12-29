<template>
   <q-page class="q-pa-sm q-pa-sm-md q-pa-md-lg">
      <q-inner-loading :showing="!hasLoaded" color="primary" />
      <div v-if="hasLoaded" class="col-12 q-mb-md q-py-sm q-px-sm rounded-borders bordered">
         <q-img class="rounded-borders" rounded style="max-height: 250px" :src="gymInformation.picture" alt="Gym Image"
            fit="contain">
            <template v-slot:error>
               <q-img class="q-pa-lg" alt="Dumbell Image" src="dumbell.svg" position="50% 103%" :ratio="16 / 9"
                  :img-style="{ filter: 'blur(4px)' }"></q-img>
               <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر
               </p>
            </template>
         </q-img>
      </div>
      <div class="row rounded-borders q-pa-sm bordered" v-if="hasLoaded">
         <div class="col-12 flex justify-between">
            <p class="col-12 q-my-sm">نام: <span class="text-weight-bold">{{ gymInformation.name }}</span></p>
            <q-btn class="bg-white" @click="goBack">
               <q-icon name="arrow_back" />
            </q-btn>
         </div>
         <p class="col-12 q-my-sm">آدرس: <span class="text-weight-bold">{{ gymInformation.adress }}</span></p>
         <p class="col-12 q-my-sm">شماره تلفن: <span class="text-weight-bold">{{ gymInformation.phone }}</span></p>
         <p class="col-12 q-my-sm">کد ثبت باشگاه: <span class="text-weight-bold">{{ gymInformation.gym_reg_code
         }}</span>
         </p>
      </div>
      <div class="row rounded-borders q-pa-sm q-mt-md items-center bordered" v-if="hasLoaded && role === '0'">
         <q-btn @click="enrollClicked" class="bg-white q-my-sm">ثبت‌نام</q-btn>
      </div>
      <div class="row rounded-borders q-pa-sm q-mt-md items-center justify-between bordered"
         v-if="hasLoaded && role === '1' && !gymCardInformation.accepted">
         <p class="col-12">متن دعوت نامه:</p>
         <p class="col-12 q-my-sm text-weight-bold">{{ gymCardInformation.description }}</p>
         <q-separator width="100%" size="2px"></q-separator>
         <p>آیا پیشنهاد همکاری را می‌پذیرید؟</p>
         <q-btn @click="acceptInvitationClicked" class="bg-white q-my-sm">قبول پیشنهاد</q-btn>
      </div>
   </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
export default defineComponent({
   data: () => ({
      hasLoaded: false,
      gymInformation: {
         name: '',
         adress: '',
         phone: '',
         gym_reg_code: '',
         picture: ''
      },
      gymCardInformation: {
         "id": Number,
         "description": String,
         "accepted": Boolean,
         "coach_id": Number,
         "gym_id": Number,
         "isvalid": Boolean
      },
      putGymCardInformation: {
         "id": Number,
         "description": String,
         "accepted": Boolean,
         "coach_id": Number,
         "gym_id": Number,
         "isvalid": Boolean,
         "gym": Number
      }
   }),
   props: {
      gymId: Number,
      isPending: Boolean,
   },
   methods: {
      ...mapActions({
         getGymInformation: 'coach/getGymInformation',
         getGymCardInformation: 'coach/getGymCardInformation',
         updateGymCardInformation: 'coach/updateGymCardInformation'
      }),
      enrollClicked() {

      },
      acceptInvitationClicked() {
         this.hasLoaded = false
         this.gymCardInformation.accepted = true
         this.updateGymCard()
      },
      goBack() {
         this.$emit('finishViewing')
      },
      async updateGymCard() {
         this.gymCardInformation.gym = this.gymId
         if (await this.updateGymCardInformation(this.gymCardInformation)) {
            this.$emit('resetPageData')
         }
         this.getGymCard()
      },
      async getGymCard() {
         // TODO_asghar: make interfaces for these objects
         this.gymCardInformation = await this.getGymCardInformation({ coachId: this.coachId, gymId: this.gymId })
         this.hasLoaded = true
      }
   },
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
         user: (state: any) => state.user,
         role: (state: any) => state.user.role,
         coachId: (state: any) => state.coach.coachId
      })
   },
   async mounted() {
      this.gymInformation = await this.getGymInformation(this.gymId)

      if (this.role == '1') { // coach
         this.getGymCard()
      } else if (this.role == '2') { // customer

      }
   }
})
</script>


<style>
.bordered {
   border-style: solid;
   border-radius: 5px;
   border-width: 2px;
   border-color: rgba(0, 0, 0, 0.1);
}
</style>