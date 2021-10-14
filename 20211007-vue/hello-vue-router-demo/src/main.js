import { createApp } from 'vue'
import App from './App.vue'
import ImageGallery from './ImageGallery.vue';
import HelloWorld from './components/HelloWorld.vue';
import * as VueRouter from 'vue-router';

const routes =[
  { path: '/', component: HelloWorld, props: { msg: 'Hello World' } },
  { path: '/gallery', component: ImageGallery },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app')
