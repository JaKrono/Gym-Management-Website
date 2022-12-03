<template>
    <q-page>

        <div class="row justify-center q-mt-xl q-px-md">
            <q-form class="profile-form" greedy @submit.prevent="applyChanges">
                <div class="row">
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="gymForm.name" label="نام باشگاه" lazy-rules :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="gymForm.address" label="آدرس" lazy-rules :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="gymForm.phone" label="شماره تلفن" lazy-rules :rules="[rules.required, rules.phoneNumber]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input :readonly="(gymForm.id !== null)" v-model="gymForm.gym_reg_code" label="کد رجیستر" lazy-rules :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-12 q-px-md q-mt-lg text-center">
                        <q-btn type="submit" icon="add" rounded outline color="primary" :label="gymForm.id ?'ثبت تغییرات': 'افزودن باشگاه'"></q-btn>
                    </div>
                </div>
            </q-form>
        </div>
    </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
// import { GymModel } from '@/common/interfaces';
    export default defineComponent({
        data:()=>({
            gymForm:{id:null,name:"",address:"",phone:"",gym_reg_code:"",user:null}
        }),
        computed:{
            ...mapState({
                userId: state => state.user.userId,
                gymModel:state=> state.user.gym
            }),
        },
        async mounted(){
            await this.getGym(this.userId)
            this.gymForm = Object.assign({},this.gymModel)
            
        },
        methods:{
            ...mapActions({
                getGym:'user/getGymForOwner',
                updateGym:'user/updateGym'
            }),
            applyChanges(){
                this.gymForm.user = this.userId
                this.updateGym(this.gymForm)
            }
        }
    })
</script>
<style scoped lang="scss">
.profile-form{
    width: 100%;
}
</style>