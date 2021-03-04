<template>
  <div class="btn_box">
    <!-- 导入按钮 -->
    <el-upload
      class="import hidden-xs-only"
      ref="upload"
      action="/"
      :show-file-list="false"
      :on-change="importExcel"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">
        导入Excel表格
      </el-button>
    </el-upload>
    <!-- 模板下载链接 -->
    <div class="hidden-xs-only">
      <el-link href="../../excel/excel.xlsx" class="tp">
        <span>点此下载导入模板</span>
      </el-link>
    </div>
    <!-- 查询按钮 -->
    <el-row>
      <el-col :xs="8" :sm="24">
        <el-button type="primary" @click="btn" v-if="result.length == 0"
          >开始检测</el-button
        >
      </el-col>
      <el-col :xs="8" :sm="24">
        <el-button
          v-if="result.length !== 0"
          class="modify"
          @click="modify(true,'#ffffff')"
          type="primary"
          >一键替换</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
import { mapState, mapMutations } from 'vuex'
export default {
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {
      xlsxIsLoad:false //xlsx插件是否加载完毕
    }
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      content: 'contents', //检测内容
      wrongWords: 'wrongWords', //检测词
      correctWords: 'correctWords', //修正词
      result: 'result', //检测结果
      keyword: 'keyword', //检索词-数组
      rWords: 'rWords', //修正词-数组
    }),
  },
  //方法集合
  methods: {
    ...mapMutations(['setText', 'textTag']),
    //内容自动转换为数组
    formatString(kws) {
      //关键词字符串转成数组
      let arr = kws.split(/[(\r\n)\r\n]+/) //以回车符切割为数组
      arr.forEach((item, index) => {
        // 删除空项
        if (!item) {
          arr.splice(index, 1)
        }
      })
      return arr
    },
    // 提交
    btn() {
      this.setText({ name: 'result', val: [] }) //清空结果内容
      //判断检测内容是否为空
      if (this.content == '') {
        this.$message({
          message: '内容不能为空',
          type: 'warning',
        })
        return false
      }
      let wrongWordsArr = new this.formatString(this.wrongWords) //检测词转数组
      let correctWordsArr = new this.formatString(this.correctWords) //修正词转数组
      correctWordsArr.length==0?correctWordsArr.push(""):""
      this.setText({ name: 'keyword', val: wrongWordsArr })
      this.setText({ name: 'rWords', val: correctWordsArr })
      let arr = []
      this.keyword.forEach((item, index) => {
        //判断内容里是否包含检测词
        if (this.content.indexOf(this.keyword[index]) != -1) {
          //检测词出现的次数
          let number = this.stats(this.content, this.keyword[index])
          //检测的到的词语添加到结果result里
          arr.push({
            wrongWords: this.keyword[index], //检测词
            correctWords: this.rWords[index], //修正词
            number: number, //统计次数
          })
        }
      })
      this.setText({ name: 'result', val: arr })
      if (this.result == ``) {
        this.$message('未查询到检测词')
      } else {
        this.$message({
          showClose: true,
          message: '查询到内容存在检测词！',
          type: 'warning',
        })
      }
    },
    //统计检测词出现次数
    stats(str, kw) {
      let num = 0
      let a = str.indexOf(kw)
      while (a !== -1) {
        a = str.indexOf(kw, a + 1)
        num++
      }
      return num
    },
    //一键替换
    modify(bool, bg, color) {
      this.textTag({ bool, bg, color })
      if (bool == true) {
        this.$message({
          showClose: true,
          message: '一键替换完成',
          type: 'success',
        })
        this.setText({ name: 'result', val: [] })
      }
    },
    //加载xlsx导入插件
    loadXlsx() {
      return new Promise((resolve) => {
        if(this.xlsxIsLoad==true){
          resolve()
          return false
        }else{
          this.xlsxIsLoad=true
          // this.$set(this,'loadXlsxOver',true)
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.lxtian.com/lei/js/xlsx.full.min.js'
        document.body.appendChild(script)
        if (script.readyState) {
          //IE
          script.onreadystatechange = function() {
            if (
              script.readyState == 'complete' ||
              script.readyState == 'loaded'
            ) {
              script.onreadystatechange = null
              resolve()
            }
          }
        } else {
          //非IE
          script.onload = function() {
            resolve()
          }
        }
      })
    },
    //导入
    importExcel(file) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      const types = file.name.split('.')[1]
      const fileType = ['xlsx', 'xls'].some((item) => item === types)
      if (!fileType) {
        this.$message({
          showClose: true,
          message: '格式错误！请下载导入模板编辑后上传',
          type: 'error',
        })
        return false
      }
      this.loadXlsx().then(() => {
        this.file2Xce(file).then((tabJson) => {
          if (tabJson && tabJson.length > 0) {
            if (tabJson[0].sheet[0].wrongWords == undefined) {
              this.$message({
                showClose: true,
                message: '请下载导入模板编辑词库后再进行导入！',
                type: 'error',
              })
              return false
            }
            this.setText({ name: 'wrongWords', val: `` })
            this.setText({ name: 'correctWords', val: `` })
            let xlsxArr = tabJson[0].sheet
            let wrongWords = ``
            let correctWords = ``
            xlsxArr.forEach((item) => {
              wrongWords += item.wrongWords + '\n'
              correctWords += item.correctWords + '\n'
            })
            this.setText({ name: 'wrongWords', val: wrongWords })
            this.setText({ name: 'correctWords', val: correctWords })
            this.$message({
              showClose: true,
              message: '导入成功！',
              type: 'success',
            })
          }
        })
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary',
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file.raw)
        // reader.readAsBinaryString(file) // 传统input方法
      })
    }, //导入 end
  },
}
</script>
<style lang="scss" scoped>
.btn_box {
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  float: left;
  font-size: 45px;
  font-weight: bold;
  .tp {
    color: red;
  }
  .import {
    width: 100%;
  }
  .modify {
    border: 3px solid #e4393c !important;
  }
}
@media screen and (max-width: 770px) {
  .btn_box {
    text-align: left;
  }
}
</style>
