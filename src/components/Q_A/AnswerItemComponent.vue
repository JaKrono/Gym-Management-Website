<template>
   <q-item class="row q-py-sm q-px-none" style="line-height: 1.55rem;">
      <div @click="viewAnswerClicked" class="col-12 q-px-sm items-center cursor-pointer">
         <p class="q-mb-md text-secondary ellipsis-2-lines" style="max-height: 49px">پاسخ به
            سوال "<span>{{ model?.questionTitle }}</span>"</p>
         <p class="col-12 ellipsis-3-lines" style="max-height: 74px;">{{ model?.AnswerDetail.content }}</p>
         <div class="col-12 flex justify-between q-pt-md">
            <div class="flex">
               <q-icon name="calendar_month" size="1.4em"></q-icon>
               <p class="q-ml-xs">{{ model?.AnswerDetail.date.substring(0, 10) }}</p>
            </div>
            <div class="flex">
               <q-tooltip anchor="bottom right" :hide-delay="$q.screen.lt.md ? 1500 : 0">امتیاز این پاسخ از نظر
                  کاربران</q-tooltip>
               <q-icon v-if="model?.score && model?.score < 0" name="o_thumb_down" size="1.1em" style="padding-top: 4px"></q-icon>
               <q-icon v-else name="o_thumb_up" size="1.1em" style="padding-top: 4px"></q-icon>
               <p class="q-ml-xs" style="direction: ltr">{{ model?.score }}</p>
            </div>
         </div>
      </div>
   </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
export default defineComponent({
   props: {
      model: {} as PropType<{
         score: number,
         userScore: number,
         questionTitle: string,
         AnswerDetail: {
            id: number,
            content: string,
            date: string,
            writerId: number,
            questionId: number
         },
      }>,
   },
   methods: {
      viewAnswerClicked() {
         this.$emit('viewQuestion', this.model?.AnswerDetail.questionId)
      }
   }
})
</script>
<style lang="scss">

</style>