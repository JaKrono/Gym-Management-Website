import type { NewAnswerModel, NewQuestionModel } from "@/common/interfaces"
import client from "./client/axios"
export default {
   postQuestion(question: NewQuestionModel) {
      const endpoint = '/api/q_a/post-question/'
      const response = client.post(endpoint, question)
      return response
   },

   postAnswer(answer: NewAnswerModel) {
      const endpoint = '/api/q_a/post-answer/'
      const response = client.post(endpoint, answer)
      return response
   },

   getSingleQuestionDetail(ids: { userId: String, questionId: String }) {
      const endpoint = `/api/q_a/get-question/${ids.questionId}-${ids.userId}/`
      const response = client.get(endpoint)
      return response
   },

   getWriterDetail(userId: string) {
      const endpoint = `/api/get-user/${userId}/`
      const response = client.get(endpoint)
      return response
   },

   postQuestionScore(obj: { score: number, userId: number, questionId: number }) {
      const endpoint = '/api/q_a/post-question-score/'
      const response = client.post(endpoint, obj)
      return response
   },

   postAnswerScore(obj: { score: number, userId: number, answerId: number}) {
      const endpoint = '/api/q_a/post-answer-score/'
      const response = client.post(endpoint, obj)
      return response
   }

}