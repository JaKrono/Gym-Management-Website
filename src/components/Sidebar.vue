<template>
    <q-drawer :mini="miniState" show-if-above v-model="sideBarOpen" side="left" bordered>
        <q-list padding>
            <SidebarItemVue v-for="item in items" @itemClicked="itemClicked" class="q-mb-lg" :title="item.title" :path="item.path" :icon="item.icon" :id="item.id" :isSelected="isItemSelected(item.id)"></SidebarItemVue>
        </q-list>
    </q-drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SidebarItemVue from './SidebarItem.vue';
    export default defineComponent({
        data:()=>({
            sideBarOpen:true,
            selectedId:0,
            items:[{id:1, title:'پروفایل', icon:'dashboard', path:'/dashboard'},{id:2, title:'مربی ها', icon:'person', path:'/coaches'}],
            miniState:false
        }),
        methods:{
            itemClicked(id:number){
                this.selectedId= id;
            },
            isItemSelected(id:number){
                return this.selectedId === id;
            }
        },
        components:{SidebarItemVue}
    })
</script>
<style></style>