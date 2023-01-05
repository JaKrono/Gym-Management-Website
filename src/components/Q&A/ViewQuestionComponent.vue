<template>
   <!-- <h3>Here it is: {{ $route.params.id }}</h3> -->
   <q-scroll-area>
      <q-page>
         <div class="q-pa-md q-pa-md-lg">
            <div class="row">
               <p class="font-size-up-10">یصایشهصمای شصیامعصشایمشهباث عبشعابمشصبتشعث بشثعباعثشاب شثعاب شعابتشع بانص
                  بصخشبخشمصهبا شص ب؟</p>
               <!-- <q-separator class="col-12 q-my-md" size="2px"></q-separator> -->
               <div class="row col-12 q-mt-lg no-wrap">
                  <div class="column items-center font-size-up-5 q-mx-md-sm" style="width: 50px; min-width: 50px;">
                     <q-icon @click="" class="q-my-sm cursor-pointer" name="o_thumb_up" color="secondary"></q-icon>
                     <p class="q-my-sm text-secondary">۱۲-</p>
                     <q-icon @click="" class="q-my-sm cursor-pointer" name="thumb_down" color="primary"></q-icon>
                  </div>
                  <div class="row col">
                     <p class="col-12 font-size-up-1">یشعاینشعای صعبعشث
                        باعمشثابشمث ابعشثاب شعثابمشثعابشهمع ثباشعثابدمشع بداشعدب شعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                        بمشعثدبعشثدبعشثابامعشثدبتشدب معشاثب شثدمبشتثدبشعهثبمشثتبت
                        شث</p>
                     <div class="row q-mt-sm col-12 justify-between">
                        <div class="q-pb-sm">
                           <p class="bg-blue-grey-1 q-pa-xs rounded-borders" style="width: unset !important">تمرینات
                              ورزشی</p>
                        </div>
                        <div class="row col-shrink q-pa-sm bg-blue-grey-1 rounded-borders no-wrap">
                           <div class="flex items-center">
                              <q-img @click="viewWriterClicked(1)" class="cursor-pointer" width="50px" height="50px"
                                 src="https://placeimg.com/500/300/nature?t=0.6890414328903447" fit="cover"></q-img>
                           </div>
                           <div class="q-ml-sm">
                              <div class="col-12">
                                 <p @click="viewWriterClicked(1)" class="col-shrink cursor-pointer text-primary">بیژن
                                    مرتضوی‌زاده
                                    اصل</p>
                              </div>
                              <div class="col-12 q-mt-sm">
                                 <p class="col-shrink">در تاریخ <span class="text-weight-bold">{{ datesad }}</span>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="bg-blue-1 rounded-borders row col-12 q-mt-md q-pa-sm justify-between items-center">
                  <!-- <p class="font-size-up-5">12 پاسخ | پاسخی برای این سوال موجود نیست</p> -->
                  <p class="font-size-up-2"><span class="text-weight-bold">12</span> پاسخ</p>
                  <p class="font-size-up-2">پاسخی برای این سوال موجود نیست</p>
                  <q-btn @click="writeNewQuestionClicked" class="col-12 col-sm-auto q-mt-sm q-mt-sm-none"
                     color="primary">
                     نوشتن پاسخ جدید
                  </q-btn>
               </div>
               <div class="row col-12" v-for="x in 4">
                  <div class="row col-12 no-wrap q-mt-lg">
                     <div class="column items-center font-size-up-5 q-mx-md-sm" style="width: 50px; min-width: 50px;">
                        <q-icon @click="" class="q-my-sm cursor-pointer" name="o_thumb_up" color="secondary"></q-icon>
                        <p class="q-my-sm text-secondary">۱۲-</p>
                        <q-icon @click="" class="q-my-sm cursor-pointer" name="thumb_down" color="primary"></q-icon>
                        <div v-if="true">
                           <q-tooltip anchor="bottom left" :hide-delay="$q.screen.lt.md ? 1500 : 0">
                              این پاسخ توسط صاحب سوال قبول شده است.
                           </q-tooltip>
                           <q-icon name="fa-solid fa-check-double" class="q-pt-md" color="positive"></q-icon>
                        </div>
                     </div>
                     <div class="row col">
                        <p class="col-12 font-size-up-1">یشعاینشعای صعبعشث
                           باعمشثابشمث ابعشثاب شعثابمشثعابشهمع ثباشعثابدمشع بداشعدب شعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثعاثباعشثابمعشبا معشثدبعشثدبمعشثا
                           بمشعثدبعشثدبعشثابامعشثدبتشدب معشاثب شثدمبشتثدبشعهثبمشثتبت
                           شث</p>
                        <div class="row q-mt-sm col-12 justify-end">
                           <div class="row col-shrink q-pa-sm bg-blue-grey-1 rounded-borders no-wrap">
                              <div class="flex items-center">
                                 <q-img @click="viewWriterClicked(1)" class="cursor-pointer" width="50px" height="50px"
                                    src="https://placeimg.com/500/300/nature?t=0.6890414328903447" fit="cover"></q-img>
                              </div>
                              <div class="q-ml-sm">
                                 <div class="col-12">
                                    <p @click="viewWriterClicked(1)" class="col-shrink cursor-pointer text-primary">بیژن
                                       مرتضوی‌زاده
                                       اصل</p>
                                 </div>
                                 <div class="col-12 q-mt-sm">
                                    <p class="col-shrink">در تاریخ <span class="text-weight-bold">{{ datesad }}</span>
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
                        <q-btn @click="submitAnswer" type="submit" color="primary"
                           class="q-px-xl col col-sm-auto q-ml-xs">ذخیره</q-btn>
                     </div>
                  </q-form>
               </div>
            </div>
         </div>
      </q-page>
   </q-scroll-area>
</template>
<script lang="ts">
import { date } from 'quasar';
import { defineComponent } from 'vue';
export default defineComponent({
   data: () => ({
      datesad: '1 شسی 23',
      newAnswerContent: ''
   }),
   methods: {
      viewWriterClicked(userId: number) {

      },
      writeNewQuestionClicked() {
         console.log((this.$refs['newAnswerBox'] as any).getBoundingClientRect())
            ; (this.$refs['newAnswerBox'] as any).scrollIntoView({ behavior: 'smooth' })
      },
      submitAnswer() {

      },
      discardAnswer() {
         this.newAnswerContent = ''
            ; (this.$refs['newAnswerForm'] as any).resetValidation()
      }
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