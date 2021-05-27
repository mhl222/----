<template>

	<el-row style="height: 100%;padding: 0 !important;">
		<el-col :span="12" style="height: 100%">
			<img src="../../assets/title.png" alt="HFUT智能相册" style="height: 50px" />
		</el-col>
		<el-col :span="8" :offset="4" style="height: 100%">
			<div class="userBox">

				<el-dropdown style="margin: 10px 10px">
					<span><i class="el-icon-user-solid" style="margin-right: 15px;"></i>XXX用户<i class="el-icon-arrow-down el-icon--right"></i></span>
					<template #dropdown>
						<el-dropdown-menu>

							<el-dropdown-item @click='logout()'>注销</el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
		</el-col>
	</el-row>

</template>

<script>
	export default {
		methods: {
			logout() {
				this.$store.commit('logout')
				this.$router.push('/login')
			}
		}
	};
</script>

<style>
	.userBox{
		margin-top: 10px;
		margin-right: 50px;
		float: right;
		border: 1px solid #00BFFF;
		border-radius:25px;
	}
	.userBox:hover{
		color:#00BFFF ;
		background-color:#EBEEF5 ;
		border-radius:25px;
	}

</style>
