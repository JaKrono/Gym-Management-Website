<template>
   <q-scroll-area>
      <q-page class="col-12">
         <div class="row col-12 content-center q-px-lg">
            <p class="text-weight-bold">ورزشکارهای تحت تمرین شما</p>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
export default defineComponent({
   data: () => ({
      searchResult: [],
   }),
   methods: {
      ...mapActions({
         searchGym: 'customer/getGymByName'
      }),
   }
})
</script>
<style lang="scss">

</style>