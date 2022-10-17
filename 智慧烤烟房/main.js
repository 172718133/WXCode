import Vue from 'vue'
import App from './App'

import request from './utils/request';
import api from './utils/api.js';
import utils from './utils/utils.js';
import uView from "./uview-ui";

Vue.config.productionTip = false
Vue.prototype.request = request
Vue.prototype.api = api
Vue.prototype.utils = utils
Vue.use(uView);

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
