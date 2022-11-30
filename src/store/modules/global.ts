import type { SidebarItemModel } from "@/common/interfaces";

export default{
    namespaced:true,
    state:()=>({
        sidebarIsVisible:true
    }),
    mutations:{
        showSidebar(state:any){
            state.sidebarIsVisible = true;
        },
        hideSidebar(state:any){
            state.sidebarIsVisible = false;
        },
        changeSidebarVisibility(state:any, visiblity:boolean){
            state.sidebarIsVisible = visiblity
        }
    },
}