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
      <!-- 级联选择器 -->
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
      <!-- 标签页 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first"
          ><Parameter
            :listTitle="parameterObj[0]"
            :tableData="tableDatajin"
            :valueId="value"
            @setList="handleChange"
          ></Parameter
        ></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"
          ><Parameter
            :listTitle="parameterObj[1]"
            :tableData="tableDatajdo"
            :valueId="value"
            @setList="handleChange"
          ></Parameter
        ></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Parameter from './components/parameter.vue'
import { getAategoriesList, getAttributes } from '@/api/goods'
export default {
  async created () {
    const res = await getAategoriesList() // 获取级联选择器数据
    console.log(res)
    this.goodsList = res.data.data
  },
  data () {
    return {
      goodsList: [],
      value: '',
      optionProps: { // 联动选择器的配置项
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      activeName: 'first', // 默认展开的标签页
      parameterObj: [
        { name: '添加参数', isEdit: true },
        { name: '添加属性', isEdit: false }
      ],
      switch: true,
      data: {
        id: '',
        sel: 'many'
      },
      data1: {
        id: '',
        sel: 'only'
      },
      tableDatajin: [], // 选择器后的数据
      tableDatajdo: [] // 选择器后的数据
    }
  },
  methods: {
    async handleChange (value) { // 选择后发两个请求
      console.log(value)
      this.data.id = value[value.length - 1]
      this.data1.id = value[value.length - 1]
      const res = await getAttributes(this.data)
      console.log(res)
      const res1 = await getAttributes(this.data1)
      console.log(res1)
      res.data.data.forEach(item => {
        if (item.attr_vals === '') {
          item.attr = []
        } else {
          item.attr = item.attr_vals.split(' ')
        }
      })
      this.tableDatajin = res.data.data
      res1.data.data.forEach(item => {
        if (item.attr_vals === '') {
          item.attr = []
        } else {
          item.attr = item.attr_vals.split(' ')
        }
      })
      this.tableDatajdo = res1.data.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Parameter }
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
