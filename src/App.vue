<script lang="ts">
import { defineComponent } from 'vue';
import ToolbarComponent from './components/ToolbarComponent.vue';
import { Notify } from 'quasar';
import { mapState } from 'vuex';
import { setToken } from './repositories/client/axios';
export default defineComponent({
  components: { ToolbarComponent },
  computed: {
    ...mapState({
      hasNotification: (state: any) => state.notification.hasNotification,
      notification: (state: any) => state.notification.notification,
      token: (state: any) => state.user.token
    })
  },
  mounted() {
    if (this.token)
      setToken(this.token)
  },

  watch: {
    hasNotification: function (newValue) {
      if (newValue)
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

<style lang="scss" scoped>
.header-height {
  height: 50px;
}

.page-container {
  min-height: calc(100vh);
}

.q-scrollarea :deep(.q-scrollarea__thumb) {
  width: 4px;
  height: 4px;
  margin: 2px;
  background-color: $primary;
  opacity: 1;
}
</style>