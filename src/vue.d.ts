import rules from '@/validationRules'
import type { Store } from 'vuex'
declare module 'vue' {
  
  interface ComponentCustomProperties {
    rules: typeof rules,
    $store: Store
  }
}
export {}