<template>
   <ArticleReadComponent :model="article" :categoryList="getCategoryList(article.categoriesId)" v-if="editing === 0"></ArticleReadComponent>
   <ArticleEditComponent v-else></ArticleEditComponent>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ArticleReadComponent from '@/components/Article/ArticleReadComponent.vue'
import ArticleEditComponent from '@/components/Article/ArticleEditComponent.vue'
export default defineComponent({
   components: {
      ArticleReadComponent,
      ArticleEditComponent
   },
   data: () => ({
      editing: 0,
      article: {
         id: '0',
         title: 'کراتین چیست؟',
         description: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است.',
         articleContent: 'کراتین ترکیبی است که به‌صورت طبیعی در بافت عضلات یافت می‌شود. این ترکیب به عضله کمک می‌کند تا برای بلند کردن وزنه‌ها، نیرو تولید کند. استفاده از این مکمل برای افزایش اندازه‌ی عضله، قدرت و عملکرد ورزشی در میان ورزشکاران و بدنسازها بسیار متداول است. ساختار شیمیایی این مکمل شبیه آمینواسیدهاست. بدن به‌طور طبیعی، کراتین را از آمینواسیدهای گلیسین و آرژنین تولید می‌کند. عواملی که بر میزان ذخایر کراتین در بدن تاثیر می‌گذارند شامل مصرف گوشت، ورزش کردن، میزان حجم عضلات و سطح هورمون‌های تستوسترون و (IGF-1) هستند. حدود ۹۵ درصدِ کراتین به‌صورت فسفوکراتین در عضلات ذخیره می‌شود، ۵ درصد باقی‌مانده نیز در مغز، کلیه و کبد ذخیره می‌شود. وقتی کراتین را به‌صورت مکمل مصرف می‌کنید ذخایر فسفوکراتین بدن را افزایش می‌دهید. فسفوکراتین درون سلول‌ها به تولید مولکولی پرانرژی به نام ATP کمک می‌کند. وقتی ATP بیشتری داشته باشید بدن می‌تواند درطول تمرینات، بهتر عمل کند. همچنین کراتین سبب بهبود فرایند‌هایی مثل افزایش حجم عضلات، قدرت و ریکاوری می‌شود.',
         readDuration: '5',
         picUrl: 'creatine.jpg',
         writerId: '0',
         writerName: 'بیژن مرتضوی‌زاده اصل',

         categoriesId: '3,3',
         valid: true,
         date: '۲۳ فروردین ۱۴۰۱' // year month day
      },
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
      viewWriterClicked() {

      },
      navigateBackClicked() {

      },
      editClicked() {

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
<style lang="scss">

</style>