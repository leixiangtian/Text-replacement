<template>
  <div>
    <footer class="footer clearfix">
      <p>
        建议使用Chrome、Firefox、Safari浏览器浏览此网页.<br />
        Copyright © 2020
        <a href="https://www.lxtian.com" target="_blank">哈喽雷雷</a>. All
        Rights Reserved.
      </p>
      <p>
        <a
          href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
          target="_blank"
          >桂ICP备18010803号</a
        >
      </p>
    </footer>
  </div>
</template>

<script>
//导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//import 《组件名称》 from '《组件路径》';
export default {
  //import引入的组件需要注入到对象中
  components: {},
  data() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.footer {
  // background: #3a3e51;
  color: #3a3e51ad;
  padding: 10px 0;
  // height:15px;
  text-align: center;
  & p {
    line-height: 25px;
  }
  @media screen and(max-width:400px) {
    & p {
      font-size: 13px;
      line-height: 20px;
    }
  }
}
</style>
