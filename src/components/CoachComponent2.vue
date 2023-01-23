<template>
    <div v-if="coachObject" class="row column coach-card">
        <div class="col-lg-5 bg-primary first-section">
            <div class="row justify-end">
                <q-btn @click="addToGym" v-if="isInAddState" icon="add" flat color="white" rounded fab></q-btn>
            </div>
            <div class="image-cn">
                <img :src="(coachObject.user.picUrl) ? coachObject.user.picUrl : 'player.jpg'" class="user-image" />
            </div>
        </div>
        <div class="col-lg-7 q-pa-md second-section row column ">
            <div style="font-size:1.3em">{{ getName() }}</div>
            <div>مربی</div>
            <q-space></q-space>
            <q-btn @click="showCoachClicked" color="primary" outline>مشاهده پروفایل</q-btn>
        </div>
    </div>
    <q-dialog v-model="addCoach">
        <q-card style="width:50%;">
            <q-card-section>
                <div class="text-h6">افزودن مربی</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input type="textarea" v-model="description"></q-input>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="تایید" color="primary" @click="sendRequest" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CoachProfileService from '@/repositories/coach-profile-service';
export default defineComponent({
    props: ['isInAddState', 'coachObject'],
    data: () => ({
        addCoach: false,
        description: ''
    }),
    methods: {
        showCoachClicked() {

            let params = {
                coachId: this.coachObject.id,
                gymId: this.$store.state.user.gym.id,
                isCoach: (!!this.$store.state.coach.coach_id) ? 'true' : 'false'
            };

            this.$router.push({ path: '/coach-profile', query: params })
        },
        getName() {
            return (this.coachObject.user.first_name + ' ' + this.coachObject.user.last_name);
        },
        addToGym() {
            this.addCoach = true;
        },
        async sendRequest() {
            const inviteObject = { description: this.description, gym: this.$store.state.user.gym.id, coach: this.coachObject.id }
            const result = await CoachProfileService.sendInviteMessage(inviteObject);
            if (result.status === 201) {
                this.$store.dispatch('notification/showNotification', { message: 'دعوت نامه با موفقیت ارسال شد', type: 'positive' })
            }

        }
    }
})
</script>
<style scoped lang="scss">
.coach-card {
    box-shadow: 0 0 4px 0.3px #000;

    // max-width: 400px;
    .first-section {
        position: relative;
        height: 150px;
    }

    .image-cn {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 50%;
        position: absolute;
        bottom: -30px;
        right: 10px;

        .user-image {
            width: 100px;
            height: 100px;
            object-fit: cover;
            bottom: 0;
        }
    }

    .second-section {
        height: 300px;
    }
}
</style>