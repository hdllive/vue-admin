<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="top">
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
        <el-table-column property="authName" label="权限名称" width="360">
        </el-table-column>
        <el-table-column property="path" label="路径" width="360">
        </el-table-column>
        <el-table-column property="level" label="权限等级">
          <template v-slot="{ row }">
            <el-tag v-if="row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-if="row.level === '1'">等级二</el-tag>
            <el-tag type="warning" v-if="row.level === '2'">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRightsList } from '@/api/roles'
export default {
  created () {
    this.getRightsList()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async getRightsList () {
      try {
        const res = await getRightsList()
        console.log(res)
        this.tableData = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.table {
  margin-top: 15px;
}
.top {
  margin-top: 15px;
}
</style>
