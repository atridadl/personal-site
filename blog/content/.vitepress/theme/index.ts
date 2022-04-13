import '../theme/styles/main.scss';

import { Theme } from 'vitepress';
import Layout from './Layout.vue';
import NotFound from './NotFound.vue';
import Tags from './components/Tags.vue';

const theme: Theme = {
  Layout,
  NotFound,
  enhanceApp: ({ app }) => {
    app.component('Tags', Tags);
  },
};

export default theme;
