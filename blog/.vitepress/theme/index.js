import DefaultTheme from 'vitepress/theme'

import Archives from './components/Archives.vue'
import Tags from './components/Tags.vue'
import Page from './components/Page.vue'
import Comment from './components/Comment.vue'

import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // register global compoment
        app.component('Tags', Tags)
        app.component('Archives', Archives)
        app.component('Page', Page)
        app.component('Comment', Comment)
    }
}
