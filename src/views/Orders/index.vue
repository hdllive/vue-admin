<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="margin-top: 20px">
      <el-col :span="8" class="search" style="margin-bottom: 20px"
        ><div>
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input></div
      ></el-col>

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
        <el-table-column prop="order_number" label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格"> </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template v-slot="{ row }">
            <el-tag v-if="row.order_pay === '0'" effect="dark" type="danger"
              >未支付</el-tag
            >
            <el-tag v-else effect="dark" type="success">已支付 </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pay_status" label="是否发货">
          <template v-slot="{ row }">
            <span v-if="row.pay_status">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="下单时间">
          <template v-slot="{ row }">{{
            row.create_time | formatDate
          }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getOrdersList } from '@/api/orders'
export default {
  created () {
    this.getOrdersList()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getOrdersList () {
      const res = await getOrdersList({
        pagenum: 1,
        pagesize: 10
      })
      console.log(res)
      this.tableData = res.data.data.goods
    }
  },
  computed: {
  },
  watch: {},
  filters: {
    formatDate (value) {
      return dayjs.unix(value).format('YYYY-MM-DD')
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
</style>
