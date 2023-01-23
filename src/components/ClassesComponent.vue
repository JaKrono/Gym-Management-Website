<template>
    <q-page>
        <div class="row content-center q-px-lg" style="align-items:center">
            <h5 class="">کلاس ها</h5>
            <q-space></q-space>
            <q-btn @click="openAddClassModal" color="primary" icon="add" style="height:40px">افزودن کلاس</q-btn>
        </div>
        <template v-if="(classList.length > 0 && !loading)">
            <q-scroll-area style="height:90%;">

                <div class="row justify-start q-pa-lg" :class="{ 'justify-center': $q.screen.xs }">
                    <div v-for="cls in classList" class="q-pa-md col-lg-4 col-sm-6 col-xs-12">
                        <CoachComponent1 @view="showDetail" :model="cls"></CoachComponent1>
                    </div>
                </div>
            </q-scroll-area>
        </template>
        <template v-else-if="(classList.length == 0 && !loading)">
            <div class="row q-mt-lg justify-center">
                <div class="col-12 text-center">
                    <img class="not-found-image" src="noItemFound.png" />
                    <p class="font-size-up-5">کلاسی ایجاد نشده است.</p>
                </div>
            </div>

        </template>
        <q-inner-loading :showing="loading" color="primary" />
        <q-dialog v-model="addClassModalShow">
            <q-card style="width:70%;">
                <q-card-section>
                    <div class="text-h6">افزودن کلاس</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input class="q-my-md" label="نام" v-model="newClassObject.name"></q-input>
                    <q-select class="q-my-md" :options="coaches" option-label="name" option-value="name" label="مربی"
                        v-model="newClassObject.coachname" map-options emit-value></q-select>
                    <q-input class="q-my-md" label="زمان" v-model="newClassObject.time"></q-input>
                    <q-select class="q-my-md" :options="categories" label="دسته بندی ها"
                        v-model="newClassObject.CourseCategory" option-label="title" option-value="id" map-options
                        emit-value></q-select>
                </q-card-section>

                <q-card-actions class="q-px-md" align="right">
                    <q-btn label="تایید" color="primary" @click="addClass" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="showDetailDialog">
            <q-card style="width:70%;">
                <q-card-section>
                    <div class="text-h6">جزئیات کلاس</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    لیست افراد:
                    <q-list>
                        <template v-if="customers.length == 0">
                            <q-item v-for="customer in customers">
                                {{ customer }}
                            </q-item>
                        </template>
                        <template v-else>
                            عضوی یافت نشد.
                        </template>
                    </q-list>
                </q-card-section>

                <q-card-actions class="q-px-md" align="right">
                    <q-btn label="تایید" color="primary" @click="addClass" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ClassComponent from './ClassComponent.vue';
import type { CategoryModel, ClassModel, NewClassModel } from '@/common/interfaces';
import { mapActions, mapState } from 'vuex';
import { ClassListService, Gym } from "@/repositories/index";
import { BaseComponent } from '@/common/base-component';
import { CategoryList, CourseList } from '@/common/category-list';
import { categories } from '@/common/enums';
import CoachComponent1 from './CoachComponent1.vue';
import gym from '@/repositories/gym';
export default defineComponent({
    components: {
        ClassComponent,
        CoachComponent1
    },
    data: () => ({
        search: '',
        loading: true,
        addClassModalShow: false,
        showDetailDialog: false,
        classList: [] as ClassModel[],
        newClassObject: {} as NewClassModel,
        baseComponent: new BaseComponent(),
        categoryListModel: CategoryList,
        selectedCategory: {} as CategoryModel,
        categories: [],
        coaches: [],
        customers: []
    }),
    computed: {
        ...mapState({
            gymId: state => state.user.gym.id
        })
    },
    async mounted() {
        await this.getCoaches();
        await this.getClassList();
        this.loading = false;
        this.categories = CourseList as any;
    },
    methods: {
        ...mapActions({
            getClassListAsync: 'user/getClassList',
            addClassAsync: 'user/addClass'
        }),
        async getClassList() {
            try {
                // this.classList = await this.getClassListAsync();
                const result = await ClassListService.getClassList();
                if (result.status === 200) {
                    this.classList = result.data;
                }
                else {
                    this.classList = [];
                }
            }
            catch (err) { }
        },
        openAddClassModal() {
            this.addClassModalShow = true;

            this.newClassObject = {
                gym: this.gymId,
                name: '',
                time: '',
                CourseCategory: '',
                coachname: ''
            }
        },
        async addClass() {
            // this.newClassObject.categoryTypes = this.selectedCategory.id);

            try {
                // await this.addClassAsync(this.newClassObject);
                const result = await ClassListService.addClassItem(this.newClassObject);
                if (result.status === 201) {
                    this.classList.push(result.data);
                }
            }
            catch (err) { }

            this.addClassModalShow = false;
        },
        selectCategory(selectedCategory: CategoryModel) {
            this.selectedCategory = selectedCategory;
        },
        async getCoaches() {
            const response = await Gym.getCoaches(this.gymId);
            this.coaches = response.data;
        },
        showDetail() {
            this.showDetailDialog = true;
        },
        async getCustomers() {
            const response = await gym.getCustomers(this.gymId)
            this.customers = response.data;
        }
    }
})
</script>
<style scoped lang="scss">

</style>