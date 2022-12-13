<template>
   <ArticlePageViewComponent
      v-if="this.state === 0"
   >
   </ArticlePageViewComponent>
   <ArticlePageManageComponent v-else></ArticlePageManageComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import ArticlePageViewComponent from '@/components/Article/ArticlePageViewComponent.vue'
import ArticlePageManageComponent from '@/components/Article/ArticlePageManageComponent.vue'
export default defineComponent({
   components: {
      ArticlePageViewComponent, ArticlePageManageComponent
   },
   data: () => ({
      state: 0,
      categoryList: [
         ['0', 'red-10', 'همه دسته‌ها'],
         ['1', 'indigo-10', 'مکمل‌ها'],
         ['2', 'teal-10', 'تغذیه'],
         ['3', 'brown-10', 'تمرینات ورزشی'],
         ['4', 'brown-4', 'اخلاق ورزشی'],
         ['5', 'green-10', 'شنا'],
         ['6', 'blue-5', 'تجهیزات ورزشی'],
      ],
   }),
   methods: {
      changeState(event: number) {
         this.state = event
      }
   }
})
</script>
<style lang="scss">

</style>