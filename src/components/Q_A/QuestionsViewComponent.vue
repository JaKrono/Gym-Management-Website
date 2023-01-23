<template>
   <q-scroll-area>
      <q-page>
         <div class="row q-pa-md q-pa-md-lg">
            <div class="row items-center justify-between col-12">
               <p class="font-size-up-4 text-weight-bold">پرسش و پاسخ</p>
               <div class="row col-12 col-sm-auto q-mt-md q-mt-sm-none">
                  <q-btn @click="viewMyQuestionsClicked" class="col-12 col-sm-auto q-mr-sm-xs" color="secondary">پرسش و
                     پاسخ‌های من</q-btn>
               </div>
            </div>
            <div class="q-pt-md col-12">
               <div class="row col-12 q-col-gutter-md">
                  <!-- <div class="row col-12 col-md-5" :style="[$q.screen.lt.md ? { order: 1 } : { order: 2 }]">
                     <div class="col-12">
                        <div class="flex no-wrap items-center justify-between q-pa-sm bg-grey-2 rounded-borders"
                           style="height: 56px">
                           <p class="font-size-up-1 text-weight-bold">پرسش و پاسخ‌های من</p>
                           <q-btn @click="viewMyQuestionsClicked" class="q-px-sm" color="secondary">مشاهده</q-btn>
                        </div>
                        Qs then As / Max 10 / If nothing then show this
                        <p>شما تا کنون در پرسش و پاسخی مشارکت نداشته‌اید.</p>
                        <div>
                           <q-list class="q-mt-sm" separator>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)" dense></QuestionItemComponent>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)" dense></QuestionItemComponent>
                              <AnswerItemComponent></AnswerItemComponent>
                              <AnswerItemComponent></AnswerItemComponent>
                           </q-list>
                        </div>
                     </div>
                  </div> -->
                  <div class="row col-12" :style="[$q.screen.lt.md ? { order: 2 } : { order: 1 }]">
                     <div class="col-12">
                        <div class="row bg-grey-2 rounded-borders">
                           <q-input class="col-grow q-ma-sm" v-model="searchText" @focus="serachBarFocused" dense
                              clearable outlined
                              :placeholder="searching ? 'متن پرسش را وارد کنید...' : 'جستجو در همه پرسش‌ها...'">
                              <template v-slot:prepend>
                                 <q-icon name="search" />
                              </template>
                           </q-input>
                           <Transition name="slide-fade">
                              <div v-if="searching" class="col-12 q-px-sm">
                                 <div class="row justify-between items-center q-pb-sm">
                                    <p class="col-12 col-sm-auto q-mr-sm-sm q-mt-sm q-mt-sm-none">جستجو در دسته‌بندی</p>
                                    <q-select behavior="menu" transition-show="jump-down" transition-hide="jump-up"
                                       :input-style="{ backgroundColor: 'red' }" class="col-grow" clearable
                                       v-model="selectedCategory" outlined dense :options="categoryOptions" />
                                 </div>
                                 <q-separator />
                                 <div class="row col-12 justify-between q-py-sm">
                                    <q-btn @click="discardSearch" color="primary" flat>لغو</q-btn>
                                    <q-btn @click="applySearch" color="primary">اعمال</q-btn>
                                 </div>
                              </div>
                           </Transition>
                        </div>
                        <div>
                           <q-inner-loading :showing="!hasLoaded" color="primary" />
                           <q-list v-if="hasLoaded && questions.length > 0" class="q-mt-sm" separator>
                              <QuestionItemComponent v-for="q in questions"
                                 @viewQuestion="viewQuestion(q.questionDetail.id)" :model="q"></QuestionItemComponent>
                           </q-list>
                           <div v-if="hasLoaded && questions.length < 1" class="q-pa-sm">
                              <p>پرسشی برای نمایش یافت نشد!</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { CategoryList } from '@/common/category-list';
import QuestionItemComponent from './QuestionItemComponent.vue';
import AnswerItemComponent from './AnswerItemComponent.vue'
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
export default defineComponent({
   components: {
      QuestionItemComponent,
      AnswerItemComponent,
   },
   data: () => ({
      hasLoaded: false,
      searching: false,
      searchText: '',
      selectedCategory: '',
      categoryOptions: [{}],
      questions: [{}] as [{
         score: number,
         userScore: number,
         answerCount: number,
         questionDetail: {
            id: number,
            title: string,
            content: string,
            data: string,
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
      }],
   }),
   methods: {
      ...mapActions({
         searchQuestionsAM: 'q_a/getQuestionsByTitleAndCategory',
         getWriterDetailAM: 'q_a/getWriterDetail',
      }),
      serachBarFocused() {
         this.searching = true
      },
      discardSearch() {
         console.log(this.selectedCategory)
         this.searchText = ''
         this.selectedCategory = ''
         this.searching = false
      },
      async applySearch() {
         this.hasLoaded = false
         this.questions = await this.searchQuestionsAM({ name: this.searchText, category: this.selectedCategory.value })
         if (this.questions) {
            console.log(this.questions)
            for (const q of this.questions) {
               q.questionDetail.writerDetail = await this.getWriterDetailAM(q.questionDetail.writerId)
               q.questionDetail.categoryLabel = CategoryList[Number(q.questionDetail.category) - 1].title
            }
         }
         this.hasLoaded = true
      },
      viewMyQuestionsClicked() {
         this.$emit('manageClicked', 2)
      },
      viewQuestion(questionId: number) {
         this.$emit('viewQuestion', questionId)
      },
      async refreshPage() {
         this.hasLoaded = false
         this.questions = await this.searchQuestionsAM({ name: ' ', category: ' ' })
         if (this.questions) {
            for (const q of this.questions) {
               q.questionDetail.writerDetail = await this.getWriterDetailAM(q.questionDetail.writerId)
               q.questionDetail.categoryLabel = CategoryList[Number(q.questionDetail.category) - 1].title
            }
         }
         // console.log(this.questions)
         this.hasLoaded = true
      }
   },
   async mounted() {
      this.refreshPage()
      this.categoryOptions = CategoryList.map((obj) => { return { label: obj.title, value: obj.id, color: obj.color } })
   }
})
</script>
<style lang="scss" scoped>
.q-inner-loading {
   background-color: rgba(0, 0, 0, 0);
}

.q-input :deep(.q-field__native) {
   text-align: left;
}

.slide-fade-enter-active {
   transition: all 0.3s ease-out;
   // transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
   transition: all 0.3s ease-out;
   // transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
   transform: translateY(-10px);
   opacity: 0;
}
</style>