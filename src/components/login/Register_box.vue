<template>
	<div class="register_dig">
		<el-button type="primary" style="margin-top: 10px" @click="centerDialogVisible = true">注册</el-button>

		<el-dialog title="注册" v-model="centerDialogVisible" width="30%" center>
			<div>
				<div>
					<el-input placeholder="（邮箱）" v-model="input1" @input='check_ac()'>
						<template #prepend>账号</template>
					</el-input>
					<span id="notice1">{{checkac.msg}}</span>
				</div>
				<div>
					<el-input show-password placeholder="最低8位" v-model="input2" @input='check_pw()'>
						<template #prepend>密码</template>
					</el-input>
					<span id="notice2">{{checkpw.msg}}</span>
				</div>

			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click='register' >确 定</el-button>
				</span>
			</template>

		</el-dialog>
	</div>
</template>


<script>
	import {
		AccountAuth,
		UserAccount
	} from '../../net_util/index.js'
	export default {
		data() {
			return {
				centerDialogVisible: false,
				input1: '',
				input2: '',
				checkac: {flag:false,msg:''},
				checkpw: {flag:false,msg:''}
			};
		},
		methods: {
			check_ac() {
				let re = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;

				if (this.input1 == '') {
					this.checkac.msg = ''
					this.checkac.flag =false
				}
				if (re.test(this.input1)) {
					this.checkac.msg = '√邮箱验证成功';
					notice1.style.color = 'green';
					this.checkac.flag =true
				} else {
					this.checkac.msg = '×输入正确邮箱格式';
					notice1.style.color = 'red';
					this.checkac.flag =false
				}
			},
			check_pw() {
				
				if (this.input2.length == 0) {
					this.checkpw.msg = ''
					this.checkpw.flag =false
				}
				if (this.input2.length < 8) {
					this.checkpw.msg = '密码不足8位';
					this.checkpw.flag =false
				}
				if (this.input2.length >= 8) {
					this.checkpw.msg= ''
					this.checkpw.flag =true
				}
			},
			async  register() {
				console.log('start')
				console.log('1')
				console.log(this.checkac.flag)
				console.log(this.checkpw.flag)
				if (this.checkac.flag && this.checkpw.flag) {
					 let auth = new AccountAuth();
					 auth.test()
					 // let ret = await auth.register(this.input1,this.input2)
					 let ret = true
					 if(ret)
					 {
						 alert("注册成功,账号为："+this.input1)
						 this.centerDialogVisible = false
					 }else{
						  alert("注册失败,请重新尝试")
					 }
				} else {
					alert('请检查信息完整！')
					
				}
			}
		},
	};
</script>
<style>
	#notice1 {
		float: right;
	}

	#notice2 {
		float: right;
	}

	.register_dig {
		height: 100%;
		float: right;
	}
</style>
