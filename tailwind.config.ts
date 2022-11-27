import { Config } from 'tailwindcss'

export default <Config> {
  content: [
    './pages/**/*/vue',
    './app.vue',
    './layout/**/*.vue',
    './components/**/*.vue',
    './nuxt.config.ts'
  ],
  plugins: [],
  darkMode: 'class',
  theme: {
    darkSelector: '.dark-mode',
    extend: {
      colors: {
        warn: '#fcd34d'
      }
    }
  }
}
