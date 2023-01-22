<template>
   <q-scroll-area v-if="shownPage" :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle">
      <q-page class="column q-pa-lg">
         <div class="row justify-between items-center">
            <p class="col-xs-12 col-sm-auto text-weight-bold font-size-up-4">مدیریت مقالات</p>
            <div class="row col-xs-12 col-sm-grow justify-end">
               <q-btn @click="viewArticlesPageClicked"
                  class="col-xs-12 col-sm-auto q-mr-xs-none q-mr-sm-sm q-my-xs-sm q-my-sm-none" color="secondary">مشاهده
                  مقالات</q-btn>
               <q-btn @click="writeNewArticleClicked" class="col-xs-12 col-sm-auto" color="primary">نوشتن مقاله
                  جدید</q-btn>
            </div>
         </div>
         <div class="column q-mt-md">
            <p class="q-mb-xs text-weight-bold">مقالات من</p>
            <div class="row col q-mb-xs">
               <div class="row q-col-gutter-sm">
                  <div v-for="article in myArticleList" :key="article.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                     <ArticleCardComponent :model="article" :dense="true"></ArticleCardComponent>
                  </div>
               </div>
            </div>
            <div class="column col q-mt-md" v-if="true">
               <q-separator class="q-mb-sm" size="2px" color="secondary"></q-separator>
               <p class="text-weight-bold">مقالات تایید نشده</p>
               <p class="q-mb-xs">لطفا مقالات زیر را خوانده و درستی آنها را تایید کنید.</p>
               <div class="row col">
                  <div class="row q-col-gutter-sm">
                     <div v-for="article in unValidArticleList" :key="article.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                        <ArticleCardComponent :model="article" :dense="true"></ArticleCardComponent>
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
import type { ArticleDetailModel } from '@/common/interfaces';

export default defineComponent({
   props: ['articleList'],
   components: {
      ArticleCardComponent
   },
   mounted() {
      setTimeout(() => {
         let tempList: ArticleDetailModel[] = this.articleList;
         let userId = this.$store.state.user.userId;

         this.myArticleList = tempList.filter(item => item.writerId === userId);
         this.unValidArticleList = tempList.filter(item => !item.isValid);

         this.shownPage = true;
      }, 10);
   },
   data: () => ({
      shownPage: false,
      myArticleList: [] as ArticleDetailModel[],
      unValidArticleList: [] as ArticleDetailModel[],
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
         this.$emit('view', 1)
      },
      writeNewArticleClicked() {
         this.$emit('edit', 3)
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