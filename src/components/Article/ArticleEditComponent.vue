<template>
   <q-scroll-area :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle">
      <q-page class="row q-pa-lg overflow-hidden">
         <q-form @submit.prevent="submitEdit" class="row">
            <div class="column col-xs-12 offset-xs-0 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">

               <div class="row" style="width: 500px">
                  <q-input type="number" style="width: 300px" v-model="model.title" clearable autogrow :dense="isDense"
                     :rules="[rules.required]">
                     <template v-slot:before>
                        <p class="">عنوان مقاله</p>
                     </template>
                  </q-input>
               </div>
               <div class="row">
                  <q-input type="number" min="1" max="300" suffix="دقیقه" class="col-12 col-sm-6 col-lg-4"
                     hint="یک عدد بین ۱ و ۳۰۰" hide-hint v-model="model.readDuration"
                     :rules="[rules.required, rules.readDuration]" input-class="input" :dense="isDense">
                     <template v-slot:before>
                        <p>زمان تقریبی</p>
                     </template>
                  </q-input>
               </div>
               <div class="row">
                  <div class="row col-xs-12 justify-end">
                     <q-btn @click="discardClicked" class="q-px-xl col-xs-grow q-mr-xs-sm col-sm-auto"
                        color="secondary">لغو</q-btn>
                     <q-btn type="submit" class="q-px-xl col-xs-grow q-ml-xs-sm col-sm-auto"
                        color="primary">ذخیره</q-btn>
                  </div>
               </div>
               <div class="row items-center justify-between q-my-sm q-mb-lg-md">
                  <p class="text-weight-bold font-size-up-5 q-py-xs q-pr-sm">{{ model.title }}</p>
               </div>
               <div class="flex no-wrap items-center">
                  <q-icon name="timer" size="1.3em"></q-icon>
                  <p class="q-ml-xs" style="margin-top: 2px">{{ model.readDuration }}
                     دقیقه</p>
               </div>
               <div @click="viewWriterClicked()" class="flex no-wrap items-center cursor-pointer">
                  <q-icon name="fa-solid fa-user-pen"></q-icon>
                  <p class="q-ml-sm">{{ model.writerName }}</p>
               </div>
               <div class="flex no-wrap items-center q-pt-xs">
                  <q-icon name="calendar_month" class="font-size-up-5" style="margin: 0px -2px 2px 0px"></q-icon>
                  <p class="q-ml-xs">{{ model.date }}</p>
               </div>
               <div class="flex items-center q-py-xs q-mb-sm q-mb-lg-md q-mb-xl-lg">
                  <div v-for="item in categoryList" class="col-xs-12 q-mr-xs">
                     <q-badge class="q-pa-sm" rounded :label="item.title" :color="item.color"></q-badge>
                  </div>
               </div>
               <p class="q-mb-md q-mb-md-md q-mb-lg-lg">{{ model.description }}</p>
               <q-img :src="model.picUrl || '?'" alt="Article Image" :ratio="16 / 9" fit="cover"
                  class="rounded-borders q-mb-md q-mb-md-md q-mb-xl-lg">
                  <template v-slot:error>
                     <q-img class="q-pa-lg" alt="Dumbell Image" src="dumbell.svg" position="50% 103%" :ratio="16 / 9"
                        :img-style="{ filter: 'blur(4px)' }"></q-img>
                     <p class="q-mt-sm text-white absolute-full flex flex-center">خطا در نمایش تصویر</p>
                  </template>
               </q-img>
               <p>{{ model.articleContent }}</p>
            </div>
         </q-form>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { CategoryList } from '@/common/category-list';
import type { CategoryModel } from '@/common/interfaces';
import { getCssVar } from 'quasar';
import { defineComponent } from 'vue';
export default defineComponent({
   props: ['model', 'commaSperatedCategories'],
   methods: {
      discardClicked() {
         this.$emit('finishEdit', 1)
      },
      submitEdit() {
         console.log(this.model.title)
         console.log(this.model.description)
         console.log(this.model.articleContent)
         console.log(this.model.readDuration)
         console.log(this.model.articleCategory)
         // ?? check validations ??
         // send to back
         // show response
         // if response was good:
         // this.$emit('finishEdit', 1)
      },
      // viewWriterClicked() {

      // }
   },
   data: () => ({
      // title: '',
      description: '',
      articleContent: '',
      // readDuration: '',
      articleCategory: '',
      pageScrollThumbStyle: {
         width: '4px',
         left: '1.5px',
         borderRadius: '5px',
         backgroundColor: getCssVar('primary'),
         opacity: 1
      },
      pageScrollBarStyle: {
         width: '7px',
         backgroundColor: getCssVar('primary'),
         opacity: 0.4,
      }
   }),
   computed: {
      isDense() {
         return this.$q.screen.lt.sm
      },
      categoryList() {
         let result: CategoryModel[] = []
         for (var index of this.commaSperatedCategories.split(',')) {
            result.push(CategoryList[parseInt(index) - 1])
         }
         return result
      }
   }
})
</script>
<style scoped lang="scss">
.q-input :deep(.q-field__before) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
   width: 90px
}

.q-input :deep(.q-field__native) {
   text-align: left;
   color: $dark;
   padding: 20px;
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
}

.q-textarea :deep(.q-field__after) {
   font-size: 0.9rem;
   color: $dark;
   font-weight: 700;
}

// .q-input {
//    &::v-deep {

//       input::-webkit-outer-spin-button,
//       input::-webkit-inner-spin-button {
//          -webkit-appearance: none;
//          margin: 0;
//       }

//       /* Firefox */
//       input[type=number] {
//          -moz-appearance: textfield;
//       }
//    }
// }

.q-input :deep(input::-webkit-inner-spin-button) {
   -webkit-appearance: none;
   margin: 0;
}

.q-input :deep(input[type=number]) {
   -moz-appearance: textfield;
   margin: 0;
}
</style>