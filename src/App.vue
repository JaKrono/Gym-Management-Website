<script lang="ts">
  import { defineComponent } from 'vue';
  import ToolbarComponent from './components/ToolbarComponent.vue';
  import { Notify } from 'quasar';
  import { mapState } from 'vuex';
  export default defineComponent({
    components:{ToolbarComponent},
    computed:{
      ...mapState({
        hasNotification:(state:any) => state.notification.hasNotification,
        notification: (state:any) => state.notification.notification
      })
    },
  
    watch:{
      hasNotification:function(newValue){
        if(newValue)
        Notify.create(this.notification)
      }
    }
  })
</script>

<template>
    <q-layout>
      <q-header class="header-height bg-white">
        <ToolbarComponent></ToolbarComponent>
      </q-header>
      <q-page-container class="page-container row">
        <router-view name="RightSidebar" />
        <router-view class="item-fill" />
      </q-page-container>
    </q-layout>
    <!-- <RouterView style="height:100%;" /> -->
</template>

<style scoped>
  .header-height{
    height: 70px;
  }
  .page-container{
    height: calc(100vh - 70px);
  }
</style>
