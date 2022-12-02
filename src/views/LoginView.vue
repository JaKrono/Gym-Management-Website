<template>
  <div class="row justify-center content-center">
        <LoginComponent @submitForm="submitLoginForm" @signup="changeState" v-if="state===1"></LoginComponent>
        <SignupComponent @submitForm="submitSignupForm" @login="changeState" v-else></SignupComponent>
    </div>
</template>
<script lang="ts">
import LoginComponent from '../components/LoginComponent.vue'
import SignupComponent from "../components/SignupComponent.vue"
import { setToken } from '@/repositories/client/axios'
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import type { LoginModel, SignupModel } from '@/common/interfaces'

    export default defineComponent({
        components:{ LoginComponent, SignupComponent },
        data(){
            return {
                state:1
            }
        },
        computed:{
            ...mapState({
                token:state=>state.user.token
            })
        },
        methods:{
            ...mapActions({
                login: 'user/login',
                signup:'user/signup'
            }),
            async submitLoginForm(model:LoginModel){
                const result = await this.login(model)
                if(result){
                    setToken(this.token)
                    this.$router.push('/dashboard')
                }
            },
            async submitSignupForm(model:SignupModel){
                const result = await this.signup(model)
                if(result){
                    this.$router.push('/dashboard')
                }
            },
            changeState(event:number){
                this.state = event;
            }
        }

    })
</script>
<style></style>