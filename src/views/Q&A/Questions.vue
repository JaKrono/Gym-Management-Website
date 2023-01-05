<template>
   <QuestionsViewComponent v-if="state === 1" @manageClicked="changeState" @viewQuestion="viewQuestion"></QuestionsViewComponent>
   <QuestionsManageComponent v-else-if="state === 2" @viewAllClicked="changeState" @viewQuestion="viewQuestion" @newQuestion="changeState"></QuestionsManageComponent>
   <newQuestionComponent v-else-if="state === 3"></newQuestionComponent>
   <!-- <ViewQuestionComponent v-else-if="state === 3"></ViewQuestionComponent> -->
</template>
<script lang="ts">
import QuestionsViewComponent from '@/components/Q&A/QuestionsViewComponent.vue';
import QuestionsManageComponent from '@/components/Q&A/QuestionsManageComponent.vue';
import NewQuestionComponent from '@/components/Q&A/NewQuestionComponent.vue';
// import ViewQuestionComponent from '@/components/Q&A/ViewQuestionComponent.vue';
import { defineComponent } from 'vue';
export default defineComponent({
   components: {
      QuestionsViewComponent,
      QuestionsManageComponent,
      NewQuestionComponent,
      // ViewQuestionComponent,
   },
   data: () => ({
      state: 1,
   }),
   methods: {
      changeState(event: number) {
         this.state = event
      },
      viewQuestion(questionId: number) {
         this.$router.push(`/questions/${questionId}`)
         // this.state = 3
      }
   },
   mounted() {
   }
})
</script>
<style lang="scss" scoped>

</style>