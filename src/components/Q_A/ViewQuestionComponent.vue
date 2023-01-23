<template>
   <q-scroll-area>
      <q-page>
         <!-- <h3>Here it is: {{ $route.params.id }}</h3> -->
         <q-inner-loading :showing="!hasLoaded" color="primary" />
         <div class="q-pa-md q-pa-md-lg" v-if="hasLoaded">
            <div class="row">
               <p class="font-size-up-10">{{ questionDetail.questionDetail.title }}</p>
               <!-- <q-separator class="col-12 q-my-md" size="2px"></q-separator> -->
               <div class="row col-12 q-mt-lg no-wrap">
                  <div class="column items-center font-size-up-5 q-mx-md-sm" style="width: 50px; min-width: 50px;">
                     <q-icon @click="updateQuestionScore(0, questionDetail.questionDetail.id)"
                        v-if="questionDetail.userScore === 1" class="q-my-sm cursor-pointer" name="thumb_up"
                        color="primary"></q-icon>
                     <q-icon @click="updateQuestionScore(1, questionDetail.questionDetail.id)"
                        v-else-if="questionDetail.userScore === 0" class="q-my-sm cursor-pointer" name="o_thumb_up"
                        color="secondary"></q-icon>
                     <q-icon @click="updateQuestionScore(1, questionDetail.questionDetail.id)"
                        v-else-if="questionDetail.userScore === -1" class="q-my-sm cursor-pointer" name="o_thumb_up"
                        color="secondary"></q-icon>
                     <p class="q-my-sm text-secondary" style="direction: ltr">{{ questionDetail.score }}</p>
                     <q-icon @click="updateQuestionScore(-1, questionDetail.questionDetail.id)"
                        v-if="questionDetail.userScore === 1" class="q-my-sm cursor-pointer" name="o_thumb_down"
                        color="secondary"></q-icon>
                     <q-icon @click="updateQuestionScore(-1, questionDetail.questionDetail.id)"
                        v-else-if="questionDetail.userScore === 0" class="q-my-sm cursor-pointer" name="o_thumb_down"
                        color="secondary"></q-icon>
                     <q-icon @click="updateQuestionScore(0, questionDetail.questionDetail.id)"
                        v-else-if="questionDetail.userScore === -1" class="q-my-sm cursor-pointer" name="thumb_down"
                        color="primary"></q-icon>
                  </div>
                  <div class="row col">
                     <p class="col-12 font-size-up-1">{{ questionDetail.questionDetail.content }}</p>
                     <div class="row q-mt-sm col-12 justify-between">
                        <div class="q-pb-sm">
                           <p class="bg-blue-grey-1 q-pa-xs rounded-borders" style="width: unset !important">
                              {{
                                 questionDetail.questionDetail.categoryLabel
                              }}
                           </p>
                        </div>
                        <div class="row col-shrink q-pa-sm bg-blue-grey-1 rounded-borders no-wrap"
                           style="max-height: 70px">
                           <div class="flex items-center">
                              <q-icon class="cursor-pointer"
                                 @click="viewWriterClicked(questionDetail.questionDetail.writerId)" v-if="!questionDetail.questionDetail.writerDetail.picUrl ||
                                 questionDetail.questionDetail.writerDetail.picUrl.length === 0" name="person"
                                 size="50px" color="secondary"></q-icon>
                              <q-img v-else @click="viewWriterClicked(questionDetail.questionDetail.writerId)"
                                 class="cursor-pointer" width="50px" height="50px"
                                 :src="questionDetail.questionDetail.writerDetail.picUrl" fit="cover">
                              </q-img>
                           </div>
                           <div class="q-ml-sm">
                              <div class="row col-12">
                                 <p @click="viewWriterClicked(questionDetail.questionDetail.writerId)"
                                    class="cursor-pointer text-primary">{{
                                       questionDetail.questionDetail.writerDetail.username
                                    }}</p>
                              </div>
                              <div class="col-12 q-mt-sm">
                                 <p class="col-shrink">در تاریخ <span class="text-weight-bold">{{
                                    questionDetail.questionDetail.date
                                 }}</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="bg-blue-1 rounded-borders row col-12 q-mt-md q-pa-sm justify-between items-center">
                  <p class="font-size-up-2" v-if="questionDetail.answerCount > 0"><span class="text-weight-bold">{{
                     questionDetail.answerCount
                  }}</span> پاسخ</p>
                  <p class="font-size-up-2" v-else>پاسخی برای این سوال موجود نیست</p>
                  <q-btn @click="writeNewQuestionClicked" class="col-12 col-sm-auto q-mt-sm q-mt-sm-none"
                     color="primary">
                     نوشتن پاسخ جدید
                  </q-btn>
               </div>
               <div class="row col-12" v-for="answer in questionDetail.Answers">
                  <div class="row col-12 no-wrap q-mt-lg">
                     <div class="column items-center font-size-up-5 q-mx-md-sm" style="width: 50px; min-width: 50px;">
                        <q-icon @click="updateAnswerScore(0, answer.answerDetail.id)" v-if="answer.userScore === 1"
                           class="q-my-sm cursor-pointer" name="thumb_up" color="primary"></q-icon>
                        <q-icon @click="updateAnswerScore(1, answer.answerDetail.id)" v-else-if="answer.userScore === 0"
                           class="q-my-sm cursor-pointer" name="o_thumb_up" color="secondary"></q-icon>
                        <q-icon @click="updateAnswerScore(1, answer.answerDetail.id)"
                           v-else-if="answer.userScore === -1" class="q-my-sm cursor-pointer" name="o_thumb_up"
                           color="secondary"></q-icon>
                        <p class="q-my-sm text-secondary" style="direction: ltr">{{ answer.score }}</p>
                        <q-icon @click="updateAnswerScore(-1, answer.answerDetail.id)" v-if="answer.userScore === 1"
                           class="q-my-sm cursor-pointer" name="o_thumb_down" color="secondary"></q-icon>
                        <q-icon @click="updateAnswerScore(-1, answer.answerDetail.id)"
                           v-else-if="answer.userScore === 0" class="q-my-sm cursor-pointer" name="o_thumb_down"
                           color="secondary"></q-icon>
                        <q-icon @click="updateAnswerScore(0, answer.answerDetail.id)"
                           v-else-if="answer.userScore === -1" class="q-my-sm cursor-pointer" name="thumb_down"
                           color="primary"></q-icon>
                        <div v-if="answer.answerDetail.id === questionDetail.questionDetail.acceptedAnswerId">
                           <q-tooltip anchor="bottom left" :hide-delay="$q.screen.lt.md ? 1500 : 0">
                              این پاسخ توسط صاحب سوال قبول شده است.
                           </q-tooltip>
                           <q-icon name="fa-solid fa-check-double" class="q-pt-md" color="positive"></q-icon>
                        </div>
                     </div>
                     <div class="row col">
                        <p class="col-12 font-size-up-1">{{ answer.answerDetail.content }}</p>
                        <div class="col-12 q-my-grow"></div>
                        <div class="row q-mt-sm col-12 justify-end q-py-grow">
                           <q-space></q-space>
                           <div class="row col-shrink q-pa-sm bg-blue-grey-1 rounded-borders no-wrap"
                              style="max-height: 70px">
                              <div class="flex items-center">
                                 <q-icon class="cursor-pointer" @click="viewWriterClicked(answer.answerDetail.writerId)"
                                    v-if="!answer.answerDetail.writerDetail.picUrl ||
                                    answer.answerDetail.writerDetail.picUrl.length === 0" name="person" size="50px"
                                    color="secondary"></q-icon>
                                 <q-img v-else @click="viewWriterClicked(answer.answerDetail.writerId)"
                                    class="cursor-pointer" width="50px" height="50px"
                                    :src="answer.answerDetail.writerDetail.picUrl" fit="cover">
                                 </q-img>
                              </div>
                              <div class="q-ml-sm">
                                 <div class="row col-12">
                                    <p @click="viewWriterClicked(answer.answerDetail.writerId)"
                                       class="col-shrink cursor-pointer text-primary">{{
                                          answer.answerDetail.writerDetail.username
                                       }}</p>
                                 </div>
                                 <div class="col-12 q-mt-sm">
                                    <p class="col-shrink">در تاریخ <span class="text-weight-bold">{{
                                       answer.answerDetail.date
                                    }}</span>
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <q-separator class="col-12 q-mt-lg" size="1px"></q-separator>
               </div>
               <div ref="newAnswerBox" class="bg-blue-grey-1 rounded-borders q-pa-sm col-12 q-mt-lg">
                  <p class="font-size-up-4">پاسخ جدید</p>
                  <q-form ref="newAnswerForm" class="row col-12" greedy @submit.prevent="submitAnswer">
                     <q-input class="col-12 q-mt-md" v-model="newAnswerContent" lazy-rules outlined autogrow dense
                        :rules="[rules.qaContent]"></q-input>
                     <div class="row col-12 q-mt-sm justify-end">
                        <q-btn @click="discardAnswer" color="secondary"
                           class="q-px-xl col col-sm-auto q-mr-xs">لغو</q-btn>
                        <q-btn type="submit" color="primary" class="q-px-xl col col-sm-auto q-ml-xs">ذخیره</q-btn>
                     </div>
                  </q-form>
               </div>
            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { CategoryList } from '@/common/category-list';
import type { NewAnswerModel } from '@/common/interfaces';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
export default defineComponent({
   data: () => ({
      hasLoaded: false,
      CategoryList,
      newAnswerContent: '',
      questionDetail: {} as {
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
         },
         score: number,
         userScore: number,
         answerCount: number,
         Answers: [{
            score: number,
            userScore: number,
            answerDetail: {
               id: number,
               content: string,
               date: string,
               writerId: number,
               writerDetail: {
                  email: string,
                  username: string,
                  picUrl: string,
                  role_id: string,
               },
               questionId: number,
            }
         }],
      },
      questionId: '',
   }),
   methods: {
      ...mapActions({
         getQuestionDetailAM: 'q_a/getSingleQuestionDetail',
         submitAnswerAM: 'q_a/submitAnswer',
         getWriterDetailAM: 'q_a/getWriterDetail',
         updateQuestionScoreAM: 'q_a/updateQuestionScore',
         updateAnswerScoreAM: 'q_a/updateAnswerScore',
      }),
      viewWriterClicked(writerId: number) {

      },
      async updateQuestionScore(score: number, questionId: number) {
         const response = await this.updateQuestionScoreAM({ score: score, userId: this.userId, questionId: questionId })
         if (response) {
            this.questionDetail.userScore = score
            this.questionDetail.score = response.totalScore
         }
      },
      async updateAnswerScore(score: number, answerId: number) {
         const response = await this.updateAnswerScoreAM({ score: score, userId: this.userId, answerId: answerId })
         if (response) {
            this.questionDetail.Answers.map((o) => {
               if (o.answerDetail.id === answerId) {
                  o.userScore = score
                  o.score = response.totalScore
               }
            })
         }
      },
      writeNewQuestionClicked() {
         ; (this.$refs['newAnswerBox'] as any).scrollIntoView({ behavior: 'smooth' })
      },
      async submitAnswer() {
         const newAnswer = {} as NewAnswerModel
         newAnswer.content = this.newAnswerContent
         newAnswer.writerId = this.userId
         newAnswer.questionId = this.questionId
         const response = await this.submitAnswerAM(newAnswer)
         if (response) {
            this.refreshComponent()
         }
      },
      discardAnswer() {
         this.newAnswerContent = ''
            ; (this.$refs['newAnswerForm'] as any).resetValidation()
      },
      async refreshComponent() {
         this.hasLoaded = false
         this.newAnswerContent = ''
         this.questionId = String(this.$route.params.id)
         this.questionDetail = await this.getQuestionDetailAM({ userId: this.userId, questionId: this.questionId })
         if (this.questionDetail) {
            this.questionDetail.questionDetail.categoryLabel = CategoryList[Number(this.questionDetail.questionDetail.category) - 1].title
            this.questionDetail.questionDetail.writerDetail = await this.getWriterDetailAM(this.questionDetail.questionDetail.writerId)
            for (const answer of this.questionDetail.Answers) {
               answer.answerDetail.writerDetail = await this.getWriterDetailAM(answer.answerDetail.writerId)
            }
         }
         this.hasLoaded = true
      },
   },
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
      }),
   },
   mounted() {
      this.refreshComponent()
   }
})
</script>
<style lang="scss" scoped>
p {
   line-height: 1.6em;
}

.q-field :deep(.q-field__native) {
   text-align: left;
   color: $dark;
   line-height: 1.8em;
}
</style>