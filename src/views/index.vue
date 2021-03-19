<template>
  <div>
    <el-container class="container">
      <!-- 头部 -->
      <el-header class="header">
        <div class="clear">
          <h1>文本批量替换工具 - 在线多词替换工具</h1>
        </div>
      </el-header>
      <!-- 主体 -->
      <el-main class="main">
        <!-- 使用方法 -->
        <Usage></Usage>
        <!-- 检测文本内容 -->
        <Content></Content>
        <div class="terms clear">
          <el-row>
            <!-- 左侧文本内容 -->
            <el-col :sm="10">
              <Left></Left>
            </el-col>
            <!-- 中间 -->
            <el-col :sm="4">
              <Center></Center>
            </el-col>
            <!-- 右侧文本内容 -->
            <el-col :sm="10">
              <Right></Right>
            </el-col>

            <!-- <el-col style="position:relative;top:-80px" class="hidden-md-and-up" :md="4">
            <Center></Center>
          </el-col> -->
          </el-row>
        </div>
      </el-main>
      <!-- 尾部 -->
      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import Content from '../components/content'
import Left from '../components/left'
import Center from '../components/center'
import Right from '../components/right'
import Usage from '../components/usage'
import Footer from '../components/footer'
// import 'element-ui/lib/theme-chalk/display.css'
// import axios from 'axios'
export default {
  //import引入的组件需要注入到对象中
  components: {
    Content,
    Left,
    Center,
    Right,
    Usage,
    Footer,
  },
  methods: {
    // 百度自动推送
    loadApi() {
      axios.get('https://api.lxtian.cn/baidu/baidu_api.php').then((res) => {
        // console.log(res)
      })
    },
    //提示
    tips() {
      this.$notify({
        title: '使用方法',
        dangerouslyUseHTMLString: true,
        message: `<p>
          1、将需要检测的内容粘贴到<span style="color:#e4393c;">【检测内容】</span>文本框内
        </p>
        <p>
          2、在<span style="color:#e4393c;">【检测词】</span
          >文本框添加&nbsp;需要检测的关键词
        </p>
        <p>
          3、在<span style="color:#e4393c;">【替换词】</span
          >文本框添加&nbsp;需要替换的替换词
        </p>
        <p>
          4、用户也可以自行导入<span style="color:#e4393c;">【检测词】</span>与<span style="color:#e4393c;"
            >【替换词】</span
          >
        </p>`,
        duration: 0,
      })
    },
  },
  created() {
    if (window.ActiveXObject || 'ActiveXObject' in window) {
      alert('该工具不支持ie浏览器，请更换浏览器使用！')
      window.location.href =
        'https://www.baidu.com/s?wd=%E5%93%88%E5%96%BD%E9%9B%B7%E9%9B%B7%E5%9C%A8%E7%BA%BF%E5%A4%9A%E8%AF%8D%E6%9B%BF%E6%8D%A2%E5%B7%A5%E5%85%B7'
    }
  },
  mounted() {
    this.loadApi() //百度推送
    if (document.body.offsetWidth >= 668) {
      this.tips() //弹出窗口
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/css/style.scss";
@import "../assets/css/gStyle.css";
</style>