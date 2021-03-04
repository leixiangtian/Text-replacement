<template>
  <div class="terms_rt">
    <el-tabs v-model="query" type="border-card">
      <el-tab-pane label="检测结果" name="query">
        <el-tooltip
          class="item"
          effect="dark"
          content="此处显示检测结果"
          placement="bottom-end"
        >
          <ul class="result_list">
            <span v-if="!r">此处显示检测结果</span>
            <li :v-if="r" v-for="(item, i) in result" :key="i">
              检测到： 【<b class="red">{{ item.wrongWords }}</b
              >】×&nbsp;<b class="red">{{ item.number }}&nbsp;处</b><br />
              替换词为： 【<b class="green">{{ item.correctWords }}</b
              >】
            </li>
          </ul>
        </el-tooltip>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      query: 'query',
      r:false //是否有检测结果
    }
  },
  computed: {
    ...mapState(['result'])
  },
  watch:{
    result(val){
      this.r=val.length>0?true:false
    }
  }
}
</script>
<style lang="scss" scoped>
.terms_rt {
  position: relative;
  .result_list {
    height: 220px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    -moz-border-radius: 3px;
    border: 1px solid #dcdfe5;
    overflow: auto;
    padding: 5px 10px;
    color: #bbb;
    box-sizing: border-box;
    & li {
      margin-bottom: 10px;
      & .red {
        color: red;
      }
      & .green {
        color: green;
      }
    }
  }
}
</style>
