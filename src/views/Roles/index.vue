<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="container">
      <el-button type="primary" class="addbtn">添加角色</el-button>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column label="#" width="80 " type="expand">
          <template slot-scope="{ row }">
            <div>
              <div
                class="row"
                v-for="(item, index) in row.children"
                :key="index"
              >
                <div class="grid-content bg-purple left">
                  <el-tag>{{ item.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </div>
                <div class="both">
                  <div
                    class="grid-content bg-purple text"
                    v-for="(item1, index1) in item.children"
                    :key="index1"
                  >
                    <el-tag type="success">{{ item1.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                    <div class="right">
                      <div
                        class="grid-content bg-purple"
                        v-for="(item2, index2) in item1.children"
                        :key="index2"
                      >
                        <el-tag
                          closable
                          @close="delItem(item2, item1.children, index2, row)"
                          disable-transitions
                          >{{ item2.authName }}</el-tag
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="80" :index="indexMethod">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="370">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="370">
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" icon="el-icon-edit" size="small"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="small">
              删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="small"
              @click="addRolesList(row.children, row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分配权限提示框-->
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%">
      <span>
        <el-tree
          :data="tree"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          :default-checked-keys="defaultListId"
        >
        </el-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addbtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 点击删除权限提示框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="25%">
      <span>
        <i class="el-icon-warning" style="color: #e6a23c; font-size: 18px"></i
        >此操作将永久删除该用户的权限, 是否继续?</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible1 = false;
            $message('已取消删除');
          "
          >取消</el-button
        >
        <el-button type="primary" @click="btnFn()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesAll, delRolesItem, getTreeList, setRolesRights } from '@/api/roles'
export default {
  created () {
    this.getRolesAll()
    this.getTreeList()
  },
  data () {
    return {
      tableData: [], // 用户总数据
      dialogVisible: false, // 分配权限弹出框
      dynamicTags: [],
      dialogVisible1: false,
      tagList: {}, // 删除单个权限的参数
      tree: [], // 树形总数据
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultListId: [], // 默认已经选中的数据id
      rolesAllId: {
        nowRoled: '', // 当前行的角色id
        ridsList: '' // 已被勾选选中的keyid
      }
    }
  },
  methods: {
    indexMethod (index) { // 表格的key值
      return ++index
    },
    // 获取所有的角色列表
    async getRolesAll () {
      try {
        const res = await getRolesAll()
        console.log('Roles', res)
        this.tableData = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    async handleClose ({ tag, tag1, index, row }) { // 点击删除标签的事件
      tag1.splice(index, 1)
      this.$message.success('删除成功')
      const data = {
        roleId: row.id,
        rightId: tag.id
      }
      console.log(data)
      try {
        const res = await delRolesItem(data)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    delItem (tag, tag1, index, row) { // 点击弹出框事件
      this.dialogVisible1 = true
      this.tagList = { tag, tag1, index, row }
    },
    btnFn () { // 确认删除按钮事件
      this.dialogVisible1 = false
      console.log(this.tagList)
      this.handleClose(this.tagList)
      this.getRolesAll()
    },
    addRolesList (row, rowAll) {
      this.dialogVisible = true
      this.filterListId(row)
      // console.log(rowAll)
      this.rolesAllId.nowRoled = rowAll.id
    },
    filterListId (row) { // 递归函数拿到已选中的id值
      // console.log(row)
      row.forEach(item => {
        if (item.children) {
          this.filterListId(item.children)
        } else {
          this.defaultListId.push(item.id)
        }
      })
    },
    async getTreeList () { // 获取树形结构数据
      try {
        const res = await getTreeList()
        console.log('treedata', res)
        this.tree = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    async addbtn () { // 点击确定角色授权接口
      this.dialogVisible = false
      // console.log(this.$refs.tree.getCheckedKeys())
      // console.log(this.$refs.tree.getHalfCheckedKeys())
      // 获取当前点击的keyid值，一起存起来合并，需要的数据是字符串，用join拼接改一下
      this.rolesAllId.ridsList = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()].join(',')
      console.log(this.rolesAllId)
      const res = await setRolesRights({
        roleId: this.rolesAllId.nowRoled,
        rids: this.rolesAllId.ridsList
      })
      console.log(res)
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
.container {
  .addbtn {
    margin-bottom: 15px;
  }
  margin-top: 15px;
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px 15px;
  :deep(.el-table__cell .el-table__expanded-cell) {
    width: 100%;
  }
  .row {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100% !important;
    padding-left: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    .left {
      display: flex;
      align-items: center;
    }
    .text {
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      align-items: center;
      margin-left: 170px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
      .right {
        display: flex;
        flex-wrap: nowrap;
        margin-left: 130px;
        .el-tag {
          margin-left: 15px;
        }
      }
    }
  }
}
.both {
  width: 100%;
}
</style>
