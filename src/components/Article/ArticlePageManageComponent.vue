<template>
   <q-scroll-area :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle">
      <q-page class="column q-pa-lg">
         <div class="row justify-between items-center">
            <p class="col-xs-12 col-sm-auto text-weight-bold font-size-up-4">مدیریت مقالات</p>
            <div class="row col-xs-12 col-sm-grow justify-end">
               <q-btn @click="viewArticlesPageClicked" class="col-xs-12 col-sm-auto q-mr-xs-none q-mr-sm-sm q-my-xs-sm q-my-sm-none"
                  color="secondary">مشاهده مقالات</q-btn>
               <q-btn @click="writeArticleClicked" class="col-xs-12 col-sm-auto" color="primary">نوشتن مقاله جدید</q-btn>
            </div>
         </div>
         <div class="column items-stretch q-mt-md">
            <p class="q-mb-xs text-weight-bold">مقالات من</p>
            <div class="row col q-mb-xs">
               <div class="row q-col-gutter-sm">
                  <div v-for="article in articleList" :key="article.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                     <ArticleCardComponent :model="article" :dense="true"
                        :categoryList="getCategoryList(article.categoriesId)">
                     </ArticleCardComponent>
                  </div>
               </div>
            </div>
            <div class="column col q-mt-md" v-if="true">
               <p class="text-weight-bold">مقالات تایید نشده</p>
               <p class="q-mb-xs">لطفا مقالات زیر را خوانده و درستی آنها را تایید کنید.</p>
               <div class="row col">
                  <div class="row q-col-gutter-sm">
                     <div v-for="article in articleList" :key="article.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <ArticleCardComponent :model="article" :dense="true"
                           :categoryList="getCategoryList(article.categoriesId)">
                        </ArticleCardComponent>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import ArticleCardComponent from '@/components/Article/ArticleCardComponent.vue';
import { getCssVar } from 'quasar';
export default defineComponent({
   props: ['articleList'],
   components: {
      ArticleCardComponent
   },
   data: () => ({
      categoryList: [
         ['0', 'red-10', 'همه دسته‌ها'],
         ['1', 'indigo-10', 'مکمل‌ها'],
         ['2', 'teal-10', 'تغذیه'],
         ['3', 'brown-10', 'تمرینات ورزشی'],
         ['4', 'brown-4', 'اخلاق ورزشی'],
         ['5', 'green-10', 'شنا'],
         ['6', 'blue-5', 'تجهیزات ورزشی'],
      ],
      pageScrollThumbStyle: {
         width: '4px',
         left: '1.5px',
         borderRadius: '5px',
         backgroundColor: getCssVar('primary'),
         opacity: 1
      },
      pageScrollBarStyle: {
         width: '7px',
         backgroundColor: getCssVar('primary'),
         opacity: 0.4,
      }
   }),
   methods: {
      viewArticlesPageClicked() {
         this.$emit('view', 0)
      },
      writeArticleClicked() {

      },
      getCategoryList(commaSeperatedIds: string) {
         let result: string[][] = []
         for (var index of commaSeperatedIds.split(',')) {
            result.push(this.categoryList[parseInt(index)])
         }
         return result
      }
   }
})
</script>
<style scoped lang="scss">
.bottom-border-black {
   border-bottom-style: solid;
   border-color: $dark;
   border-bottom-width: 3px;
   border-bottom-left-radius: 0px;
   border-bottom-right-radius: 0px;
}
</style>