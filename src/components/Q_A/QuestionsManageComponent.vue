<template>
   <q-scroll-area>
      <q-page>
         <div class="row q-pa-md q-pa-md-lg">
            <div class="row items-center justify-between col-12">
               <p class="font-size-up-4 text-weight-bold">پرسش و پاسخ‌های من</p>
               <div class="row col-12 col-sm-auto q-mt-md q-mt-sm-none">
                  <q-btn class="col-12 col-sm-auto q-mr-sm-xs" @click="viewAllQuestionsClicked" color="secondary">همه
                     پرسش و پاسخ‌ها</q-btn>
                  <q-btn @click="newQuestionClicked" class="col-12 col-sm-auto q-mt-xs q-mt-sm-none q-ml-sm-xs lt-md"
                     color="primary">ایجاد پرسش
                     جدید</q-btn>
               </div>
            </div>
            <div class="q-pt-md col-12">
               <div v-if="$q.screen.gt.sm" class="row q-col-gutter-md">
                  <div class="row col-12 col-md-7">
                     <div class="col-12">
                        <div class="col-12 row items-center q-pa-sm bg-grey-2 rounded-borders" style="height: 56px">
                           <div class="col-12 row justify-between items-center">
                              <p class="font-size-up-1 text-weight-bold">پرسش‌های من</p>
                              <q-btn @click="newQuestionClicked" color="primary">ایجاد پرسش جدید</q-btn>
                           </div>
                        </div>
                        <div style="position: relative">
                           <q-inner-loading :showing="!questionsLoaded" color="primary" />
                           <q-list v-if="questionsLoaded && userQuestions.length > 0" class="q-mt-sm" separator>
                              <QuestionItemComponent v-for="question in userQuestions" :model="question"
                                 @viewQuestion="viewQuestion"></QuestionItemComponent>
                           </q-list>
                           <div class="q-pa-sm" v-if="questionsLoaded && userQuestions.length < 1">
                              <p>شما تا کنون هیچ پرسشی ایجاد نکرده‌اید.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row col-12 col-md-5">
                     <div class="col-12">
                        <div class="flex items-center q-pa-sm bg-grey-2 rounded-borders" style="height: 56px">
                           <p class="font-size-up-1 text-weight-bold">پاسخ‌های من</p>
                        </div>
                        <div style="position: relative">
                           <q-inner-loading :showing="!answersLoaded" color="primary" />
                           <q-list v-if="answersLoaded && userAnswers.length > 0" class="q-mt-sm" separator>
                              <AnswerItemComponent @viewQuestion="viewQuestion" v-for="answer in userAnswers"
                                 :model="answer">
                              </AnswerItemComponent>
                           </q-list>
                           <div class="q-pa-sm" v-if="answersLoaded && userAnswers.length < 1">
                              <p>شما تا کنون به هیچ پرسشی پاسخ نداده‌اید.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div v-else>
                  <div class="col-12 row items-end border-bottom">
                     <!-- <q-btn class="col-12"></q-btn> -->
                     <q-btn @click="selectClicked(1)" class="col-grow selector-button" :flat="getButtonFlat(1)"
                        color="secondary">
                        <p class="font-size-up-2">پرسش‌ها</p>
                     </q-btn>
                     <q-btn @click="selectClicked(2)" class="col-grow selector-button" :flat="getButtonFlat(2)"
                        color="secondary">
                        <p class="font-size-up-2">پاسخ‌ها</p>
                     </q-btn>
                  </div>
                  <div v-if="showQuestions">
                     <q-inner-loading :showing="!questionsLoaded" color="primary" />
                     <q-list v-if="questionsLoaded && userQuestions.length > 0" class="q-mt-sm" separator>
                        <QuestionItemComponent v-for="question in userQuestions" :model="question"
                           @viewQuestion="viewQuestion"></QuestionItemComponent>
                     </q-list>
                     <div class="q-pa-sm" v-if="questionsLoaded && userQuestions.length < 1">
                        <p>شما تا کنون هیچ پرسشی ایجاد نکرده‌اید.</p>
                     </div>
                  </div>
                  <div v-else>
                     <q-inner-loading :showing="!answersLoaded" color="primary" />
                     <q-list v-if="answersLoaded && userAnswers.length > 0" class="q-mt-sm" separator>
                        <AnswerItemComponent @viewQuestion="viewQuestion" v-for="answer in userAnswers" :model="answer">
                        </AnswerItemComponent>
                     </q-list>
                     <div class="q-pa-sm" v-if="answersLoaded && userAnswers.length < 1">
                        <p>شما تا کنون به هیچ پرسشی پاسخ نداده‌اید.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import QuestionItemComponent from './QuestionItemComponent.vue';
import AnswerItemComponent from './AnswerItemComponent.vue';
import { mapActions, mapState } from 'vuex';
import { CategoryList } from '@/common/category-list';
export default defineComponent({
   components: {
      QuestionItemComponent,
      AnswerItemComponent
   },
   data: () => ({
      CategoryList,
      answersLoaded: false,
      questionsLoaded: false,
      userAnswers: [{}] as [{
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
      }],
      userQuestions: [{}] as [{
         score: number,
         userScore: number,
         answercount: number,
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
      }],
      showQuestions: true,
   }),
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
      }),
   },
   methods: {
      ...mapActions({
         getUserAnswersAM: 'q_a/getUserAnswers',
         getWriterDetailAM: 'q_a/getWriterDetail',
         getUserQuestionsAM: 'q_a/getUserQuestions',
      }),
      viewAllQuestionsClicked() {
         this.$emit('viewAllClicked', 1)
      },
      selectClicked(id: number) {
         if (id === 1) {
            this.showQuestions = true
         } else if (id === 2) {
            this.showQuestions = false
         }
      },
      getButtonFlat(id: number) {
         if (this.showQuestions) {
            return id === 2
         } else {
            return id === 1
         }
      },
      newQuestionClicked() {
         this.$emit('newQuestion', 3)
      },
      viewQuestion(questionId: number) {
         this.$emit('viewQuestion', questionId)
      },
      async getUserAnswers() {
         this.answersLoaded = false
         this.userAnswers = await this.getUserAnswersAM(this.userId)
         this.answersLoaded = true
      },
      async getUserQuestions() {
         this.questionsLoaded = false
         this.userQuestions = await this.getUserQuestionsAM(this.userId)
         for (const question of this.userQuestions) {
            question.questionDetail.writerDetail = await this.getWriterDetailAM(question.questionDetail.writerId)
            question.questionDetail.categoryLabel = CategoryList[Number(question.questionDetail.category) - 1].title
         }
         this.questionsLoaded = true
      }
   },
   async mounted() {
      await this.getUserAnswers()
      await this.getUserQuestions()
      // console.log(this.userQuestions)
      // console.log(this.userAnswers)
   }
})
</script>
<style lang="scss" scoped>
.selector-button {
   border-bottom-left-radius: 0px;
   border-bottom-right-radius: 0px;
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
}

.border-bottom {
   border-bottom-style: solid;
   border-bottom-color: $secondary;
   border-bottom-width: 2px;
}

.q-inner-loading {
   background-color: rgba(0, 0, 0, 0);
}
</style>