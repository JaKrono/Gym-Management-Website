<template>
   <q-item class="row q-py-sm q-px-none" style="line-height: 1.55rem;">
      <div @click="viewAnswerClicked" class="col-12 q-px-sm items-center cursor-pointer">
         <p class="q-mb-md text-secondary ellipsis-2-lines" style="max-height: 49px">پاسخ به
            سوال "<span>آیا زندگی در باشگاه آقای خانم سلام هوا چطور
               می‌توانم بنشینم آیا حال شما خوب است؟</span>"</p>
         <p class="col-12 ellipsis-3-lines" style="max-height: 74px;">بله برای
            ما می‌توان از کشک بادمجان تمرینات ورزشی مختلف برای تثویت حافظه من شارژر میز باشگاه
            ورزشی .یرایش س.الات مختلف می‌توانند به تقویت عصلات گردن و کمر اما نه همیشه ولی کاش
            شاید اگر تو من بله خیر.</p>
         <div class="col-12 flex justify-between q-pt-md">
            <div class="flex">
               <q-icon name="calendar_month" size="1.4em"></q-icon>
               <p class="q-ml-xs">۲ شهریور ۱۴۰۱</p>
            </div>
            <div class="flex">
               <q-tooltip anchor="bottom right" :hide-delay="$q.screen.lt.md ? 1500 : 0">امتیاز این پاسخ از نظر
                  کاربران</q-tooltip>
               <q-icon v-if="true" name="o_thumb_up" size="1.1em" style="padding-top: 4px"></q-icon>
               <q-icon v-if="false" name="o_thumb_down" size="1.1em" style="padding-top: 4px"></q-icon>
               <p class="q-ml-xs">۴</p>
            </div>
         </div>
      </div>
   </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
   methods: {
      viewAnswerClicked() {
         console.log("ASDASD")
      }
   }
})
</script>
<style lang="scss">

</style>