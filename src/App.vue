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
  <div class="full-page">
    <ToolbarComponent></ToolbarComponent>
    <RouterView style="height:100%;" />
  </div>
</template>

<style scoped>
  .full-page{
    height:100vh;
  }
</style>
