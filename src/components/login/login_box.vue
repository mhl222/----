<template>
  <div class="login_box_body">
    <p class="login_title"> Login</p>
    <div>
      <div class="input_box">
		  <div style="display: inline;">
			  <el-input placeholder="请输入邮箱账号" v-model="account" @input='check_ac'>
			    <template #prepend>账号：</template>
			  </el-input>
		  </div>
		<span id="notice" >{{check}}</span>
		
      </div>
	  <div class="input_box">
	  		  <div >
	  			  <el-input placeholder="请输入邮箱账号" v-model="password" show-password>
	  			    <template #prepend>密码：</template>
	  			  </el-input>
	  		  </div>
	  		
	  </div>
    
      <el-button type="primary" @click='login'>立即登录</el-button>
       
    </div>
  </div>
</template>

<script>
import {AccountAuth,UserAccount} from '../../net_util/index.js'
export default {
  data(){
    return{
      account:'',
      password:'',
	  check:''

    }
  },
  methods:{
	  check_ac(){
		  let re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
		  //判断检测这个值是否正确，
		  if(this.account=='')
		  	{
		  		this.check =''
		  		return
		  	}
		if (re.test(this.account)) { //如果验证正确执行以下代码
			this.check = '√邮箱验证成功';
			notice.style.color = 'green';
		} else { //验证不成功，执行以下代码
			this.check = '×输入正确邮箱格式';
			notice.style.color = 'red';
		}
	  },
	  async login() {
				console.log('start')
	  		   if(!this.account || !this.password)
			   {
				   alert('请输入完整信息')
				   return
				}
				// let auth = new AccountAuth();
	  		   // let user = await auth.getUser(this.account,this.password)
	           // this.$store.commit('login',user)
			   let user = {account:this.account,password:this.password}

			   if(!user)
			   {
				   alert('登陆失败，请检查登录信息！')
				   return
			   }
	  		   this.$store.commit('login',user)
			   this.$router.push('/index')
	      }
  }
};
</script>

<style>
#notice{
float: right;
}
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
  display: block;
  width: 380px;
  
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