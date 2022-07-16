<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="top">
      <!-- 搜索用户 -->
      <el-row :gutter="20">
        <el-col :span="8" class="search"
          ><div>
            <el-input
              placeholder="请输入内容"
              v-model="params.query"
              class="input-with-select"
              clearable
              @keyup.native.enter="searchGoodsItem"
              @clear="searchGoodsItem"
            >
              <el-button
                @click="searchGoodsItem"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input></div
        ></el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            <el-button type="primary">添加商品</el-button>
          </div></el-col
        >
      </el-row>

      <!-- 表格 -->
      <el-table
        class="table"
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        border
        stripe
      >
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column property="goods_name" label="商品名称" width="480">
        </el-table-column>
        <el-table-column
          property="goods_price"
          label="商品价格(元)"
          width="160"
        >
        </el-table-column>
        <el-table-column property="goods_weight" label="商品重量" width="160">
        </el-table-column>
        <el-table-column property="add_time" label="创建时间" width="160">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="small"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="small">
            删除</el-button
          >
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pagenum"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/goods'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      tableData: [],
      params: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: null
    }
  },
  methods: {
    async getGoodsList () { // 获取goods所有数据
      try {
        const res = await getGoodsList(this.params)
        console.log(res)
        this.tableData = res.data.data.goods
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },
    async searchGoodsItem () { // 搜索商品
      try {
        const res = await getGoodsList(this.params)
        console.log(res)
        this.tableData = res.data.data.goods

        this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      }
    },
    handleSizeChange (newval) { // 每页条数
      console.log(`每页 ${newval} 条`)
      this.params.pagesize = newval
      this.getGoodsList()
    },
    handleCurrentChange (newval) { // 当前第几页
      console.log(`当前页: ${newval}`)
      this.params.pagenum = newval
      this.getGoodsList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
::v-deep .top {
  margin-top: 15px;
}
::v-deep .table {
  margin-top: 15px;
}
</style>
