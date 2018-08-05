import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 我想 模块b获取模块a的数据。
//
// 方法1: 用组件之间通讯。这样写很麻烦，并且写着写着，估计自己都不知道这是啥了，很容易写晕。
//
// 方法2: 我们定义 全局变量。模块a的数据 赋值给全局变量 x。然后 模块b 获取x。这样我们就很容易获取到数据
//
//
//
// 我们把模块a 的数据叫 state。全局变量叫store。模块b 叫data
//
//
//
// Getter 是一个纯函数，用于接收state 参数。返回你需要取的值
//
// mutation  是对  state 进行修改
//
// action  处理数据，对处理的数据 返回给 mutation 从而对 state 进行修改。
export default new Vuex.Store({
  state: {
    testUrl:{
      // url:"http://192.168.0.113:8081/app",
      url:"/app",
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {}
})
