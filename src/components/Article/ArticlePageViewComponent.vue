<template>
   <q-scroll-area :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle">
      <q-page class="q-pa-lg">
         <div class="row justify-between items-center col-12 q-mb-md">
            <p class="col-xs-12 col-sm-auto text-weight-bold font-size-up-4">مقالات</p>
            <div class="row col-xs-12 col-sm-grow justify-end">
               <q-btn class="col-xs-12 col-sm-auto q-pa-none q-mr-xs-none q-mr-sm-sm q-my-xs-sm q-my-sm-none" color="secondary">
                  <q-toggle dense class="col-12 justify-center q-px-sm" style="height: 100%" v-model="showOnlyMyArticles">
                     <v-slot: default class="">
                        فقط مقالات من
                     </v-slot:>
                  </q-toggle>
               </q-btn>
               <q-btn @click="manageArticlesPageClicked" class="col-xs-12 col-sm-auto" color="primary">مدیریت مقالات</q-btn>
            </div>
         </div>
         <div class="row col-12 q-mb-md">
            <q-scroll-area class="row" :thumb-style="categoryScrollThumbStyle" :bar-style="categoryScrollBarStyle"
               style="height: 46px; width: 100%;">
               <div class="row no-wrap" style="width: 100%">
                  <div v-for="c in extendedCategoryList" class="col-grow">
                     <q-btn @click="categoryClicked(c.id)" :color="getButtonColor(c.id)"
                        :flat="getButtonFlat(c.id)" square class="ellipsis bottom-border-black-line top-border-rounded"
                        style="width: 100%">
                        {{ c.title }}
                     </q-btn>
                  </div>
               </div>
            </q-scroll-area>
         </div>
         <div class="row col-12">
            <div class="col">
               <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                  <div v-for="article in articleList" :key="article.id" class="col-xs-12 col-md-6 col-xl-4">
                     <ArticleCardComponent :model="article" :dense="false" :commaSperatedCategories="article.categoriesId"></ArticleCardComponent>
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
import { CategoryList } from '@/common/category-list';
import type { CategoryModel } from '@/common/interfaces';
export default defineComponent({
   props: [ 'articleList' ],
   components: {
      ArticleCardComponent
   },
   computed: {
      extendedCategoryList() {
         const result: CategoryModel[] = []
         CategoryList.forEach(val => result.push(Object.assign({}, val)))
         result.unshift({ id: 0, title: 'همه دسته‌ها', color: 'red-10'})
         return result
      } 
   },
   data: () => ({
      CategoryList,
      selectedCategory: 0,
      showOnlyMyArticles: false,
      categoryList: [
         ['0', 'red-10', 'همه دسته‌ها'],
         ['1', 'indigo-10', 'مکمل‌ها'],
         ['2', 'teal-10', 'تغذیه'],
         ['3', 'brown-10', 'تمرینات ورزشی'],
         ['4', 'brown-4', 'اخلاق ورزشی'],
         ['5', 'green-10', 'شنا'],
         ['6', 'blue-5', 'تجهیزات ورزشی'],
      ],
      categoryScrollThumbStyle: {
         height: '4px',
         bottom: '3px',
         borderRadius: '5px',
         backgroundColor: getCssVar('primary'),
         width: '50px',
         opacity: 1
      },
      categoryScrollBarStyle: {
         opacity: 0
      },
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
      manageArticlesPageClicked() {
         this.$emit('manage', 1)
      },
      categoryClicked(categoryId: number) {
         this.selectedCategory = categoryId
      },
      getButtonColor(categoryId: number) {
         if (this.selectedCategory === categoryId){
            return this.extendedCategoryList[categoryId].color}
         else
            return '?' // What is the default color of a button?
      },
      getButtonFlat(categoryId: number) {
         if (this.selectedCategory === categoryId)
            return false
         else
            return true
      }
   }
})
</script>
<style scoped lang="scss">
.bottom-border-black-line {
   border-bottom-style: solid;
   border-color: $dark;
   border-bottom-width: 3px;
   border-bottom-left-radius: 0px;
   border-bottom-right-radius: 0px;
}

.top-border-rounded {
   border-top-right-radius: 15px;
   border-top-left-radius: 15px;
}
</style>