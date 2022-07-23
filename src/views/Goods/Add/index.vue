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
          ><AddForm
            :dataList="categoriesList"
            @selectFn="parameterFn($event)"
            @addForm="addParameter($event)"
          ></AddForm>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span @click="onClick">商品参数</span>
          </template>
          <div class="parameter">
            <div v-for="(item, index) in canshuList" :key="index">
              <div style="margin-top: 30px">
                <p style="margin-top: 10px">{{ item.attr_name }}</p>
                <el-checkbox
                  v-for="(item1, index1) in item.attr_vals"
                  :key="index1"
                  v-model="checked1"
                  :label="item1"
                  border
                ></el-checkbox>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span @click="onAttribute">商品属性</span>
          </template>
          <el-form>
            <el-form-item v-for="(item, index) in canshuListDo" :key="index">
              <template #label>{{ item.attr_name }}</template>
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
          >
            <el-button size="small" type="primary" style="margin-top: 15px"
              >点击上传</el-button
            >
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quillEditor></quillEditor>
          <el-button type="primary" @click="addFnGoods">添加商品</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AddForm from '../AddForm'
import { getAategoriesList, getAttributes, addGoods } from '@/api/goods'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Add',
  async created () {
    const res = await getAategoriesList()
    console.log(res)
    this.categoriesList = res.data.data
  },
  data () {
    return {
      active: 0, // 步骤条索引
      tabPosition: 'left',
      categoriesList: [], // 商品分类的总数据
      checked1: true,
      checked2: false,
      canshuList: [], // 商品静态参数的数据
      canshuListDo: [], // 商品动态参数的数据
      valueId: [], // form组件传回来选择数据的id数组值
      data: { // 动态的接口参数
        id: 6,
        sel: 'many'
      },
      data1: { // 动态的接口参数
        id: 6,
        sel: 'only'
      },
      addData: {
        goods_name: '', // 商品名称
        goods_cat: '', // 以为','分割的分类列表
        goods_price: 0, // 价格
        goods_number: 0, // 数量
        goods_weight: 0, // 重量
        goods_introduce: '', // 介绍
        pics: '', // 上传的图片临时路径（对象）
        attrs: '' // 商品的参数（数组），包含 动态参数 和 静态属性
      } // 动态参数
    }
  },
  methods: {
    async parameterFn (e) { // 下拉框选择触发事件
      // console.log(e)
      this.data.id = e[e.length - 1]
      this.data1.id = e[e.length - 1]
      const res = await getAttributes(this.data)
      console.log(res)
      this.canshuList = res.data.data
      this.canshuList.forEach(item => {
        item.attr_vals = item.attr_vals.split(' ')
      })
      console.log(this.canshuList)
    },
    async onClick () { // 点击商品参数触发事件
      const res = await getAttributes(this.data)
      console.log(res)
      this.canshuList = res.data.data
      this.canshuList.forEach(item => {
        item.attr_vals = item.attr_vals.split(' ')
      })
      console.log(this.canshuList)
    },
    async onAttribute () {
      console.log(22)
      const res = await getAttributes(this.data1)
      console.log('动', res)
      this.canshuListDo = res.data.data
    },
    handleRemove (file, fileList) { // 点击关闭图片触发事件
      console.log(file, fileList)
      console.log(11)
    },
    handlePreview (file) { // 点击图片触发事件
      console.log(file)
      console.log(222)
    },
    addParameter (e) { // form组件传来表单的数据
      console.log('参数', e)
      this.addData.goods_name = e.name
      this.addData.goods_price = e.price
      this.addData.goods_number = e.num
      this.addData.goods_weight = e.weight
      this.addData.goods_cat = e.selectValue.join(',')
    },
    async addFnGoods () { // 点击添加按钮
      console.log(this.addData)
      const res = await addGoods(this.addData)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message.success('创建商品成功')
        this.$router.push('/goods')
      } else {
        this.$message.error('创建商品失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { AddForm, quillEditor }
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
::v-deep .ql-container {
  height: 300px;
  margin-bottom: 15px;
}
::v-deep .quill-editor {
  margin-top: 15px;
}
</style>
