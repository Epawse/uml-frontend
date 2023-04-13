import Vue from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import ElementUI from 'element-ui'
import './plugins/element.js'
import router from './router' //引入路由配置
import store from './store' //引入 Vuex 状态管理

import './assets/theme/index.css' // 自定义主题
import VeLine from 'v-charts/lib/line.common' //折线图
import VeBar from 'v-charts/lib/bar.common' // 条形图
import VeHistogram from 'v-charts/lib/histogram.common' //柱状图
import VePie from 'v-charts/lib/pie.common' // 饼图

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: "kA28Z7RQzizVHRxNDczTfHTsRj5BRFmh"// 百度地图秘钥
})

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

Vue.component(VeLine.name, VeLine)
Vue.component(VeBar.name, VeBar)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VePie.name, VePie)

new Vue({
  render: h => h(App),
  router, //使用路由配置
  store, //使用 Vuex 进行状态管理
  // BaiduMap
}).$mount('#app')