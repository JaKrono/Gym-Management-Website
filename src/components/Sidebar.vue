<template>
    <q-drawer elevated v-model="sidebarIsVisible" showIfAbove="md" side="left" bordered>
        <q-list class="q-mt-sm" padding>
            <SidebarItemVue v-for="item in items" @itemClicked="itemClicked" class="q-mb-lg" :disable="item.disable"
                :title="item.title" :path="item.path" :icon="item.icon" :id="item.id"
                :isSelected="isItemSelected(item.id)"></SidebarItemVue>
        </q-list>
        <q-separator class="q-my-xl" inset />
        <div class="flex column content-center">
            <q-avatar size="9em" color="primary">
                <q-icon class="text-white" name="person"></q-icon>
            </q-avatar>
            <p class="q-mt-lg font-size-up-2 text-center">بیژن مرتضوی</p>
            <p class=" text-center">test@test.ir</p>
            <q-btn outline color="primary">مشاهده پروفایل</q-btn>
            <q-btn class="q-mt-sm" @click="logout" color="secondary">خروج</q-btn>
        </div>
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
            gym: state => state.user.gym,
            role: state => state.user.role
        })
    },
    mounted() {
        this.setItems();
    },
    methods: {
        ...mapMutations({
            hideSidebar: 'global/hideSidebar',
            showSidebar: 'global/showSidebar',
        }),
        ...mapActions({
            userLogout: 'user/logout'
        }),
        itemClicked(id: number) {
            this.selectedId = id;
        },
        isItemSelected(id: number) {
            return this.selectedId === id;
        },
        logout() {
            this.userLogout();
            this.$router.push('/login')
        },
        setItems() {
            if (this.role === "0") {
                this.items = [
                    { id: 1, title: 'پروفایل', icon: 'dashboard', path: '/dashboard', disable: false },
                    { id: 3, title: 'مربی ها', icon: 'person', path: '/coaches', disable: !this.gym.id },
                    { id: 2, title: 'اعضا', icon: 'groups', path: '/customers', disable: !this.gym.id },
                    { id: 4, title: 'جستجو مربی', icon: 'search', path: '/search-coach' }
                ]
            }
            if (this.role === '1') {
                this.items = [
                    { id: 1, title: 'خانه', icon: 'dashboard', path: '/dashboard', disable: false },
                    { id: 2, title: 'پروفایل', icon: 'account_circle', path: '/profile', disable: false },
                    { id: 3, title: 'باشگاه‌ها', icon: 'fitness_center', path: '/gyms', disable: false },
                    { id: 4, title: 'کلاس‌ها', icon: 'signpost', path: '/classes', disable: false },
                    { id: 5, title: 'ورزشکارها', icon: 'people', path: '/customers', disable: false }
                ]
            }
            if (this.role === '2') {
                this.items = [
                    { id: 1, title: 'خانه', icon: 'home', path: '/dashboard', disable: false },
                    { id: 2, title: 'پروفایل', icon: 'account_circle', path: '/profile', disable: false },
                    { id: 3, title: 'باشگاه‌ها', icon: 'fitness_center', path: '/gyms' }
                ]
            }
        },
        updateItems() {
            if (this.role === "0") {
                this.items = [{ id: 1, title: 'پروفایل', icon: 'dashboard', path: '/dashboard', disable: false }, { id: 3, title: 'مربی ها', icon: 'person', path: '/coaches', disable: !this.gym.id }, { id: 2, title: 'اعضا', icon: 'groups', path: '/customers', disable: !this.gym.id }, { id: 4, title: 'جستجو مربی', icon: 'search', path: '/search-coach' }]
            }
        }
    },
    watch: {
        '$q.screen.width': function (newValue) {
            if (newValue > 1080)
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
<style>

</style>