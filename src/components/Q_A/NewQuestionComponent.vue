<template>
   <!-- <h3>Here it is: {{ $route.params.id }}</h3> -->
   <q-scroll-area>
      <q-page>
         <div class="q-pa-md q-pa-md-lg">
            <q-form greedy @submit.prevent="submitQuestion" @validation-error="validateCategory" class="row">
               <div class="row col-12">
                  <p class="text-weight-bold col-12 q-mt-sm" v-if="isDense">عنوان پرسش</p>
                  <q-input class="col-12" type="text" lazy-rules v-model="question.title" autogrow :dense="isDense"
                     :rules="[rules.qaTitle]">
                     <template v-slot:before v-if="!isDense">
                        <p>عنوان پرسش</p>
                     </template>
                  </q-input>
               </div>
               <div class="row col-12">
                  <div class="row col-12 col-sm-8 col-md-7 col-lg-6 q-mt-xs-md q-mt-sm-lg q-pt-sm-sm">
                     <p class="text-weight-bold col-12 col-sm-auto q-pt-sm q-mb-xs-sm q-mb-sm-none"
                        style="min-width: 90px">موضوع پرسش</p>
                     <q-expansion-item class="col-grow" header-class="row" dense>
                        <template v-slot:header>
                           <div class="items-center self-start">
                              <div class="q-mr-xs"
                                 v-if="question.category.length > 0 && question.category !== 'NOTDEFINED'">
                                 <q-badge @click.stop="clearCategorySelection()" lazy-load
                                    class="q-pa-sm cursor-pointer" rounded :color="selectedCategory.color">
                                    <template v-slot:default>
                                       <div class="flex items-center">
                                          <q-icon name="highlight_off" class="font-size-up-5 q-mr-xs">
                                          </q-icon>
                                          <p class="font-size-up-1">{{ selectedCategory.title }}</p>
                                       </div>
                                    </template>
                                 </q-badge>
                              </div>
                              <div class="flex items-cnter text-error q-pt-xs" v-if="showCategoryError">
                                 <q-icon name="error" size="1.5rem"></q-icon>
                                 <p class="q-mt-xs q-ml-xs">لطفا یک موضوع برای پرسش انتخاب کنید.</p>
                              </div>
                           </div>
                        </template>
                        <template v-slot:default>
                           <div class="row q-py-xs" v-for="c in CategoryList">
                              <q-btn @click="addCategoryToSelection(c)" class="col-12" :color="c.color">
                                 {{ c.title }}
                              </q-btn>
                           </div>
                        </template>
                     </q-expansion-item>
                  </div>
               </div>
               <div class="row col-12 q-mt-xs-md">
                  <p class="text-weight-bold col-12 q-mt-sm" v-if="isDense">متن پرسش</p>
                  <q-input type="textarea" class="col-12" lazy-rules autogrow v-model="question.content" :dense="isDense"
                     :rules="[rules.qaContent]">
                     <template v-slot:before v-if="!isDense">
                        <p>متن پرسش</p>
                     </template>
                  </q-input>
               </div>
               <div class="row col-12 q-mt-md">
                  <div class="row col-xs-12 justify-end no-wrap">
                     <q-btn @click="discardClicked" class="q-px-sm-xl col-xs-grow q-mr-xs-sm col-sm-auto"
                        color="secondary">لغو</q-btn>
                     <q-btn type="submit" class="q-px-sm-xl col-xs-grow q-ml-xs-sm col-sm-auto"
                        color="primary">ذخیره</q-btn>
                  </div>
               </div>
            </q-form>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { CategoryModel, NewQuestionModel } from '@/common/interfaces'
import { CategoryList } from '@/common/category-list';
import { mapActions, mapState } from 'vuex';
export default defineComponent({
   data: () => ({
      CategoryList,
      question: {} as NewQuestionModel,
      selectedCategory: {} as CategoryModel,
   }),
   methods: {
      ...mapActions({
         submitQuestionAM: 'q_a/submitQuestion',
      }),
      validateCategory() {
         if (this.question.category === "NOTDEFINED") {
            this.question.category = ''
         }
      },
      clearCategorySelection() {
         this.selectedCategory = {} as CategoryModel
         this.question.category = ''
      },
      addCategoryToSelection(c: CategoryModel) {
         this.selectedCategory = c
         this.question.category = String(c.id)
      },
      async submitQuestion() {
         if (this.question.category && this.question.category.length !== 0 && this.question.category !== 'NOTDEFINED') {
            this.question.writerId = this.userId
            const response = await this.submitQuestionAM(this.question)
            if (response) {
               // console.log(response)
               this.$router.push(`/questions/${response.id}`)
            }
         }
      },
      discardClicked() {
         this.$emit('endWriting', 2)
      }
   },
   computed: {
      ...mapState({
         userId: (state: any) => state.user.userId,
      }),
      isDense() {
         return this.$q.screen.lt.sm ? true : false
      },
      showCategoryError() {
         return this.question.category === ''
      }
   },
   beforeMount() {
      this.question.category = 'NOTDEFINED'
   }
})
</script>
<style scoped lang="scss">
.text-error {
   color: $negative;
   font-size: 12px;
}

.q-expansion-item :deep(.q-item:hover) {
   color: white;
}

.q-expansion-item :deep(.q-item:focus) {
   color: white;
}

.q-expansion-item :deep(.q-item) {
   padding-left: 0px;
   padding-right: 0px;
}

.q-expansion-item :deep(.q-item__section--side) {
   padding-right: 0px;
}

.q-field :deep(.q-field__before) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
   width: 90px;
}

.q-input :deep(.q-field__before) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
   width: 90px
}

.q-input :deep(.q-field__native) {
   text-align: left;
   color: $dark;
}

.q-input :deep(.q-field__after) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
}

.q-textarea :deep(.q-field__before) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
   width: 90px
}

.q-textarea :deep(.q-field__native) {
   text-align: left;
   color: $dark;
   line-height: 1.8em;
   // height: 150px !important;
}

.q-textarea :deep(.q-field__after) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
}

.q-input :deep(input::-webkit-inner-spin-button) {
   -webkit-appearance: none;
   margin: 0;
}

.q-input :deep(input[type=number]) {
   -moz-appearance: textfield;
   margin: 0;
}
</style>