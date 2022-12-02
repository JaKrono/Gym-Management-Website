<template>
    <q-drawer elevated v-model="sidebarIsVisible" showIfAbove="md" side="left" bordered>
        <q-list class="q-mt-sm" padding>
            <SidebarItemVue v-for="item in items" @itemClicked="itemClicked" class="q-mb-lg" :title="item.title" :path="item.path" :icon="item.icon" :id="item.id" :isSelected="isItemSelected(item.id)"></SidebarItemVue>
        </q-list>
        <q-separator class="q-my-xl" inset />
        <div class="flex column content-center">
            <q-avatar size="9em" color="primary">
                <q-icon class="text-white" name="person"></q-icon>
            </q-avatar>
            <p class="q-mt-lg font-size-up-2 text-center">بیژن مرتضوی</p>
            <p class=" text-center">test@test.ir</p>
            <q-btn outline color="primary">مشاهده پروفایل</q-btn>
        </div>
    </q-drawer>
</template>
<script lang="ts">
import { roles } from '@/common/enums';
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import SidebarItemVue from './SidebarItem.vue';
    export default defineComponent({
        components:{SidebarItemVue},
        data:()=>({
            selectedId:0,
            items:[] as any,
            width: window.innerWidth
        }),
        computed:{
            sidebarIsVisible:{
                get():any{
                    return this.$store.state.global.sidebarIsVisible as any
                },
                set(value:boolean){
                    this.$store.commit('global/changeSidebarVisibility', value)
                }
            },
            ...mapState({
                role: state => state.user.role
            }),

        },
        mounted(){
            // if(this.role === roles.owner){
                this.items = [{id:1, title:'پروفایل', icon:'dashboard', path:'/dashboard'},{id:3, title:'مربی ها', icon:'person', path:'/coaches'},{id:2, title:'اعضا', icon:'person', path:'/customers'}]
            // }
        },
        methods:{
            ...mapMutations({
                hideSidebar:'global/hideSidebar',
                showSidebar:'global/showSidebar',
            }),
            itemClicked(id:number){
                this.selectedId= id;
            },
            isItemSelected(id:number){
                return this.selectedId === id;
            }
        },
        watch:{
            '$q.screen.width':function(newValue){
                if(newValue> 1080)
                    this.showSidebar();
                else{
                    this.hideSidebar();
                }
            }
        }
    })
</script>
<style></style>