<template>
   <q-item v-if="dense" class="row q-py-sm q-px-none" style="line-height: 1.55rem;">
      <div @click="viewQuestionClicked" class="col-12 q-px-sm items-center cursor-pointer">
         <p class="col-12 ellipsis-3-lines" style="max-height: 74px;">
            نحوه صحیح
            سرد کردن بعد از تمرین
            عضلات پا چگونه است؟</p>
         <div class="col-12 flex justify-between q-pt-md text-secondary">
            <div class="flex">
               <q-icon name="calendar_month" size="1.4em"></q-icon>
               <p class="q-ml-xs">۲ شهریور ۱۴۰۱</p>
            </div>
            <p><span class="q-mr-xs">۴</span>پاسخ</p>
         </div>
      </div>
   </q-item>
   <q-item v-else class="items-center q-pa-sm" style="flex-wrap: wrap; line-height: 1.55rem;">
      <div class="flex col-12 q-mb-xs">
         <p v-if="answerCount" class="font-size-down-1 rounded-borders q-px-xs q-mr-sm bg-blue-grey-1"><span
               class="q-mr-xs">۴</span>پاسخ</p>
         <p @click="viewQuestionClicked" class="font-size-up-3 text-primary cursor-pointer">شسیشسیش</p>
      </div>
      <p class="col-12 ellipsis-3-lines q-mb-sm" style="max-height: 74px">
         متن سوال متن
         سوالمتن
         سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
         متن سوالمتن سوالمتن سوالمتن سوالمتن سوالمتن سوال
      </p>
      <div class="col-12 text-secdondary">
         <div class="flex items-center justify-between q-pt-sm">
            <div @click="writerClicked" class="flex items-center cursor-pointer">
               <q-icon name="o_3p" size="1.4em" style="padding-top: 2px"></q-icon>
               <p class="q-ml-xs text-primary">بیژن مرتضوی‌زاده اصل</p>
            </div>
            <div class="flex">
               <q-tooltip :hide-delay="$q.screen.lt.lg ? 1500 : 0">امتیاز این پرسش از نظر کابران</q-tooltip>
               <q-icon v-if="true" name="o_thumb_up" size="1.1em" style="padding-top: 4px"></q-icon>
               <q-icon v-if="false" name="o_thumb_down" size="1.1em" style="padding-top: 4px"></q-icon>
               <p class="q-ml-xs">۴</p>
            </div>
         </div>
         <div class="flex justify-between items-center q-pt-sm">
            <div class="flex">
               <q-icon name="calendar_month" size="1.4em"></q-icon>
               <p class="q-ml-xs">۲ شهریور ۱۴۰۱</p>
            </div>
            <p class="bg-blue-grey-1 q-pa-xs rounded-borders">تمرینات ورزشی</p>
         </div>
      </div>
   </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
   props: {
      dense: Boolean,
      answerCount: Boolean,
   },
   data: () => ({
      questionId: 1
   }),
   methods: {
      writerClicked() {

      },
      viewQuestionClicked() {
         this.$emit('viewQuestion')
      }
   }
})
</script>
<style lang="scss">

</style>