import type { NewAnswerModel, NewQuestionModel } from "@/common/interfaces"
import client from "./client/axios"
export default {
   postQuestion(question: NewQuestionModel) {
      const endpoint = '/api/q_a/post-question/'
      const response = client.post(endpoint, question)
      return response
   },

   postAnswer(answer: NewAnswerModel) {
      const endpoint = 'api/q_a/post-answer/'
      const response = client.post(endpoint, answer)
      return response
   }

   // getGymDetailByName(gymName: string) {
   //    const endpoint = '/api/gym/search-gym-name?name='.concat(gymName)
   //    const response = client.get(endpoint)
   //    return response
   // }
}