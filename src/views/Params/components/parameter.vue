<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" size="mini" @click="addFn">
      {{ listTitle.name }}
    </el-button>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%" border>
      <el-table-column type="expand" width="60">
        <template v-slot="{ row }">
          <el-tag
            :key="index"
            v-for="(tag, index) in row.attr"
            closable
            :disable-transitions="false"
            @close="handleClose(row, index, tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(row)"
            @blur="handleInputConfirm(row)"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="attr_name" label="分类名称" width="580">
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="small"
            @click="setFn(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="delAttributes(row)"
          >
            删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加静动态参数提示框 -->
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <template #title>
        {{ listTitle.isEdit ? "添加动态参数" : "添加静态态参数" }}
      </template>
      <el-form :model="myForm" :rules="rules">
        <el-form-item label-width="100px" prop="value">
          <template #label>
            {{ listTitle.isEdit ? "动态参数" : "静态参数" }}
          </template>
          <el-input v-model="myForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttributes">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑提交 -->
    <el-dialog
      title="修改动态参数"
      :visible.sync="setdialogVisible"
      width="30%"
    >
      <el-form :model="setmyForm" :rules="rules">
        <el-form-item
          prop="value"
          label="参数名称"
          label-width="80px
        "
        >
          <el-input v-model="setmyForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAttributesList">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setAttributes, addAttributes, delGoodsAttributes, setGoodsAttributes } from '@/api/goods'
export default {
  name: 'Parameter',
  props: {
    listTitle: {
      type: Object,
      required: true
    },
    tableData: { // 表格静动总数据
      type: Array,
      required: true,
      default: null
    },
    valueId: { // 选中的id
      type: [Array, String]
    }
  },
  created () { },
  data () {
    return {
      dialogVisible: false,
      setdialogVisible: false,
      myForm: {
        value: ''
      },
      setmyForm: {
        value: ''
      },
      rules: {
        value: [
          { required: true, message: '请输入分类名称', tirgger: 'blur' },
          { min: 2, max: 8, message: '长度为2-8位之间', tirgger: 'blur' }
        ]
      },
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      tagList: [],
      arr: [],
      setdata: { // 编辑提交数据
        id: '',
        attrId: '',
        attr_name: '',
        attr_sel: ''
      }
    }
  },
  methods: {
    addFn () {
      this.dialogVisible = true
    },
    async handleClose (row, index, tag) { // 删除tags
      console.log(tag)
      const data = {
        id: row.cat_id,
        attrId: row.attr_id,
        attrName: row.attr_name,
        attrSel: row.attr_sel,
        attrVals: tag
      }
      console.log(data)
      const res = await setAttributes(data)
      console.log(res)
      row.attr.splice(index, 1)
      this.$message.success('删除成功')
    },
    showInput () { // 点击显示添加输入框
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm (row) { // 添加tags标签
      console.log(row)
      if (this.inputValue) {
        console.log(row.attr)
        row.attr.push(this.inputValue)
        this.arr = [...row.attr]
      }
      console.log(this.arr)
      const data = {
        id: row.cat_id,
        attrId: row.attr_id,
        attrName: row.attr_name,
        attrSel: row.attr_sel,
        attrVals: row.attr.join(' ')
      }
      console.log(data)
      const res = await setAttributes(data)
      console.log(res)
      this.inputVisible = false
      this.inputValue = ''
    },
    async addAttributes () { // 添加静动态参数
      if (this.listTitle.isEdit) { // 静态
        const data = {
          id: this.valueId[this.valueId.length - 1],
          attrName: this.myForm.value,
          attrSel: 'many'
        }
        const res = await addAttributes(data)
        console.log(data)
        console.log(res)
      } else { // 动态
        const data1 = {
          id: this.valueId[this.valueId.length - 1],
          attrName: this.myForm.value,
          attrSel: 'only'
        }
        const res = await addAttributes(data1)
        console.log(data1)
        console.log(res)
      }
      this.dialogVisible = false
      this.$emit('setList')
    },
    async delAttributes (row) { // 删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delGoodsAttributes(row.cat_id, row.attr_id)
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    setFn (row) { // 点击编辑
      this.setdialogVisible = true
      console.log(row)
      this.setmyForm.value = row.attr_name
      this.setdata.id = row.cat_id
      this.setdata.attrId = row.attr_id
      this.setdata.attr_name = this.setmyForm.value
      this.setdata.attr_sel = row.attr_sel
    },
    async setAttributesList () { // 编辑提交参数接口
      const res = await setGoodsAttributes(this.setdata)
      console.log(this.setdata)
      console.log(res)
      this.setdialogVisible = false
      this.$emit('setList')
      this.$message.success('更新成功')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-button {
  margin-bottom: 15px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
