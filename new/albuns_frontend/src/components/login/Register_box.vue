<template>
  <div class="register_dig">
    <el-button type="primary" @click="dialogVisible = true" style="margin-top: 10px"
      >注册</el-button
    >
    <el-dialog
      title='注册'
      center
      :visible.sync="dialogVisible"
      width="350px"
      :before-close="handleClose"
    >
      <div class="dialog_body">
        <el-input placeholder="请输入内容" v-model="input1">
    <template slot="prepend">XX</template>
  </el-input>
  <el-input placeholder="请输入内容" v-model="input1">
    <template slot="prepend">XX</template>
  </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" >提交</el-button>
    </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
          done();
    },
  },
};
</script>
<style >
.register_dig{
  height: 100%;
  float: right ;
}
.dialog_body{
  background-color: aqua;
}
</style>