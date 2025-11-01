import { createConfig } from 'next-i18next'

export const i18nConfig = createConfig({
  locales: ['en', 'fa'],
  defaultLocale: 'en',
  localeDetection: true,
})
