<template>
   <ArticleReadComponent @edit="changeState" :model="article" v-if="state === 2"></ArticleReadComponent>
   <ArticleEditComponent @discardEdit="changeState" @saveEdit="submitEdittedArticle" :model="article"
      :isNewArticle="false" v-else-if="state === 1"></ArticleEditComponent>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ArticleReadComponent from '@/components/Article/ArticleReadComponent.vue'
import ArticleEditComponent from '@/components/Article/ArticleEditComponent.vue'
import type { CategoryModel } from '@/common/interfaces';
import { CategoryList } from '@/common/category-list';
import type { ArticleDetailModel } from '@/common/interfaces';
import { ArticleService } from "@/repositories/index";

export default defineComponent({
   components: {
      ArticleReadComponent,
      ArticleEditComponent
   },
   async beforeMount() {
      if (!this.$route.query.articleId) {
         return;
      }

      this.articleId = (this.$route.query.articleId)?.toString();

      await this.getArticleList();
      // this.article = {
      //    id: '0',
      //    title: 'کراتین چیست؟',
      //    description: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است.',
      //    articleContent: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است. ساختار شیمیایی این مکمل شبیه آمینواسیدهاست. بدن به‌طور طبیعی، کراتین را از آمینواسیدهای گلیسین و آرژنین تولید می‌کند. عواملی که بر میزان ذخایر کراتین در بدن تاثیر می‌گذارند شامل مصرف گوشت، ورزش کردن، میزان حجم عضلات و سطح هورمون‌های تستوسترون و (IGF-1) هستند. حدود ۹۵ درصدِ کراتین به‌صورت فسفوکراتین در عضلات ذخیره می‌شود، ۵ درصد باقی‌مانده نیز در مغز، کلیه و کبد ذخیره می‌شود. وقتی کراتین را به‌صورت مکمل مصرف می‌کنید ذخایر فسفوکراتین بدن را افزایش می‌دهید. فسفوکراتین درون سلول‌ها به تولید مولکولی پرانرژی به نام ATP کمک می‌کند. وقتی ATP بیشتری داشته باشید بدن می‌تواند درطول تمرینات، بهتر عمل کند. همچنین کراتین سبب بهبود فرایند‌هایی مثل افزایش حجم عضلات، قدرت و ریکاوری می‌شود.',
      //    readDuration: '5',
      //    picUrl: 'creatine.jpg',
      //    writerId: '0',
      //    writerName: 'بیژن مرتضوی‌زاده اصل',
      //    articleCategory: '1,6',
      //    isValid: true,
      //    createDate: '۲۳ فروردین ۱۴۰۱' // year month day
      // }
   },
   data: () => ({
      state: 2,
      articleId: '',
      article: {} as ArticleDetailModel
   }),
   methods: {
      viewWriterClicked() {
         let params = {
            coachId: this.article.writerId,
            gymId: String(this.$store.state.user.gym.id),
            isCoach: String((this.$store.state.user.role === 1))
         };

         this.$router.push({ path: '/coach-profile', query: params })
      },
      submitEdittedArticle() {

      },
      changeState(event: number) {
         this.state = event
      },
      async getArticleList() {
         let articleList: ArticleDetailModel[] = [];

         try {
            const result = await ArticleService.getArticleList();
            if (result.status === 200) {
               articleList = result.data;
            }
            else {
               articleList = [];
            }
         }
         catch (err) { }

         articleList.forEach(item => {
            if (item.id === this.articleId) {
               this.article = item;
               return;
            }
         });
      },
   }
})
</script>
<style lang="scss">

</style>