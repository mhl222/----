<template>
  <div class="register_dig">
    <el-button type="primary" style="margin-top: 10px" @click="centerDialogVisible = true">注册</el-button>

<el-dialog
  title="注册"
  v-model="centerDialogVisible"
  width="30%"
  center>
  <div class="dialog_body">
      <el-input placeholder="（手机号/邮箱）" v-model="input1">
    <template #prepend>账号</template>
  </el-input>
  <el-input placeholder="最低8位" v-model="input2">
    <template #prepend>密码</template>
  </el-input>
      </div>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
    </span>
  </template>

</el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      input1:'',
      input2:''
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