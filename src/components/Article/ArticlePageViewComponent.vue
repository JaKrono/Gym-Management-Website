<template>
   <q-scroll-area :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle">
      <q-page class="q-pa-lg">
         <div class="row justify-between overflow-none items-center col-12 q-mb-md">
            <div class="">
               <p class="text-weight-bold font-size-up-4">مقالات</p>
            </div>
            <div class="col-xs-6 col-sm-auto">
               <div class="row items-center content-center">
                  <q-toggle class="justify-center col-xs-12 col-sm-auto q-pr-sm" v-model="myArticlesSelected" color="primary" label="مقالات من" />
                  <q-btn class="col-xs-12 col-sm-auto" color="primary">مدیریت مقالات</q-btn>
               </div>
            </div>
         </div>
         <div class="row col-12 q-mb-md">
            <q-scroll-area class="row" :thumb-style="categoryScrollThumbStyle" :bar-style="categoryScrollBarStyle"
               style="height: 46px; width: 100%;">
               <div class="row no-wrap" style="width: 100%">
                  <div v-for="category in categoryList" class="col-grow">
                     <q-btn @click="categoryClicked(Number(category[0]))" :color="getButtonColor(Number(category[0]))"
                        :flat="getButtonFlat(Number(category[0]))" square class="ellipsis bottom-border-black"
                        style="width: 100%">
                        {{ category[2] }}
                     </q-btn>
                  </div>
               </div>
            </q-scroll-area>
         </div>
         <div class="row col-12">
            <div class="col">
               <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                  <div v-for="article in articleList" :key="article.id" class="col-xs-12 col-lg-6 col-xl-4">
                     <ArticleCardComponent :model="article" :categoryList="getCategoryList(article.categoriesId)">
                     </ArticleCardComponent>
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
   components: {
      ArticleCardComponent
   },
   data: () => ({
      selectedCategory: 0,
      myArticlesSelected: false,
      categoryList: [
         ['0', 'red-10', 'همه دسته‌ها'],
         ['1', 'indigo-10', 'مکمل‌ها'],
         ['2', 'teal-10', 'تغذیه'],
         ['3', 'brown-10', 'تمرینات ورزشی'],
         ['4', 'brown-4', 'اخلاق ورزشی'],
         ['5', 'green-10', 'شنا'],
         ['6', 'blue-5', 'تجهیزات ورزشی'],
      ],
      articleList: [
         {
            id: '0',
            title: 'کراتین چیست؟',
            description: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است.',
            articleContent: 'شسی',
            readDuration: '5',
            picUrl: 'creatine.jpg',
            writerId: '0',
            writerName: 'بیژن مرتضوی‌زاده اصل',

            categoriesId: '3,3',
            valid: true,
            date: '۲۳ فروردین ۱۴۰۱' // year month day
         },
         {
            id: '1',
            title: 'آیا شما هم از نداشتن یک رژیم غذایی رنج می‌برید؟',
            description: 'یک متن توضیحات.',
            articleContent: 'شسی',
            readDuration: '۱۲',
            picUrl: 'player.jpg',
            writerId: '0',
            writerName: 'خر شرک',

            categoriesId: '2,6',
            valid: true,
            date: '۲ خرداد ۱۴۰۰'
         },
         {
            id: '2',
            title: 'آیا شما هم از نداشتن یک رژیم غذایی رنج می‌برید؟',
            description: 'یک متن توضیحات. Description it is. دسکریپشتن را ببینید.',
            articleContent: 'شسی',
            readDuration: '123',
            picUrl: '',
            writerId: '0',
            writerName: 'خر شرک',

            categoriesId: '1,6',
            valid: true,
            date: '۲ خرداد ۱۴۰۰'
         }
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
      categoryClicked(categoryId: number) {
         this.selectedCategory = categoryId
      },
      getButtonColor(categoryId: number) {
         if (this.selectedCategory === categoryId)
            return this.categoryList[categoryId][1]
         else
            return '?' // What is the default color of a button?
      },
      getButtonFlat(categoryId: number) {
         if (this.selectedCategory === categoryId)
            return false
         else
            return true
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