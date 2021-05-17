<template>
  
    <el-row style="height: 100%">
      <el-col :span="12" style="height: 100%">
        <img src="../../assets/title.png" alt="HFUT智能相册" style="height: 50px" />
      </el-col>
      <el-col :span="8" :offset="4" style="height: 100%">
        <div style="float: right">
          <el-dropdown style="margin: 10px 25px">
            <el-button round type="primary">
              <i class="el-icon-upload2"></i>上传
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>上传照片</el-dropdown-item>
                <el-dropdown-item>上传文件夹</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown style="margin: 10px 10px">
            <span
              >XXX用户<i class="el-icon-arrow-down el-icon--right"></i
            ></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>上传照片</el-dropdown-item>
                <el-dropdown-item>上传文件夹</el-dropdown-item>
                <el-dropdown-item>注销</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
 
</template>

<script>
export default {
 
};
</script>

<style>

</style>