<template>
  <div class="usage hidden-sm-and-up clear">
      <div>
        <h2 class="title">使用方法</h2>
        <p>
          1、将需要检测的内容粘贴到<span class="red">【检测内容】</span>文本框内
        </p>
        <p>
          2、在<span class="red">【检测词】</span
          >文本框添加&nbsp;需要检测的关键词
        </p>
        <p>
          3、在<span class="red">【替换词】</span
          >文本框添加&nbsp;需要替换的替换词
        </p>
        <p>
          4、用户也可以自行导入<span class="red">【检测词】</span>与<span class="red"
            >【替换词】</span
          >
        </p>
      </div>
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
.usage {
  margin-bottom: 15px;
  color: #3a3f50;
  span.red {
    color: #e4393c;
  }
  p {
    line-height: 20px;
  }
  .title {
    line-height: 40px;
    font-size: 18px;
    font-weight: 900;
  }
  div{
    float: left;
    margin-right: 25px;
  }
}
</style>
