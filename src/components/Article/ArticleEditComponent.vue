<template>
   <!-- <q-scroll-area :thumb-style="pageScrollThumbStyle" :bar-style="pageScrollBarStyle"> -->
   <q-scroll-area>
      <q-page class="row q-pa-md q-pa-md-lg overflow-hidden">
         <q-form greedy @submit.prevent="submitEdit" class="row">
            <div class="row col-xs-12 offset-xs-0 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">

               <div class="row col-12">
                  <p class="text-weight-bold col-12 q-mt-sm" v-if="isDense">عنوان مقاله</p>
                  <q-input class="col-12" type="text" v-model="articleCopied.title" autogrow :dense="isDense"
                     :rules="[rules.artileTitle]">
                     <template v-slot:before v-if="!isDense">
                        <p>عنوان مقاله</p>
                     </template>
                  </q-input>
               </div>

               <div class="row col-12">
                  <p class="text-weight-bold col-12 q-mt-sm" v-if="isDense">زمان مطالعه</p>
                  <q-input type="number" min="1" max="300" suffix="دقیقه" class="col-12 col-sm-8 col-md-7 col-lg-6"
                     hint="یک عدد بین ۱ و ۳۰۰" hide-hint v-model="articleCopied.readDuration"
                     :rules="[rules.readDuration]" :dense="isDense">
                     <template v-slot:before v-if="!isDense">
                        <p>زمان مطالعه</p>
                     </template>
                  </q-input>
               </div>

               <div class="row col-12">
                  <p class="text-weight-bold col-12 q-mt-sm" v-if="isDense">توضیحات</p>
                  <q-input type="textarea" class="col-12" autogrow v-model="articleCopied.description" :dense="isDense"
                     :rules="[rules.artileDescription]">
                     <template v-slot:before v-if="!isDense">
                        <p>توضیحات</p>
                     </template>
                  </q-input>
               </div>

               <div class="row col-12">
                  <div class="row col-12 col-sm-8 col-md-7 col-lg-6 q-mt-xs-none q-mt-sm-md">
                     <p class="text-weight-bold col-12 col-sm-auto q-pt-sm q-mb-xs-sm q-mb-sm-none"
                        style="min-width: 90px">دسته بندی مقاله</p>
                     <q-expansion-item class="col-grow" header-class="row" dense>
                        <template v-slot:header>
                           <div class="row items-center col self-start">
                              <div class="q-mr-xs" v-for="c in selectedCategoriesList"
                                 v-if="articleCopied.articleCategory.length !== 0">
                                 <q-badge @click.stop="removeCategoryFromSelection(c.id)" lazy-load
                                    class="q-pa-sm cursor-pointer" rounded :color="c.color">
                                    <template v-slot:default>
                                       <div class="flex items-center">
                                          <q-icon name="highlight_off" class="font-size-up-5 q-mr-xs">
                                          </q-icon>
                                          <p class="font-size-up-1">{{ c.title }}</p>
                                       </div>
                                    </template>
                                 </q-badge>
                              </div>
                              <div class="flex items-cnter text-error q-pt-xs"
                                 v-if="articleCopied.articleCategory.length === 0">
                                 <q-icon name="error" size="1.5rem"></q-icon>
                                 <p class="q-mt-xs q-ml-xs">حداقل یک موضوع برای مقاله انتخاب کنید.</p>
                              </div>
                           </div>
                        </template>
                        <template v-slot:default>
                           <div class="row q-py-xs" v-for="c in CategoryList">
                              <q-btn @click="categoryClicked(c.id)" class="col-12" :color="c.color">
                                 {{ c.title }}
                              </q-btn>
                           </div>
                        </template>
                     </q-expansion-item>
                  </div>
               </div>

               <div class="row col-12 q-mt-xs-md q-mt-sm-lg q-pt-sm-sm items-center">
                  <p class="text-weight-bold col-12 q-mb-xs-sm q-mb-sm-none" v-if="isDense">عکس مقاله</p>
                  <q-file filled v-model="imageFile" :multiple="false" :dense="isDense">
                     <template v-slot:before v-if="!isDense">
                        <p>عکس مقاله</p>
                     </template>
                     <template v-slot:append>
                        <q-icon name="cloud_upload"></q-icon>
                     </template>
                  </q-file>
               </div>

               <div class="row col-12 q-mt-xs-md">
                  <p class="text-weight-bold col-12 q-mt-sm" v-if="isDense">متن مقاله</p>
                  <q-input type="textarea" class="col-12" autogrow v-model="articleCopied.articleContent"
                     :dense="isDense" :rules="[rules.articleContent]">
                     <template v-slot:before v-if="!isDense">
                        <p>متن مقاله</p>
                     </template>
                  </q-input>
               </div>

               <div class="row col-12 q-mt-md">
                  <div class="row col-xs-12 justify-end no-wrap">
                     <q-btn @click="discardClicked" class="q-px-sm-xl col-xs-grow q-mr-xs-sm col-sm-auto"
                        color="secondary">لغو</q-btn>
                     <q-btn @click="saveNewArticle" type="submit" class="q-px-sm-xl col-xs-grow q-ml-xs-sm col-sm-auto"
                        color="primary">ذخیره</q-btn>
                  </div>
               </div>
            </div>
         </q-form>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { CategoryList } from '@/common/category-list';
import type { CategoryModel, ChangeArticleDetailModel, ArticleDetailModel } from '@/common/interfaces';
import { getCssVar } from 'quasar';
import { defineComponent } from 'vue';
import PropType from 'vue';
import { ArticleService } from "@/repositories/index";

interface State {
   CategoryList: CategoryModel[],
   selectedCategoriesList: CategoryModel[],
   articleCopied: ChangeArticleDetailModel,
   imageBase64: string,
   imageFile: null | File
}

export default defineComponent({
   props: ['model'],
   methods: {
      discardClicked() {
         this.$emit('discardEdit', 2)
      },
      submitEdit() {
         // validations are checked inside the form
         // only field that needs validation here is 'articleCategory'
         if (this.articleCopied.articleCategory.length !== 0) {
            // maybe do stuff here
            this.$emit('saveEdit', 0)
         }
      },
      categoryClicked(categoryId: number) {
         if (categoryId !== Number(this.articleCopied.articleCategory[0]) && categoryId !== Number(this.articleCopied.articleCategory[2])) {
            if (this.selectedCategoriesList.length === 2) {
               this.selectedCategoriesList.shift()
            }
            this.selectedCategoriesList.push(CategoryList[categoryId - 1])

            let length: number = this.articleCopied.articleCategory.length
            if (length === 0) {
               this.articleCopied.articleCategory += String(categoryId)
            } else {
               if (length === 3) {
                  this.articleCopied.articleCategory = this.articleCopied.articleCategory.substr(2, 1)
               }
               this.articleCopied.articleCategory += ',' + String(categoryId)
            }
         }
      },
      removeCategoryFromSelection(categoryId: number) {
         if (categoryId === Number(this.articleCopied.articleCategory[0])) {
            let length: number = this.articleCopied.articleCategory.length
            if (length === 1) {
               this.selectedCategoriesList.splice(0)
               this.articleCopied.articleCategory = ''
            } else if (length === 3) {
               this.selectedCategoriesList.shift()
               this.articleCopied.articleCategory = this.articleCopied.articleCategory.substr(2, 1)
            }
         } else if (categoryId === Number(this.articleCopied.articleCategory[2])) {
            this.selectedCategoriesList.pop()
            this.articleCopied.articleCategory = this.articleCopied.articleCategory.substr(0, 1)
         }
      },
      async saveNewArticle() {
         if (!this.validArticle()) {
            alert('لطفا فیلد عنوان و متن مقاله را وارد!');
            return;
         }
         this.articleCopied.writerId = this.$store.state.user.userId;
         this.articleCopied.articleDescription = "";

         if (this.imageFile) {
            this.articleCopied.picUrl = String(await this.getBase64(this.imageFile));
         }

         try {
            const result = await ArticleService.addArticle(this.articleCopied);

            if (result.status !== 201 && result.status !== 200) {
               alert('خطا در ذخیره سازی');
            }
         }
         catch (err) { }
      },
      validArticle(): boolean {
         return (!!this.articleCopied.title && !!this.articleCopied.articleContent);
      },
      async getBase64(file: File) {
         if (!file) {
            return new Promise((resolve, reject) => {
               resolve('');
            });
         }
         return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
               resolve(reader.result);
            };
         });
      }
      // !! DO NOT REMOVE !!
      // updateTextAreaHeight() {
      //    console.log(this.$refs.asd.nativeEl)
      //    if (this.$q.screen.lt.sm) {
      //       console.log(this.$refs.asd.$el.children[0].children[0].children[0].children[0].clientHeight)
      //       console.log(this.$refs.asd.$el.children[0].children[0].children[0].children[0].scrollHeight)
      //       this.$refs.asd.$el.children[0].children[0].children[0].children[0].attributeStyleMap.set('height', CSS.px(this.$refs.asd.$el.children[0].children[0].children[0].children[0].scrollHeight + 0))
      //    } else {
      //       console.log(this.$refs.asd.$el.children[1].children[0].children[0].children[0].clientHeight)
      //       console.log(this.$refs.asd.$el.children[1].children[0].children[0].children[0].scrollHeight)
      //       this.$refs.asd.$el.children[1].children[0].children[0].children[0].attributeStyleMap.set('height', CSS.px(this.$refs.asd.$el.children[1].children[0].children[0].children[0].scrollHeight + 0))
      //    }
      // }
   },
   data(): State {
      return {
         CategoryList,
         selectedCategoriesList: [] as CategoryModel[],
         articleCopied: {} as ChangeArticleDetailModel,
         imageBase64: '',
         imageFile: null
         // pageScrollThumbStyle: {
         //    width: '4px',
         //    left: '1.5px',
         //    borderRadius: '5px',
         //    backgroundColor: getCssVar('primary'),
         //    opacity: 1
         // },
         // pageScrollBarStyle: {
         //    width: '7px',
         //    backgroundColor: getCssVar('primary'),
         //    opacity: 0.4,
         // }
      };
   },
   beforeMount() {
      this.articleCopied = { ...this.model }
      let tempList = this.articleCopied.articleCategory.split(',');
      tempList.forEach(item => {
         let id: number = parseInt(item);
         if (Number.isNaN(id)) return;

         id -= 1;
         this.selectedCategoriesList.push(CategoryList[id]);
      });
   },
   computed: {
      isDense() {
         return this.$q.screen.lt.sm ? true : false
      }
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