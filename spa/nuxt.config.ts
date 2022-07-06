import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
        '@nuxt/content',
    ],
    content: {

    },
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-brands-svg-icons'
        ]
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
      ]      
})
