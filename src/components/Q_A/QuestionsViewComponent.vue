<template>
   <q-scroll-area>
      <q-page>
         <div class="row q-pa-sm q-pa-md q-pa-md-lg">
            <div class="flex items-center col-12" style="height: 36px">
               <p class="font-size-up-4 text-weight-bold">پرسش و پاسخ</p>
            </div>
            <div class="q-pt-md col-12">
               <div class="row col-12 q-col-gutter-md">
                  <div class="row col-12 col-md-5" :style="[$q.screen.lt.md ? { order: 1 } : { order: 2 }]">
                     <div class="col-12">
                        <div class="flex no-wrap items-center justify-between q-pa-sm bg-grey-2 rounded-borders"
                           style="height: 56px">
                           <p class="font-size-up-1 text-weight-bold">پرسش و پاسخ‌های من</p>
                           <q-btn @click="viewMyQuestionsClicked" class="q-px-sm" color="secondary">مشاهده</q-btn>
                        </div>
                        <!-- Qs then As / Max 10 / If nothing then show this -->
                        <!-- <p>شما تا کنون در پرسش و پاسخی مشارکت نداشته‌اید.</p> -->
                        <div>
                           <q-list class="q-mt-sm" separator>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)" dense></QuestionItemComponent>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)" dense></QuestionItemComponent>
                              <AnswerItemComponent></AnswerItemComponent>
                              <AnswerItemComponent></AnswerItemComponent>
                           </q-list>
                        </div>
                     </div>
                  </div>
                  <div class="row col-12 col-md-7" :style="[$q.screen.lt.md ? { order: 2 } : { order: 1 }]">
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
                           <q-list class="q-mt-sm" separator>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)"></QuestionItemComponent>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)"></QuestionItemComponent>
                              <QuestionItemComponent @viewQuestion="viewQuestion(1)"></QuestionItemComponent>
                           </q-list>
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
export default defineComponent({
   components: {
      QuestionItemComponent,
      AnswerItemComponent,
   },
   data: () => ({
      searching: false,
      searchText: '',
      categoryOptions: [{}],
      selectedCategory: ''
   }),
   methods: {
      serachBarFocused() {
         this.searching = true
      },
      discardSearch() {
         console.log(this.selectedCategory)
         this.searchText = ''
         this.selectedCategory = '',
            this.searching = false
      },
      applySearch() {

      },
      viewMyQuestionsClicked() {
         this.$emit('manageClicked', 2)
      },
      viewQuestion(questionId: number) {
         this.$emit('viewQuestion', questionId)
      }
   },
   mounted() {
      this.categoryOptions = CategoryList.map((obj) => { return { label: obj.title, value: obj.id, color: obj.color } })
   }
})
</script>
<style lang="scss" scoped>
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