<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="top">
      <el-row>
        <el-col class="text" :span="24"
          ><div class="grid-content bg-purple">
            <i class="el-icon-info"></i>&nbsp;<span>添加商品信息</span>
          </div></el-col
        >
      </el-row>

      <el-steps :active="active - 0" finish-status="success" align-center>
        <el-step name="0" title="基本信息"></el-step>
        <el-step name="1" title="商品参数"></el-step>
        <el-step name="2" title="商品属性"></el-step>
        <el-step name="3" title="商品图片"></el-step>
        <el-step name="4" title="商品内容"></el-step>
        <el-step name="5" title="完成"></el-step>
      </el-steps>

      <el-tabs :tab-position="tabPosition" v-model="active">
        <el-tab-pane label="基本信息" class="formdata"
          ><AddForm :dataList="categoriesList" @selectFn="parameterFn"></AddForm>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <div class="parameter">
            <p>123</p>
            <span
              ><el-tag type="warning" closable @close="handleClose(tag)"
                >标签四</el-tag
              ></span
            >
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AddForm from '../AddForm'
import { getAategoriesList, getAttributes } from '@/api/goods'
export default {
  async created () {
    const res = await getAategoriesList()
    console.log(res)
    this.categoriesList = res.data.data
  },
  data () {
    return {
      active: 0, // 步骤条索引
      tabPosition: 'left',
      categoriesList: [] // 商品分类的总数据

    }
  },
  methods: {
    async parameterFn () {
      const res = await getAttributes({
        id: 6,
        sel: 'many'
      })
      console.log(res)
      this.canshuList = res.data.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { AddForm }
}
</script>

<style scoped lang='less'>
::v-deep .top {
  margin-top: 15px;
  .text {
    background-color: #f4f4f5;
    height: 35px;
    line-height: 35px;
    text-align: center;
    span {
      font-size: 13px;
    }
  }
}
.parameter {
  margin-top: 15px;
  span {
    margin-top: 15px;
  }
}
</style>
