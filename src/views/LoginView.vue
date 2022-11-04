<template>
  <div class="row justify-center content-center">
        <LoginComponent @submitForm="login" @signup="changeState" v-if="state===1"></LoginComponent>
        <SignupComponent @submitForm="signup" @login="changeState" v-else></SignupComponent>
    </div>
</template>
<script lang="ts">
import LoginComponent from '../components/LoginComponent.vue'
import SignupComponent from "../components/SignupComponent.vue"
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

    export default defineComponent({
        components:{ LoginComponent, SignupComponent },
        data(){
            return {
                state:1
            }
        },
        methods:{
            ...mapActions({
                login: 'user/login',
                signup:'user/signup'
            }),
            changeState(event:number){
                this.state = event;
            }
        }

    })
</script>
<style></style>