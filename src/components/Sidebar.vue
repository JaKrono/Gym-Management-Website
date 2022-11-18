<template>
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <div class="content">
            <SidebarItemVue></SidebarItemVue>
        </div>
    </q-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItemVue from './SidebarItem.vue';
    export default defineComponent({
        components:{SidebarItemVue}
    })
</script>
<style></style>