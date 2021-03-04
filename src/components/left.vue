<template>
  <div class="terms_lf">
    <el-button
      class="terms-btn"
      type="text"
      @click="getData"
      >导入内置词库</el-button
    >
    <el-tabs v-model="word" type="border-card">
      <el-tab-pane label="检测词" name="word">
        <el-tooltip
          class="item"
          effect="dark"
          content="检测词，以回车分割，必须与替换词位置对应"
          placement="bottom-end"
        >
          <el-input
            resize="none"
            type="textarea"
            :rows="10"
            placeholder="检测词，以回车分割，必须与替换词位置对应"
            ref="wrongWords"
            v-model="wrongWords"
          >
          </el-input>
        </el-tooltip>
      </el-tab-pane>
      <el-tab-pane label="替换词" name="two">
        <el-tooltip
          class="item"
          effect="dark"
          content="替换词，以回车分割，必须与检测词位置对应"
          placement="bottom-end"
        >
          <el-input
            resize="none"
            type="textarea"
            :rows="10"
            ref="correctWords"
            placeholder="替换词，以回车分割，必须与检测词位置对应"
            v-model="correctWords"
          >
          </el-input>
        </el-tooltip>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import axios from 'axios'
export default {
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {
      word: 'word',
      wrongWord: ``,
      correctWord: ``,
    }
  },
  //监听属性 类似于data概念
  computed: {
    //检测词
    wrongWords: {
      get() {
        return this.$store.state.wrongWords
      },
      set(val) {
        this.$store.state.wrongWords = val
      },
    },
    //修正词
    correctWords: {
      get() {
        return this.$store.state.correctWords
      },
      set(val) {
        this.$store.state.correctWords = val
      },
    },
    ...mapState({
      content: 'contents', //检测内容
      // wrongWords:'wrongWords',//检测词
      // correctWords: 'correctWords', //修正词
      result: 'result', //检测结果
      keyword: 'keyword', //检索词-数组
      rWords: 'rWords', //修正词-数组
      
    }),
  },
  methods: {
    ...mapMutations(['setText']),
    getData() {
      axios.get('../../js/data.json').then((res) => {
        this.wrongWord=``
        this.correctWord =``
        res.data.forEach((item) => {
          this.wrongWord += item.wrongWords + '\n'
          this.correctWord += item.correctWords + '\n'
        })
        this.setText({ name: 'wrongWords', val: this.wrongWord })
        this.setText({ name: 'correctWords', val: this.correctWord })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.terms_lf {
  width: 100%;
  float: left;
  position: relative;
  .terms-btn{
    position: absolute;
    right: 20px;
    z-index: 1;
    color: #e4393c !important;
  }
}

.terms_rt {
  float: right;
}
.btn_box {
  // margin:0 20px;
  width: 14%;
  float: left;
  position: relative;
  top: 80px;
  font-size: 45px;
  font-weight: bold;
  .tp {
    position: relative;
    top: -50px;
    color: red;
  }
  .import {
    position: absolute;
    top: -90px;
    width: 100%;
  }
}
</style>
