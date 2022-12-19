<template>
   <q-scroll-area>
      <q-page class="col-12">
         <div class="row col-12 content-center q-px-lg">
            <p class="text-weight-bold">مربی عزیز، وقت به خیر!</p>
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
      clubs: [{ name: 'باشگاه دانشگاه علم و صنعت ایران شعبه آقایان علی‌الخصوص بیژن مرتضوی', img: 'gym1.jpg' },
      { name: 'زورخانه پهلوان بیژن مرتضوی', img: 'gym5.jpg' },
      { name: 'زورخانه قهرمان بیژن مرتضوی', img: 'gym2.jpg' }],
   }),
   methods: {
      ...mapActions({
         searchGym: 'customer/getGymByName'
      }),
   },
   async mounted() {
      
   }
})
</script>
<style lang="scss">

</style>