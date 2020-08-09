import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios'
// import {request} from "./network/request";
import store from "./store";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()/*创建一个vue实例 让$bus不为空*/

new Vue({
  render: h => h(App),
  router,
  axios,
  store
}).$mount('#app')
/*

request({
  url: '/home/multidata'
}).then(res => {
  console.log(res);
}).catch(error=> {
  console.log(error);
})

*/

// axios({
//   url: 'http://152.136.185.210:8000/api/n3/home/multidata',
//   method: 'get'
// }).then(res => {
//   console.log(res);
// })
/*
axios.get('http://api.63code.com/wyy/api.php')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
*/

/*
// 上面的请求也可以这样做
axios.get('/user', {
  params: {
    ID: 12345
  }
})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/
