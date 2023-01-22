<template>
    <q-page>

        <div v-if="!loading" class="row justify-center q-mt-xl q-px-md">
            <q-form class="profile-form" greedy @submit.prevent="applyChanges">
                <div class="row">
                    <div class="col-12 q-px-md">
                        <div @click="uploadImage"
                            class="text-center q-mx-auto row clickable justify-center content-center image-container">
                            <img class="image" v-if="hasPhoto" :src="localUrl || model.user.picUrl" />
                            <span v-else class="text-white unselectable">برای افزودن عکس کلیک کنید.</span>
                        </div>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="model.user.first_name" label="نام" lazy-rules
                            :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="model.user.last_name" label="نام خانوادگی" lazy-rules
                            :rules="[rules.required]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-input v-model="model.phone" label="شماره تلفن" lazy-rules
                            :rules="[rules.required, rules.phoneNumber]"></q-input>
                    </div>
                    <div class="col-12 col-xl-6 col-lg-6 q-my-lg q-px-md">
                        <q-select v-model="model.user.gender" :options="options" label="جنسیت" lazy-rules
                            :rules="[rules.required]" map-options emit-value></q-select>
                    </div>
                    <div class="col-12 col-xl-12 q-px-md q-mt-lg text-center">
                        <q-btn type="submit" icon="add" outline color="primary" label='ثبت تغییرات'></q-btn>
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
        model: {
            user: { username: "", gender: null, picUrl: null, first_name: null, last_name: null },
            user_id: -1,
            description: null,
            detail_set: [],
            achievement_set: [],
            phone: ''
        },
        options: [
            { label: "مرد", value: 'M' },
            { label: "زن", value: 'F' },
        ],
        loading: true,
        imageFile: {},
        localUrl: '',
    }),
    computed: {
        ...mapState({
            userId: state => state.user.userId,
            coach: state => state.coach.coach,
            coachId: state => state.user.role_id
        }),
        hasPhoto: function () {
            return this.model.user.picUrl != null
        }
    },
    async mounted() {
        console.log(this.$store.state.user);

        await this.getCoach(this.coach_id)
        this.model = this.coach
        this.loading = false
    },
    methods: {
        ...mapActions({
            saveCoach: 'coach/saveCoach',
            getCoach: 'coach/getCoachDetail'
        }),
        async applyChanges() {
            const model = Object.assign({}, this.model)
            await this.saveCoach(model);
        },
        uploadImage() {
            const element = document.createElement("input")
            element.type = 'file'
            element.click()
            element.onchange = async (event) => {
                this.imageFile = ((event.target) as any).files[0] as any
                this.localUrl = URL.createObjectURL(this.imageFile)
                this.model.user.picUrl = await this.getBase64(this.imageFile) as string;
                // this.$store.state.picUrl = await this.getBase64(this.imageFile) as string;
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
    object-fit: cover;
    background-color: $secondary;
    height: 300px;
    width: 300px;
    box-shadow: 0 0 5px 1px #000;
}

.image {
    width: 100%;
    height: 100%;
}
</style>