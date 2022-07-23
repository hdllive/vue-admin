<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类 </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="top">
      <el-button type="primary" @click="addClass">添加分类</el-button>

      <!-- 表格 -->
      <el-table
        class="table"
        :data="tableData"
        border
        style="width: 100%"
        row-key="cat_id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="#" width="50">
          <template v-slot="{ row }">{{ row.index }}</template>
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="280">
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" width="280">
          <template v-slot="{ row }">
            <i class="el-icon-error" v-if="row.cat_deleted"></i>
            <i class="el-icon-success" v-else style="color: #008000"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template v-slot="{ row }">
            <el-tag v-if="row.cat_level === 0">等级一</el-tag>
            <el-tag type="success" v-if="row.cat_level === 1">等级二</el-tag>
            <el-tag type="warning" v-if="row.cat_level === 2">等级三</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
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
          :current-page="params1.pagenum"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <!-- 添加提示框 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogVisible" width="45%">
      <el-form :model="classForm" :rules="rules">
        <el-form-item prop="classVaule" label="分类名称:" label-width="100px">
          <el-input v-model="classForm.classVaule"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:" label-width="100px">
          <el-cascader
            v-model="value"
            ref="casc"
            :options="classList"
            :props="optionProps"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategories">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAategoriesList, addCategories } from '@/api/goods'
export default {
  created () {
    this.getAategoriesList()
  },
  data () {
    return {
      tableData: [], // 表格总数据
      params: { // 表格数据的params参数
        pagenum: 1,
        pagesize: 4
      },
      dialogVisible: false,
      optionProps: { // 下拉框的配置
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover',
        checkStrictly: true
      },
      classList: [], // 添加分类下拉框的数据
      value: '', // 下拉框选中的vuele值
      classForm: {
        classVaule: ''
      },
      rules: {
        classVaule: [
          { required: true, message: '请输入分类名称', tirgger: 'blur' },
          { min: 2, max: 8, message: '长度为2-8位之间', tirgger: 'blur' }
        ]
      },
      params1: { // 分页的参数
        pagenum: 1,
        pagesize: 4
      },
      total: null,
      dataList: { // 添加接口参数
        cat_pid: '',
        cat_name: '',
        cat_level: ''
      }
    }
  },
  methods: {
    async getAategoriesList () { // 获取总数据
      const res = await getAategoriesList(this.params)
      console.log(res)
      this.tableData = res.data.data.result
      // 为每个列表添加一个索引
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].index = i + 1
      }
      this.total = res.data.data.total
    },
    async addClass () { // 下拉框的接口
      this.dialogVisible = true
      const res = await getAategoriesList({ // 只需要二级的数据
        type: 2
      })
      console.log(res)
      this.classList = res.data.data
    },
    handleChange (value) { // 选择下拉框的事件
      console.log(value)
      this.dataList.cat_pid = value[value.length - 1]
      this.dataList.cat_level = this.$refs.casc.getCheckedNodes()[0].level
      console.log(this.dataList.cat_level)
      this.dataList.cat_name = this.classForm.classVaule
    },
    handleSizeChange (newval) { // 每页条数
      console.log(`每页 ${newval} 条`)
      this.params.pagesize = newval
      this.getAategoriesList(this.params1)
    },
    handleCurrentChange (newval) { // 当前第几页
      console.log(`当前页: ${newval}`)
      this.params.pagenum = newval
      this.getAategoriesList(this.params1)
    },
    async addCategories () { // 添加按钮
      const res = await addCategories(this.dataList)
      console.log(res)
      this.$message.success('创建成功')
      this.dialogVisible = false
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
}
.table {
  margin-top: 15px;
}
</style>
