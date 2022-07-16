<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索用户 -->
    <div class="container">
      <el-row :gutter="20">
        <el-col :span="8" class="search"
          ><div>
            <el-input
              placeholder="请输入内容"
              v-model="params.query"
              class="input-with-select"
              clearable
              @clear="getUserList"
              @keyup.native.enter="getUserList"
            >
              <el-button
                @click="getUserList"
                slot="append"
                icon="el-icon-search"
              ></el-button>
            </el-input></div
        ></el-col>
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            <el-button type="primary" @click="centerDialogVisible = true"
              >添加用户</el-button
            >
          </div></el-col
        >
      </el-row>

      <!-- 表格 -->
      <div class="mytable">
        <el-table :data="tableData" border style="width: 100%" stripe>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="#"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="230">
          </el-table-column>
          <el-table-column prop="create_time" label="电话" width="250">
          </el-table-column>
          <el-table-column prop="role_name" label="角色" width="250">
          </el-table-column>
          <el-table-column label="状态" width="220">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-icon-class="1"
                inactive-value="0"
                @change="handleSwitch(scope.$index, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                v-model="scope.row"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="updateUsersFn(scope.$index, scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click="delUsers1(scope.$index, scope.row)"
              >
              </el-button>
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                circle
                @click="setUsers1(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.pagenum"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="params.total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 添加用户弹出框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
    >
      <span>
        <el-form :model="addForm" :rules="rules" ref="addFormRef">
          <el-form-item prop="username" label="用户名" label-width="80px">
            <el-input v-model="addForm.username"> </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" label-width="80px">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" label-width="80px">
            <el-input v-model="addForm.email"> </el-input>
          </el-form-item>
          <el-form-item prop="moblie" label="手机号" label-width="80px">
            <el-input v-model="addForm.moblie"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserFn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户提示框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="centerDialogVisible1"
      width="40%"
      center
    >
      <span>
        <el-form :model="updateForm" :rules="rules" ref="updateFormRef">
          <el-form-item prop="username" label="用户名称" label-width="80px">
            <el-input v-model="updateForm.username" :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" label-width="80px">
            <el-input v-model="updateForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="moblie" label="手机号" label-width="80px">
            <el-input v-model="updateForm.moblie"> </el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUsersFn1">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除用户提示框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>
        <i class="el-icon-warning" style="color: red"></i>
        此操作将永久删除该用户, 是否继续?</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delUsers">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置用户提示框 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible1" width="40%">
      <p>当前的用户:<span>admin</span></p>
      <p>当前的角色:<span>超级管理员</span></p>
      <p>
        分配新角色:<el-select v-model="formInline.region" placeholder="请选择">
          <el-option
            :label="item.roleName"
            :value="item.id"
            v-for="(item, index) in usersRolesList"
            :key="index"
          ></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="setUsers">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validateMoblie } from '@/utils/validate'
import { getUsers, updateUsers, addUsers, updateUsersForm, delUsersForm, setUsersForm, getUsersRoles, getyserTableId } from '@/api/user'
export default {
  name: 'user',
  created () {
    this.getUsers()
  },
  data () {
    const validateMoblieFn = (rule, value, callback) => {
      if (validateMoblie(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
    return {
      tableData: [], // 用户总数据
      value: false, // 状态按钮
      dialogVisible: false, // 删除用户弹出框状态
      dialogVisible1: false, // 设置用户弹出框状态
      centerDialogVisible: false, // 添加用户弹出框
      centerDialogVisible1: false, // 修改用户弹出框
      addForm: { // 添加用户表单数据
        username: '',
        password: '',
        email: '',
        moblie: ''
      },
      updateForm: { // 修改用户表单数据
        username: '',
        email: '',
        moblie: '',
        id: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', tirgger: 'blur' },
          { min: 3, max: 8, message: '长度为3-8位之间', tirgger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', tirgger: 'blur' },
          { min: 6, max: 16, message: '长度为3-8位之间', tirgger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        moblie: [
          { required: true, message: '请输入正确的手机号', tirgger: 'blur' },
          { validator: validateMoblieFn, tirgger: 'blur' }
        ]
      },
      // 获取用户数据
      params: {
        query: '',
        pagenum: 1,
        pagesize: 5,
        total: null
      },
      formInline: { // 表单下拉框的value
        region: null, // 角色id
        id: null // 用户id
      },
      usersRolesList: []
    }
  },
  methods: {
    async getUserList () { // 搜索用户信息
      try {
        const res = await getyserTableId({
          query: this.params.query,
          pagenum: this.params.pagenum,
          pagesize: this.params.pagesize
        })
        console.log(res)
        this.tableData = res.data.data.users
        this.params.total = res.data.data.total
        this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      }
    },
    handleSizeChange (newval) { // 每页条数
      console.log(`每页 ${newval} 条`)
      this.params.pagesize = newval
      this.getUserList()
    },
    handleCurrentChange (newval) { // 当前第几页
      console.log(`当前页: ${newval}`)
      this.params.pagenum = newval
      this.getUserList()
    },
    indexMethod (index) { // 表格的key值
      return ++index
    },
    async getUsers () { // 获取用户数据
      try {
        const res = await getUsers(this.params)
        console.log(res)
        this.tableData = res.data.data.users
        this.params.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 修改用户状态
    handleSwitch (index, row) {
      // console.log(row)
      // console.log(row.id)
      // console.log(row.mg_state)
      const type = Boolean(row.mg_state)
      const param = {
        uId: row.id,
        type
      }
      console.log(param)
      updateUsers(param)// 更新状态的接口
        .then(res => {
          console.log(res)
          this.$message.success(res.data.meta.msg)
          // this.getUsers()
        })
        .catch(() => { this.$message.error('设置状态失败') })
    },
    // 添加用户
    async addUserFn () {
      this.centerDialogVisible = false
      const data = {
        username: this.addForm.username,
        password: this.addForm.password,
        email: this.addForm.email,
        mobile: this.addForm.mobile
      }
      console.log(data)
      try {
        const res = await addUsers(data)
        console.log(res)
        if (res.data.meta.status === 201) {
          this.$message.success(res.data.meta.msg)
          this.getUsers()
        } else {
          this.$message.error('添加失败，请重试')
        }
      } catch (err) {
        console.log(err)
        this.$message.error('添加用户失败，请重试')
      }
    },
    // 编辑用户提交表单渲染
    async updateUsersFn (index, row) {
      console.log(row)
      this.updateForm.username = row.username
      this.updateForm.email = row.email
      this.updateForm.moblie = row.create_time
      this.updateForm.id = row.id
      this.centerDialogVisible1 = true
    },
    // 编辑用户提交确认按钮接口
    async updateUsersFn1 () {
      try {
        const res = await updateUsersForm({
          id: this.updateForm.id,
          email: this.updateForm.email,
          moblie: this.updateForm.moblie
        })
        console.log(res)
        this.centerDialogVisible1 = false
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error('更新失败，请重试')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除用户信息提示框
    async delUsers1 (index, row) {
      this.dialogVisible = true
      console.log(row)
      this.updateForm.id = row.id
    },
    // 删除用户信息接口
    async delUsers () {
      try {
        const res = await delUsersForm({
          id: this.updateForm.id
        })
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
        } else {
          this.$message.error(res.data.meta.msg)
        }
        this.dialogVisible = false
      } catch (err) {
        console.log(err)
      }
    },
    // 获取下拉框角色数据接口
    async getUsersRoles () {
    },
    // 设置用户角色弹出框
    async setUsers1 (index, row) {
      this.dialogVisible1 = true
      // console.log(this.formInline.region)
      try {
        const res = await getUsersRoles()
        console.log(res)
        this.usersRolesList = res.data.data
        console.log(row)
        this.formInline.id = row.id
      } catch (err) {
        console.log(err)
      }
    },
    // 设置用户角色接口
    async setUsers () {
      const data = {
        id: this.formInline.id,
        rid: this.formInline.region
      }
      // console.log(data)
      try {
        const res = await setUsersForm(data)
        console.log(res)
        this.$message(res.data.meta.msg)
        this.dialogVisible1 = false
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
.container {
  margin-top: 15px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 15px;
  .mytable {
    margin-top: 15px;
    margin-bottom: 15px;
  }
}
:deep(.el-dialog__footer) {
  text-align: right;
  z-index: 9;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
