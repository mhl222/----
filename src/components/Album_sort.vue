<template>
   	<el-container style="allBody">
		<el-header class="display_header">
			<el-row>
				<el-col :span="12" style="height: 50px;"><span class="display_tit">/全部照片</span></el-col>
				<el-col :span="12" style="height: 50px;">
					<div class="display_upload">
				

						<el-button type="primary" size="small" round @click="centerDialogVisible = true">移出回收站<i
								class="el-icon-upload el-icon--right"></i></el-button>

						<el-dialog title="上传" v-model="centerDialogVisible" width="30%" center>

							<el-upload class="upload-demo" ref="upload" action="" :on-remove="handleRemove"
								:file-list="fileList" :on-preview=" handlePreview" :http-request="uploadFile"
								:auto-upload="false">
								<template #trigger>
									<el-button size="small" type="primary">选取文件</el-button>
								</template>
								<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
									上传到服务器</el-button>
								<template #tip>
									<div class="el-upload__tip">
										只能上传 jpg/png 文件，且不超过 500kb
									</div>
								</template>
							</el-upload>

						</el-dialog>
					</div>
				</el-col>
			</el-row>
		</el-header>

		<el-main class="display_body">
		
			  
		</el-main>
		
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>