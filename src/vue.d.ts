import rules from '@/validationRules'
declare module 'vue' {
  interface ComponentCustomProperties {
    rules: typeof rules
  }
}
export {}