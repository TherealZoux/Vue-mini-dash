import { createI18n } from 'vue-i18n'
import en from '../locales/en/index'
import ar from '../locales/ar/index'

const messages = {
  en,
  ar
}

const i18n = createI18n({
  legacy: false,            // Composition API mode
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
