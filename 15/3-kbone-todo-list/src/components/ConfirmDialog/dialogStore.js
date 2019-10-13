import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const dialogStore = new Vuex.Store({
  state: {
    // 弹窗列表，用来保存可能弹窗的一系列弹窗
    dialogList: [],
  },
  mutations: {
    removeDialog(state, index) {
      // 移除弹窗
      state.dialogList.splice(index, 1)
    },
    setDialog(state, { title, text, cancelText, confirmText, resolve, reject }) {
      // 添加新的弹窗
      state.dialogList.push({
        title,
        text,
        cancelText,
        confirmText,
        resolve,
        reject
      }) 
    }
  }
});

export default dialogStore;