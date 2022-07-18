<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="top">
      <el-row>
        <el-col class="text" :span="24"
          ><div class="grid-content bg-purple">
            <i class="el-icon-warning" style="color: #e6a23c"></i>&nbsp;<span
              >注意：只允许为第三级分类设置相关参数！</span
            >
          </div></el-col
        >
      </el-row>

      <div>
        <div class="block">
          <span>选择商品分类:</span>
          <el-cascader
            v-model="value"
            :options="goodsList"
            :props="optionProps"
            @change="handleChange"
          ></el-cascader>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getAategoriesList } from '@/api/goods'
export default {
  async created () {
    const res = await getAategoriesList()
    console.log(res)
    this.goodsList = res.data.data
  },
  data () {
    return {
      goodsList: [],
      value: '',
      optionProps: {
        value: 'act_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    handleChange (value) {
      console.log(value)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.top {
  margin-top: 15px;
  .text {
    background-color: #fdf6ec;
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    span {
      font-size: 13px;
      color: #e6a23c;
    }
  }
}
.block {
  margin-top: 15px;
}
</style>
