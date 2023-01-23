<template>
    <!-- <q-drawer elevated v-model="sidebarIsVisible" showIfAbove="md" side="left" bordered> -->
    <q-drawer :width="250" elevated v-model="sidebarIsVisible" side="left">
        <q-scroll-area class="full-height">
            <div class="q-mx-sm">
                <!-- <div class="flex row q-mt-md">
                    <div class="row col-12">
                        <div class="flex col-12 justify-center">
                            <q-avatar v-if="!user.picUrl" size="9em" color="primary">
                                <q-icon class="text-white" name="person"></q-icon>
                            </q-avatar>
                            <img v-else style="height:9em; width:9em; border-radius:50%;object-fit:cover;"
                                :src="user.picUrl" />
                        </div>
                        <p class="col-12 q-mt-md font-size-up-2 text-center">{{ user.username }}</p>
                        <p class="col-12 text-center">{{ user.email }}</p>
                        <q-btn outline color="primary">مشاهده پروفایل</q-btn>
                    </div>
                </div> -->

                <!-- <q-separator class="q-mt-md" style="height: 1px" /> -->

                <div class="flex">
                    <q-space></q-space>
                    <q-btn class="" v-if="$q.screen.width < 1024" @click="navigateToLandingPage" flat
                        round>
                        <q-img src="/logoBlue.png" style="width:100px;"></q-img>
                    </q-btn>
                    <q-space></q-space>
                </div>

                <q-list class="">
                    <SidebarItemVue v-for="item in items" @itemClicked="itemClicked" class="q-pa-md"
                        :disable="item.disable" :title="item.title" :path="item.path" :icon="item.icon" :id="item.id"
                        :isSelected="isItemSelected(item.id)"></SidebarItemVue>
                </q-list>

                <q-separator class="q-mt-xs" style="height: 2px" />
                <br /> <!-- Do not allow margin collapse -->

                <div class="row">
                    <q-btn class="q-mx-auto logout-button" @click="logout" color="secondary">خروج</q-btn>
                </div>
            </div>
        </q-scroll-area>

    </q-drawer>
</template>
<script lang="ts">
import { roles } from '@/common/enums';
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState, Store } from 'vuex';
import SidebarItemVue from './SidebarItem.vue';
export default defineComponent({
    components: { SidebarItemVue },
    data: () => ({
        selectedId: 0,
        items: [] as any,
        width: window.innerWidth
    }),
    computed: {
        sidebarIsVisible: {
            get(): any {
                return this.$store.state.global.sidebarIsVisible as any
            },
            set(value: boolean) {
                this.$store.commit('global/changeSidebarVisibility', value)
            }

        },
        ...mapState({
            gym: (state: any) => state.user.gym,
            role: (state: any) => state.user.role,
            user: (state: any) => state.user.user
        })
    },
    beforeMount() {
        this.setItems();
        this.selectItemFromRoute();
    },
    methods: {
        ...mapMutations({
            hideSidebar: 'global/hideSidebar',
            showSidebar: 'global/showSidebar',
        }),
        ...mapActions({
            userLogout: 'user/logout'
        }),
        navigateToLandingPage() {
            this.$router.push('/')
        },
        selectItemFromRoute() {
            const path = this.$route.path

            // Add support for regex
            // Makes dynamic route matching with params possible
            // e.g. .../questions/82/
            let item: { id: number } = { id: 0 }
            for (var i of this.items) {
                if (i.path === path) {
                    item = i
                } else {
                    const matchResult = path.match(i.regex)
                    if (matchResult && matchResult[0] === path) {
                        item = i
                    }
                }
            }

            // const item = this.items.find((item: any) => (item.path === path));
            this.selectedId = item.id
        },
        itemClicked(id: number) {
            this.selectedId = id;
        },
        isItemSelected(id: number) {
            return this.selectedId === id;
        },
        logout() {
            this.userLogout();
            this.$router.push('/')
        },
        setItems() {
            if (this.role === "0") {
                this.items = [
                    { id: 1, title: 'پروفایل', icon: 'dashboard', path: '/owner/dashboard', disable: false },
                    { id: 3, title: 'مربی ها', icon: 'person', path: '/coaches', disable: !this.gym.id },
                    { id: 7, title: 'کلاس ها', icon: 'home', path: '/club-classes', disable: !this.gym.id },
                    { id: 2, title: 'اعضا', icon: 'groups', path: '/customers', disable: !this.gym.id },
                    { id: 4, title: 'جستجو مربی', icon: 'search', path: '/search-coach', disable: !this.gym.id },
                    { id: 5, title: 'مقالات', icon: 'article', path: '/articles', disable: !this.gym.id },
                    { id: 6, title: 'پرسش و پاسخ', icon: 'question_answer', path: '/questions', regex: /\/questions((\/)\d+(\/)?|(\/))?/g, disable: !this.gym.id }
                ]
            }
            if (this.role === '1') {
                this.items = [
                    { id: 1, title: 'خانه', icon: 'dashboard', path: '/coach/dashboard', disable: false },
                    { id: 2, title: 'پروفایل', icon: 'account_circle', path: '/profile', disable: false },
                    { id: 3, title: 'باشگاه‌ها', icon: 'fitness_center', path: '/gyms', disable: false },
                    { id: 4, title: 'کلاس‌ها', icon: 'signpost', path: '/classes', disable: false },
                    { id: 5, title: 'ورزشکارها', icon: 'people', path: '/customers', disable: false },
                    { id: 6, title: 'مقالات', icon: 'article', path: '/articles', disable: false },
                    { id: 7, title: 'پرسش و پاسخ', icon: 'question_answer', path: '/questions', regex: /\/questions((\/)\d+(\/)?|(\/))?/g, disable: false }
                ]
            }
            if (this.role === '2') {
                this.items = [
                    { id: 1, title: 'خانه', icon: 'home', path: '/customer/dashboard', disable: false },
                    { id: 2, title: 'پروفایل', icon: 'account_circle', path: '/profile', disable: false },
                    { id: 3, title: 'باشگاه‌ها', icon: 'fitness_center', path: '/gyms', disable: false },
                    { id: 4, title: 'مقالات', icon: 'article', path: '/articles', disable: false },
                    { id: 5, title: 'پرسش و پاسخ', icon: 'question_answer', path: '/questions', regex: /\/questions((\/)\d+(\/)?|(\/))?/g, disable: false }
                ]
            }
        },
        updateItems() {
            if (this.role === "0") {
                this.items = [
                    { id: 1, title: 'پروفایل', icon: 'dashboard', path: '/owner/dashboard', disable: false },
                    { id: 3, title: 'مربی ها', icon: 'person', path: '/coaches', disable: !this.gym.id },
                    { id: 7, title: 'کلاس ها', icon: 'home', path: '/club-classes', disable: !this.gym.id },

                    { id: 2, title: 'اعضا', icon: 'groups', path: '/customers', disable: !this.gym.id },
                    { id: 4, title: 'جستجو مربی', icon: 'search', path: '/search-coach', disable: !this.gym.id },
                    { id: 5, title: 'مقالات', icon: 'article', path: '/articles', disable: false },
                    { id: 6, title: 'پرسش و پاسخ', icon: 'question_answer', path: '/questions', regex: /\/questions((\/)\d+(\/)?|(\/))?/g, disable: false }
                ]
            }
        }
    },
    watch: {
        '$q.screen.width': function (newValue) {
            if (newValue > 1024)
                this.showSidebar();
            else {
                this.hideSidebar();
            }
        },
        gym: function (newValue) {
            this.updateItems()
        }
    }
})
</script>
<style scoped lang="scss">
.logout-button {
    width: 100px;
}

.q-scrollarea :deep(.q-scrollarea__thumb) {
    width: 4px;
    height: 4px;
    margin: 2px;
    background-color: $primary;
    opacity: 1;
}
</style>