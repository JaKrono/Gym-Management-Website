<template>
    <q-page>

        <div v-if="!loading" class="row justify-center q-mt-xl q-px-md">
            <q-form class="profile-form" greedy @submit.prevent="applyChanges">
                <div class="row">
                    <div class="col-12 q-px-md">
                        <div @click="uploadImage"
                            class="text-center q-mx-auto row clickable justify-center content-center image-container">
                            <img class="image" v-if="gymHasPhoto" :src="localUrl || gymForm.picture" />
                            <span v-else class="text-white unselectable">برای افزودن عکس کلیک کنید.</span>
                        </div>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="gymForm.name" label="نام باشگاه" lazy-rules
                            :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="gymForm.adress" label="آدرس" lazy-rules :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="gymForm.phone" label="شماره تلفن" lazy-rules
                            :rules="[rules.required, rules.phoneNumber]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input :readonly="(hasGym)" v-model="gymForm.gym_reg_code" label="کد رجیستر" lazy-rules
                            :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-12 q-px-md q-mt-lg text-center">
                        <q-btn type="submit" icon="add" outline color="primary"
                            :label="hasGym ? 'ثبت تغییرات' : 'افزودن باشگاه'"></q-btn>
                    </div>
                </div>
            </q-form>
        </div>
        <q-inner-loading :showing="loading" color="primary" />
    </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapState, Store } from 'vuex';
// import { GymModel } from '@/common/interfaces';
export default defineComponent({
    data: () => ({
        gymForm: { id: null, name: "", adress: "", phone: "", gym_reg_code: "", user: null, picture: "" },
        loading: true,
        imageFile: {},
        localUrl: ''
    }),
    computed: {
        ...mapState({
            userId: state => state.user.userId,
            gymModel: state => state.user.gym,
            hasGym: state => state.user.gym.id !== null,
        }),
        gymHasPhoto: function () {
            return this.gymForm.picture != null
        }
    },
    async mounted() {
        await this.getGym(this.userId)
        this.gymForm = Object.assign({}, this.gymModel)
        this.loading = false
    },
    methods: {
        ...mapActions({
            getGym: 'user/getGymForOwner',
            updateGym: 'user/updateGym'
        }),
        async applyChanges() {
            this.gymForm.user = this.userId
            await this.updateGym(this.gymForm)
        },
        uploadImage() {
            const element = document.createElement("input")
            element.type = 'file'
            element.click()
            element.onchange = async (event) => {
                this.imageFile = ((event.target) as any).files[0] as any
                this.localUrl = URL.createObjectURL(this.imageFile)
                this.gymForm.picture = await this.getBase64(this.imageFile) as string;
            }

        },
        getBase64(file: File) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
    }
})
</script>
<style scoped lang="scss">
.profile-form {
    width: 100%;
}

.image-container {
    background-color: $secondary;
    height: 300px;
    width: 300px;
    box-shadow: 0 0 5px 1px #000;
}

.image {
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>