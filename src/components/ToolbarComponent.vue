<template>
    <q-toolbar class="bg-primary text-black toolbar">
        <q-btn @click="showSidebar" v-if="sidebarIsHidden" color="white" flat icon="menu" />
        <q-space></q-space>
        <q-btn v-if="isSignedIn" flat color="secondary" round class="text-white">
            <!-- <q-avatar color="red"></q-avatar> -->
            <img style="height:3em; width:3em; border-radius:50%;object-fit:cover;" :src="user.picUrl">
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
            user: state => state.user.user,
            isSignedIn: state => state.user.isSignedIn
        })
    },
    methods: {
        ...mapMutations({
            showSidebar: 'global/showSidebar'
        })
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