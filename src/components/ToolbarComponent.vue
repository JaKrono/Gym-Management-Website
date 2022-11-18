<template>
    <q-toolbar class="bg-primary text-black toolbar">
        
        <!-- <q-btn flat round dense icon="menu" /> -->
        <!-- <q-toolbar-title>باشگاه ورزشی</q-toolbar-title> -->
    </q-toolbar>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
import SidebarItemVue from './SidebarItem.vue';
    export default defineComponent({
    components: { SidebarItemVue }
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