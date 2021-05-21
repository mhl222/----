<template>
  <div class="login_box_body">
    <p class="login_title"> Login</p>
    <div>
      <div class="input_box">
        <el-input placeholder="请输入账号" v-model="account">
          <div class="input_box"></div>
          <template slot="prepend">账号：</template>
        </el-input>
      </div>
      <div class="input_box">
        <el-input placeholder="请输入密码" v-model="password">
          <div class="input_box"></div>
          <template slot="prepend">密码：</template>
        </el-input>
      </div>
      <el-button type="primary" @click='login'>立即登录</el-button>
       
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      account:null,
      password:null

    }
  },
  methods:{
	  async login() {
	  		   if(!this.account || !this.password)
			   {
				   alert('请输入完整信息')
				   return
				}
	  		    // let AccountAuth = new AccountAuth()
	  		   // let user = await AccountAuth.getUser(this.account,this.password)
	           // this.$store.commit('login',user)
	  		   this.$store.commit('login',{account:this.account,password:this.password})
			   this.$router.push('/index')
			   
	      }
  }
};
</script>

<style>
.login_box_body {
  position: absolute;
  top: 60%;
  left: 50%;
  height: 300px;
  width: 500px;
  margin-left: -250px;
  margin-top: -150px;
  align-content: center;
  box-shadow: 2px 2px 6px 4px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
}
.input_box {
  margin: 20px 60px;
  
}
.login_title{
  width: 150px;
  color: #409EFF;
  font-size: 30px;
  margin:20px auto ;
   
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.7);
}
</style>