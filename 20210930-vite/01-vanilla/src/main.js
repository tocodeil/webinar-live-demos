import './style.css'
import { foo } from './utils.js';

import { header } from './header.module.css';


document.querySelector('#app').innerHTML = `
  <h1 class="${header}">Hello World</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
