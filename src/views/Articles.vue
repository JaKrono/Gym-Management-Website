<template>
   <ArticlePageViewComponent @manage="changeState" :articleList="articleList" v-if="state === 1">
   </ArticlePageViewComponent>
   <ArticlePageManageComponent @view="changeState" @edit="changeState" :articleList="articleList"
      v-else-if="state === 2">
   </ArticlePageManageComponent>
   <ArticleEditComponent @discardEdit="changeState" @submitEdit="submitEdittedArticle" :model="emptyArticleModel" :isNewArticle="true"
      v-else-if="state === 3">
   </ArticleEditComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { ArticleDetailModel, ChangeArticleDetailModel } from '@/common/interfaces';
import ArticlePageViewComponent from '@/components/Article/ArticlePageViewComponent.vue'
import ArticlePageManageComponent from '@/components/Article/ArticlePageManageComponent.vue';
import { ArticleService } from "@/repositories/index";
import ArticleEditComponent from '@/components/Article/ArticleEditComponent.vue';

export default defineComponent({
   components: {
      ArticlePageViewComponent,
      ArticlePageManageComponent,
      ArticleEditComponent
   },
   data: () => ({
      articleList: [] as ArticleDetailModel[],
      state: 1,   // 1 => ArticlePageViewComponent // 2 => ArticlePageManageComponent // 3 => ArticleEditComponent
      emptyArticleModel: {} as ChangeArticleDetailModel
   }),
   async mounted() {
      await this.getArticleList();
   },
   beforeMount() {
      this.emptyArticleModel = {
         title: '',
         description: '',
         articleContent: '',
         readDuration: '',
         picUrl: '',
         writerId: '',
         writerName: '',
         articleCategory: '',
         isValid: false,
         articleDescription: ''
      }
   },
   methods: {
      changeState(event: number) {
         this.state = event
      },
      async getArticleList() {
         try {
            const result = await ArticleService.getArticleList();
            if (result.status === 200) {
               this.articleList = result.data;
            }
            else {
               this.articleList = [];
            }
         }
         catch (err) { }

         // this.articleList = [
         //    {
         //       id: '0',
         //       title: 'کراتین چیست؟',
         //       description: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است.',
         //       articleContent: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است. ساختار شیمیایی این مکمل شبیه آمینواسیدهاست. بدن به‌طور طبیعی، کراتین را از آمینواسیدهای گلیسین و آرژنین تولید می‌کند. عواملی که بر میزان ذخایر کراتین در بدن تاثیر می‌گذارند شامل مصرف گوشت، ورزش کردن، میزان حجم عضلات و سطح هورمون‌های تستوسترون و (IGF-1) هستند. حدود ۹۵ درصدِ کراتین به‌صورت فسفوکراتین در عضلات ذخیره می‌شود، ۵ درصد باقی‌مانده نیز در مغز، کلیه و کبد ذخیره می‌شود. وقتی کراتین را به‌صورت مکمل مصرف می‌کنید ذخایر فسفوکراتین بدن را افزایش می‌دهید. فسفوکراتین درون سلول‌ها به تولید مولکولی پرانرژی به نام ATP کمک می‌کند. وقتی ATP بیشتری داشته باشید بدن می‌تواند درطول تمرینات، بهتر عمل کند. همچنین کراتین سبب بهبود فرایند‌هایی مثل افزایش حجم عضلات، قدرت و ریکاوری می‌شود.',
         //       readDuration: '5',
         //       picUrl: 'creatine.jpg',
         //       writerId: '0',
         //       writerName: 'بیژن مرتضوی‌زاده اصل',
         //       articleCategory: '3,3',
         //       isValid: false,
         //       createDate: '۲۳ فروردین ۱۴۰۱' // year month day
         //    },
         //    {
         //       id: '1',
         //       title: 'آیا شما هم از نداشتن یک رژیم غذایی رنج می‌برید؟',
         //       description: 'یک متن توضیحات.',
         //       articleContent: 'شسی',
         //       readDuration: '۱۲',
         //       picUrl: 'player.jpg',
         //       writerId: '0',
         //       writerName: 'خر شرک',
         //       articleCategory: '2,6',
         //       isValid: false,
         //       createDate: '۲ خرداد ۱۴۰۰'
         //    },
         //    {
         //       id: '2',
         //       title: 'آیا شما هم از نداشتن یک رژیم غذایی رنج می‌برید؟',
         //       description: 'یک متن توضیحات. Description it is. دسکریپشتن را ببینید.',
         //       articleContent: 'شسی',
         //       readDuration: '123',
         //       picUrl: '',
         //       writerId: '0',
         //       writerName: 'خر شرک',
         //       articleCategory: '1,6',
         //       isValid: false,
         //       createDate: '۲ خرداد ۱۴۰۰'
         //    }
         // ]

      },
      submitEdittedArticle() {

      }
   }
})
</script>
<style lang="scss">

</style>