<template>
  <el-form :model="formList" :rules="rules" ref="FormRef">
    <el-form-item label="商品名称" prop="name">
      <el-input v-model="formList.name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="price">
      <el-input v-model="formList.price"></el-input>
    </el-form-item>
    <el-form-item label="商品重量" prop="weight">
      <el-input v-model="formList.weight"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="num">
      <el-input v-model="formList.num"></el-input>
    </el-form-item>
    <el-form-item label="商品分类">
      <el-cascader
        placeholder="请选择"
        v-model="formList.selectValue"
        :options="dataList"
        :props="optionProps"
        @change="selectFn"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AddForm',
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {
      formList: {
        name: '',
        price: '0',
        weight: '0',
        num: '0',
        selectValue: ''
      },
      optionProps: { // 下拉框的匹配规则
        value: 'cat_id',
        label: 'cat_name',
        expandTrigger: 'hover'
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', tirgger: 'blur' },
          { min: 2, max: 8, message: '长度在2-8个字符之间', targger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', targger: 'blur' }
        ],
        weight: [
          { required: true, message: '请输入商品重量', targger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入商品数量', targger: 'blur' }
        ]
      },
      shopParams: {
        id: 6,
        sel: 'many'
      },
      canshuList: []
    }
  },
  methods: {
    selectFn (value) {
      console.log(value)
      this.$emit('selectFn', value)
      this.$emit('addForm', this.formList)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
