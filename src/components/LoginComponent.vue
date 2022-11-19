<template>
  <div class="col-lg-9 col-xs-11">
    <div class="row">
      <div class="col-md-8 col-xs-12">
        <q-form greedy @submit.prevent="submitForm">
          <q-card class="login-card">
            <q-card-section>
              <span class="bold-title">
                <span class="bold-title" v-if="showElementForRole([roles.coach])">
                  مربی عزیز، 
                </span>
                <span class="bold-title" v-if="showElementForRole([roles.owner])">
                  باشگاه‌دار عزیز، 
                </span>
                خوش آمدید
              </span>

              <q-input class="q-my-sm text-center" v-model="username" label="نام کاربری" lazy-rules
                :rules="[rules.required]">
              </q-input>
              <q-input class="q-my-sm text-center" v-model="password" type="password" label="رمز عبور" lazy-rules
                :rules="[rules.required, rules.password]"></q-input>
              <p class="q-my-sm text-center">رمز عبورتان را فراموش کردید؟</p>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn type="submit" rounded outline color="primary" class="q-mb-lg login-button" label="ورود"></q-btn>
              <p class="q-my-sm text-center lt-md">حساب کاربری ندارید؟<span class="text-primary cursor-pointer" @click="signupClicked"> ثبت نام کنید.</span></p>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
      <div style="position:relative" class="col-md-4 gt-sm">
        <div style="height: 100%; overflow: hidden; border-radius: 5px;">
          <div class="side-card"></div>
        </div>
        <div class="signup-section text-white">
          <span class="bold-title">ثبت نام</span>
          <p class="text-white q-my-sm q-mx-sm">برای مشاهده باشگاه ها ، برنامه ها و مربی ها لطفا ثبت نام کنید.</p>
          <q-btn @click="signupClicked" style="width:100px; margin:0 auto;" rounded outline color="white"
            label="ثبت نام"></q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { LoginModel } from '@/common/interfaces';
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { roles } from '@/common/enums';
export default defineComponent({
  name: 'LoginComponent',
  mixins:[

  ],
  data: () => ({
    username: '',
    password: '',
    roles,
  }),
  mounted() {

  },
  methods: {

    signupClicked() {
      this.$emit('signup', 2)
    },

    submitForm() {
      const model: LoginModel = { username: this.username, password: this.password }
      this.$emit('submitForm', model)
    },
    showElementForRole(roleList: string[]): boolean {
      let result:boolean = false
      for (var item in roleList) {
        result = (this.$route.query.role === roleList[item])
        if (result) {
          break
        }
      }
      return result
    }
  }
})
</script>
<style lang="scss">
//TODO: move all shared classes to one file
// @import "../assets/main.scss";
.login-card {
  width: 100%;
  min-height: 80vh;
  padding: 100px 120px 0 120px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.login-button {
  // min-width:70%;
  width: 100% !important;
  margin: auto;
}

.side-card {
  background-image: url('card.jpg');
  background-position: center top;
  height: 100%;
  background-size: cover;
  filter: blur(5px)
}

.q-field__label {
  right: 0;
  left: 0;
  margin: auto !important;
  text-align: center !important;
  transform-origin: top !important;
}

input {
  text-align: center;
}

.signup-section {
  position: absolute;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  // @include column-center
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .login-card {
    width: 100%;
    min-height: max-content;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
}
</style>