<template>
  <div class="text-box">
    <el-tooltip class="item" effect="dark" content="清空内容" placement="top">
      <el-button
        class="reset"
        @click="reset"
        type="text"
        :disabled="content == ``"
        >清空</el-button
      >
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="复制内容" placement="top">
      <el-button
        id="copy_btn"
        class="copy"
        type="text"
        :disabled="content == ``"
        data-clipboard-action="copy"
        data-clipboard-target="#content"
        >复制</el-button
      >
    </el-tooltip>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="检测内容" name="content">
        <el-tooltip
          class="item"
          effect="dark"
          content="请输入需要检测的内容"
          placement="top-end"
        >
          <div
            id="content"
            ref="content"
            contenteditable="plaintext-only"
            user-modify="read-write-plaintext-only"
            @focus="empty"
            @input="setContent($event)"
          >请输入需要检测的内容</div>
        </el-tooltip>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import Clipboard from 'clipboard'
export default {
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {
      activeName: 'content',
      clipboard: null,
    }
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      content: 'contents',
      result: 'result',
    }),
  },
  //方法集合
  methods: {
    ...mapMutations(['setText', 'textTag']),
    //把内容保存到vuex里
    setContent(event) {
      let content = event.target.innerHTML
      this.setText({ name: 'contents', val: content })
      //如果为空，则重置
      if (
        content == '' ||
        content == '<br>' ||
        content == '<pre>' ||
        content == '/n' ||
        content == '&nbsp;'
      ) {
        this.reset()
      }
    },
    //清空
    reset() {
      let content = ``
      this.$refs.content.innerHTML = content
      this.setText({ name: 'contents', val: content })
      this.setText({ name: 'result', val: [] })
    },
    //初始化内容
    empty() {
      if (this.$refs.content.innerHTML == `请输入需要检测的内容`) {
        this.reset()
      }
    }
  },
  watch: {
    result() {
      //当检测词不为0时执行
      if (this.result.length > 0) {
        this.textTag({
          bool: false,
          bg: '#ffb8b8',
        })
        document.querySelector('.result_list').style.color = '#474e60'
      } else {
        document.querySelector('.result_list').style.color = '#bbb'
      }
    },
  },
  mounted() {
    let _this = this
    this.clipboard = new Clipboard('#copy_btn')//实例化一个clipboard（复制插件）
    _this.clipboard.on('success', function(e) {
      if(e.text){
        e.clearSelection()
        _this.$message.success('复制成功', 500)
      }
    })
  },
  destroyed(){
    this.clipboard.destroy()
    console.log(0)
  }
}
</script>
<style lang="scss" scoped>
.text-box {
  position: relative;
  // margin-bottom: 20px;
  margin: 20px 0;
  .reset {
    position: absolute;
    z-index: 1;
    left: 120px;
  }
  .copy {
    position: absolute;
    z-index: 1;
    left: 180px;
  }
  #content {
    min-height: 220px;
    max-height: 300px;
    line-height: 20px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    -moz-border-radius: 3px;
    border: 1px solid #dcdfe5;
    overflow: auto;
    padding: 10px 10px;
    color: #474e60;
    box-sizing: border-box;
  }
}
</style>
