<template>
  <div class="col-lg-9 col-xs-11">
    <div class="row">
      <div style="position:relative" class="col-md-4 gt-sm">
        <div style="height: 100%; overflow: hidden; border-radius: 5px;">
          <div class="side-card"></div>
        </div>
        <div class="login-section text-white">
          <span class="bold-title">ورود</span>
          <p class="text-white q-my-sm q-mx-sm">اکانت دارید؟ برای مشاهده جزيیات پروفایل خود وارد شوید.</p>
          <q-btn @click="loginClicked" style="width:100px; margin:0 auto;" rounded outline color="white" label="ورود">
          </q-btn>
        </div>
      </div>
      <div class="col-md-8 col-xs-12">
        <q-form greedy @submit.prevent="signup">
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
                :rules="[rules.required]"></q-input>

              <q-input class="q-my-sm text-center" v-model="email" label="ایمیل" lazy-rules
                :rules="[rules.required, rules.email]"></q-input>

              <q-input class="q-my-sm text-center" v-model="phoneNumber" label="شماره تماس"
                v-if="showElementForRole([roles.coach, roles.owner])" lazy-rules
                :rules="[rules.required, rules.phoneNumber]"></q-input>

              <q-input class="q-my-sm text-center" v-model="ssn" label="کد ملی" v-if="showElementForRole([roles.owner])"
                lazy-rules :rules="[rules.required, rules.ssn]"></q-input>

              <q-input class="q-my-sm text-center" v-model="password" type="password" label="رمز عبور" lazy-rules
                :rules="[rules.required, rules.password]"></q-input>

            </q-card-section>
            <q-card-actions align="center">
              <q-btn type="submit" rounded outline color="primary" class="q-mb-lg login-button" label="ثبت نام"></q-btn>
              <p class="q-my-sm text-center lt-md">حساب کاربری دارید؟<span class="text-primary cursor-pointer"
                  @click="loginClicked"> وارد شوید.</span></p>
            </q-card-actions>
          </q-card>
        </q-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { SignupModel } from '@/common/interfaces';
import type { CoachSignupModel } from '@/common/interfaces';
import type { OwnerSignupModel } from '@/common/interfaces';
import { defineComponent } from 'vue';
import { roles } from '@/common/enums';
import user from '@/store/modules/user';
export default defineComponent({
  data: () => ({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    ssn: '',
    roles
  }),
  methods: {
    loginClicked() {
      this.$emit('login', 1)
    },
    signup() {
      if (this.$route.query.role == roles.coach) {
        const model: CoachSignupModel = { role: 1, email: this.email, username: this.username, password: this.password, phoneNumber: this.phoneNumber, personal_id: this.ssn }
        this.$emit('submitForm', model)
      } else if (this.$route.query.role == roles.owner) {
        const model: OwnerSignupModel = { role: 0, email: this.email, username: this.username, password: this.password, phoneNumber: this.phoneNumber, personal_id: this.ssn }
        this.$emit('submitForm', model)
      } else {
        const model: SignupModel = { role: 2, email: this.email, username: this.username, password: this.password, personal_id: this.ssn }
        this.$emit('submitForm', model)
      }
    },
    showElementForRole(roleList: string[]): boolean {
      let result: boolean = false
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
.login-section {
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
</style>