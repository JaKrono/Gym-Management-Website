<template>
   <q-item v-if="dense" class="row q-py-sm q-px-none" style="line-height: 1.55rem;">
      <div @click="viewQuestionClicked" class="col-12 q-px-sm items-center cursor-pointer">
         <p class="col-12 ellipsis-3-lines" style="max-height: 74px;">
            {{ model?.questionDetail?.title }}</p>
         <div class="col-12 flex justify-between q-pt-md text-secondary">
            <div class="flex">
               <q-icon name="calendar_month" size="1.4em"></q-icon>
               <p class="q-ml-xs">{{ model?.questionDetail?.date }}</p>
            </div>
            <p><span class="q-mr-xs">{{ model?.answercount }}</span>پاسخ</p>
         </div>
      </div>
   </q-item>
   <q-item v-else class="items-center q-pa-sm" style="flex-wrap: wrap; line-height: 1.55rem;">
      <div class="flex col-12 q-mb-xs">
         <p v-if="answerCount" class="font-size-down-1 rounded-borders q-px-xs q-mr-sm bg-blue-grey-1"><span
               class="q-mr-xs">{{ model?.answercount }}</span>پاسخ</p>
         <p @click="viewQuestionClicked" class="font-size-up-3 text-primary cursor-pointer">{{
            model?.questionDetail?.title
         }}</p>
      </div>
      <p class="col-12 ellipsis-3-lines q-mb-sm" style="max-height: 74px">{{ model?.questionDetail?.content }}
      </p>
      <div class="col-12 text-secdondary">
         <div class="flex items-center justify-between q-pt-sm">
            <div @click="writerClicked" class="flex items-center cursor-pointer">
               <q-icon name="o_3p" size="1.4em" style="padding-top: 2px"></q-icon>
               <p class="q-ml-xs text-primary">{{ model?.questionDetail?.writerDetail?.username }}</p>
            </div>
            <div class="flex">
               <q-tooltip :hide-delay="$q.screen.lt.lg ? 1500 : 0">امتیاز این پرسش از نظر کابران</q-tooltip>
               <q-icon v-if="model?.score && model?.score < 0" name="o_thumb_down" size="1.1em"
                  style="padding-top: 4px"></q-icon>
               <q-icon v-else name="o_thumb_up" size="1.1em" style="padding-top: 4px"></q-icon>
               <p class="q-ml-xs" style="direction: ltr">{{ model?.score }}</p>
            </div>
         </div>
         <div class="flex justify-between items-center q-pt-sm">
            <div class="flex">
               <q-icon name="calendar_month" size="1.4em"></q-icon>
               <p class="q-ml-xs">{{ model?.questionDetail?.date }}</p>
            </div>
            <p class="bg-blue-grey-1 q-pa-xs rounded-borders">{{ model?.questionDetail?.categoryLabel }}</p>
         </div>
      </div>
   </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { mapActions } from 'vuex';
export default defineComponent({
   props: {
      model: Object as PropType<{
         score: number,
         userScore: number,
         answerCount: number,
         questionDetail: {
            id: number,
            title: string,
            content: string,
            date: string,
            category: string,
            categoryLabel: string,
            writerId: number,
            writerDetail: {
               email: string,
               username: string,
               picUrl: string,
               role_id: string,
            },
            acceptedAnswerId: number,
         }
      }>,
      dense: Boolean,
      answerCount: Boolean,
   },
   data: () => ({
      categoryLabel: 'asd',
   }),
   methods: {
      ...mapActions({
         getWriterDetailAM: 'q_a/getWriterDetail',
      }),
      writerClicked() {
         // this.model?.questionDetail.writerId
      },
      viewQuestionClicked() {
         this.$emit('viewQuestion', this.model?.questionDetail.id)
      }
   },
   async mounted() {
      // console.log(this.model)
   }
})
</script>
<style lang="scss">

</style>