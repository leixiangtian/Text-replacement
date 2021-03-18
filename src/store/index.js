// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contents: ``,//检测内容
    wrongWords: `检测词111\n检测词222\n检测词333\n`,//检测词
    correctWords: `替换词111\n替换词222\n替换词333\n`,//修正词
    result: [],//检测结果
    keyword: [], //检测词转数组后的数组
    rWords: [], //修正词转数组后的数组
  },
  mutations: {
    //修改内容
    setText(state, { name, val }) {
      state[name] = val;
    },
    //一键修改：标记出出现的检测词
    textTag(state, { bool, bg }) {
      let content = state.contents
      //循环
      state.result.forEach((item) => {
        let res = new RegExp(item.wrongWords, 'g')
        // let res2 = new RegExp('<span.*?' + item.wrongWords + '</span>', 'g')
        let res2 = new RegExp("<span style='background:#ffb8b8;'>" + item.wrongWords + '</span>', 'g')
        if (bool == true) {
          content = content.replace(res2, item.correctWords)
        } else {
          if (content.search(res2) !== -1) {
            content = content.replace(res2, "<span style='background:" + bg + ";'>" + item.wrongWords + '</span>')
          } else {
            content = content.replace(res, "<span style='background:" + bg + ";'>" + item.wrongWords + '</span>')
          }
        }
      })
      this.commit('setText', { name: 'contents', val: content });
      document.getElementById("content").innerHTML = state.contents
    },
  },
  actions: {},
  getters: {
  },
  modules: {}
});
