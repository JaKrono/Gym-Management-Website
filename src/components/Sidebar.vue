<template>
    <q-drawer v-model="sidebarIsVisible" showIfAbove="md" side="left" bordered>
        <q-list padding>
            <SidebarItemVue v-for="item in items" @itemClicked="itemClicked" class="q-mb-lg" :title="item.title"
                :path="item.path" :icon="item.icon" :id="item.id" :isSelected="isItemSelected(item.id)">
            </SidebarItemVue>
        </q-list>
    </q-drawer>
</template>
<script lang="ts">
import { roles } from '@/common/enums';
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
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
            role: state => state.user.role
        }),

    },
    mounted() {
        // if(this.role === roles.owner){
        this.items = [
            { id: 1, title: 'پروفایل', icon: 'dashboard', path: '/dashboard' },
            { id: 2, title: 'مربی ها', icon: 'person', path: '/coaches' },
            { id: 3, title: 'کلاس ها', icon: 'class', path: '/club-classes' },
            { id: 4, title: 'جستجو مربی', icon: 'search', path: '/search-coach' }
        ]
        // }
    },
    methods: {
        ...mapMutations({
            hideSidebar: 'global/hideSidebar',
            showSidebar: 'global/showSidebar',
        }),
        itemClicked(id: number) {
            this.selectedId = id;
        },
        isItemSelected(id: number) {
            return this.selectedId === id;
        }
    },
    watch: {
        '$q.screen.width': function (newValue) {
            if (newValue > 1080)
                this.showSidebar();
            else {
                this.hideSidebar();
            }
        }
    }
})
</script>
<style>

</style>