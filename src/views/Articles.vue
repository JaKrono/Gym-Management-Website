<template>
   <ArticlePageViewComponent @manage="changeState" :articleList="articleList" v-if="this.state === 0"></ArticlePageViewComponent>
   <ArticlePageManageComponent @view="changeState" :articleList="articleList" v-else></ArticlePageManageComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import ArticlePageViewComponent from '@/components/Article/ArticlePageViewComponent.vue'
import ArticlePageManageComponent from '@/components/Article/ArticlePageManageComponent.vue'
export default defineComponent({
   components: {
      ArticlePageViewComponent,
      ArticlePageManageComponent
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
      articleList: [
         {
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
            valid: false,
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