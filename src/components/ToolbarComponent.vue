<template>
    <q-toolbar class="bg-primary text-black toolbar">
            <q-btn @click="showSidebar" v-if="sidebarIsHidden" color="white" flat icon="menu" />
        <!-- <q-toolbar-title>باشگاه ورزشی</q-toolbar-title> -->
    </q-toolbar>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
import SidebarItemVue from './SidebarItem.vue';
import { mapMutations, mapState } from 'vuex';
    export default defineComponent({
    components: { SidebarItemVue },
    computed:{
        ...mapState({
            sidebarIsHidden:(state:any)=> !state.global.sidebarIsVisible
        })
    },
    methods:{
        ...mapMutations({
            showSidebar:'global/showSidebar'
        })
    }
})
</script>
<style scoped>
    .toolbar{
        height: 100%;
    }
    .content{
        padding:20px;
    }
</style>