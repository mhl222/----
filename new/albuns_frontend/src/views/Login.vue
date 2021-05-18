<template>
  <el-container class="login_body">
    <el-header class="header_login">
      <el-row style="height: 100%">
        <el-col :span="12" style="height: 100%">
          <img
            src="../assets/title.png"
            alt="HFUT智能相册"
            style="height: 50px"
          />
        </el-col>
        <el-col :span="2" :offset="10" style="height: 100%">
          <registerbox></registerbox>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="login_box">
      <div class="login_tit">
        轻松掌控你的图库<br />
        <strong style="font-size: 30px">智能分类管理<br /></strong>
        了解你的生活出行各个场景，平凡生活也可以聚合成精彩视频。强大的
        图片识别，帮您找出自己关注的每个人。自动为你建立生活中每个重要
        面孔的相册，与家人朋友共享美好时刻。
        <div class="login_img">
          <img src="../assets/1.png" />
          <img src="../assets/2.png" />
          <img src="../assets/3.png" />
        </div>
        <loginbox></loginbox>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import loginbox from "../components/login/login_box";
import registerbox from "../components/login/Register_box";
export default {
  components: {
    loginbox,
    registerbox
  },
};
</script>
<style>
.login_box,
.login_body {
  width: 100%;
  height: 100%;
}
.login_box {
  background-image: url("../assets/background.jpg");
  background-size: 100% 100%;
}
.header_login {
  border-bottom: 2px solid #d2691e;
  background-color: #e6e6fa;
}
.login_tit {
  text-align: center;
  margin: 30px auto;
  width: 60%;
}
.login_img {
  margin: 0 auto;
  width: 270px;
  align-content: center;
}
.login_img img {
  width: 50px;
  height: 50px;
  margin: 10px;
}
</style>