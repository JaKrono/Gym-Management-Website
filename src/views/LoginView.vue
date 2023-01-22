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
    components: { LoginComponent, SignupComponent },
    data() {
        return {
            state: 1
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token,
            role: state => state.user.role
        }),
        // token:()=>{
        //     return this.$store.state.user.token
        // }
    },
    methods: {
        ...mapActions({
            login: 'user/login',
            signup: 'user/signup'
        }),
        async submitLoginForm(model: LoginModel) {
            const result = await this.login(model)
            if (result) {
                setToken(this.token)
                if (this.role === '0') {
                    this.$router.push('/owner/dashboard')
                }
                if (this.role === '1') {
                    this.$router.push('/coach/dashboard')
                }
                if (this.role === '2') {
                    this.$router.push('/customer/dashboard')
                }
            }
        },
        async submitSignupForm(model: SignupModel) {
            const result = await this.signup(model)
            if (result) {
                setToken(this.token)
                if (this.role === '0') {
                    this.$router.push('/owner/dashboard')
                }
                if (this.role === '1') {
                    this.$router.push('/coach/dashboard')
                }
                if (this.role === '2') {
                    this.$router.push('/customer/dashboard')
                }
            }
        },
        changeState(event: number) {
            this.state = event;
        }
    }

})
</script>
<style>

</style>