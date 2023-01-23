<template>
    <q-toolbar class="bg-primary text-black toolbar">
        <q-btn @click="showSidebar" v-if="sidebarIsHidden" color="white" flat icon="menu" />
        <q-btn class="" v-if="!sidebarIsHidden" @click="navigateToLandingPage" flat round>
            <q-img src="/logo.png" style="width:45px;"></q-img>
        </q-btn>
        <q-space></q-space>
        <q-btn v-if="isSignedIn" @click="navigateToUserDashboard" flat color="secondary" round class="text-white">
            <img v-if="user.picUrl" style="height:3em; width:3em; border-radius:50%;object-fit:cover;"
                :src="user.picUrl">
            <q-avatar v-else>
                <q-icon size="1.5em" name="person"></q-icon>
            </q-avatar>
        </q-btn>
        <!-- <q-toolbar-title>باشگاه ورزشی</q-toolbar-title> -->
    </q-toolbar>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItemVue from './SidebarItem.vue';
import { mapMutations, mapState } from 'vuex';
export default defineComponent({
    components: { SidebarItemVue },
    computed: {
        ...mapState({
            sidebarIsHidden: (state: any) => !state.global.sidebarIsVisible,
            user: state => state.user,
            isSignedIn: state => state.user.isSignedIn
        }),

    },
    methods: {
        ...mapMutations({
            showSidebar: 'global/showSidebar'
        }),
        navigateToUserDashboard() {
            if (this.user.role === '0') {
                this.$router.push('/owner/dashboard')
            }
            if (this.user.role === '1') {
                this.$router.push('/coach/dashboard')
            }
            if (this.user.role === '2') {
                this.$router.push('/customer/dashboard')
            }
        },
        navigateToLandingPage() {
            this.$router.push('/')
        }
    },
    mounted() {
    }
})
</script>
<style scoped>
.toolbar {
    height: 100%;
}

.content {
    padding: 20px;
}
</style>