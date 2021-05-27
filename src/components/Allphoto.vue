<template>
	<el-container style="allBody">
		<el-header class="display_header">
			<el-row>
				<el-col :span="12" style="height: 50px;"><span class="display_tit">/全部照片</span></el-col>
				<el-col :span="12" style="height: 50px;">
					<div class="display_upload">
						<el-button type="success" size="small" round @click='downloadImg'>下载<i
								class="el-icon-download el-icon--right"></i></el-button>

						<el-button type="primary" size="small" round @click="centerDialogVisible = true">上传<i
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
			<el-checkbox-group v-model="checkList">
				<li v-for="item in urls2 " style="list-style-type:none">

					<p class="imgTit">{{item.time}}</p>

					<li v-for="subitem in item.imgs" style="list-style-type:none;" class="imgDisplay">
						<el-checkbox :label="subitem">
							<el-image style="width: 150px; height: 150px ;" :src="subitem" :preview-src-list="url"></el-image>
						</el-checkbox>
					</li>
					<div style="clear: both;"></div>
				</li>
			</el-checkbox-group>
			  
		</el-main>
		
</el-container>
</template>

<script>
	export default {
		data() {
			return {

				checkList: [],
				centerDialogVisible: false,
				fileList: [],
				dataList: [],
				url: [
					'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
					'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
					'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
					'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
					'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
					 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
					 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
					'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
					 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
				],
				urls: [{
						img: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
						time: '2021年5月4日'
					},
					{
						img: 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
						time: '2021年5月3日'
					},
					{
						img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
						time: '2021年5月3日'
					},

				],
				urls1: {
					'2021年5月4日': ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', ],
					'2021年5月3日': ['https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
						'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
					]
				},
				urls2: [{
						time: '2021年5月4日',
						imgs: ['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', ]
					},
					{
						time: '2021年5月3日',
						imgs: ['https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
							'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
						]
					},
					{
						time: '2021年5月1日',
						imgs: ['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
						]
					},
				]

			}
		},
		methods: {
			downloadImg() {
				if (this.checkList.length == 0) {

					alert('请最少勾选一项！')
				}
			},
			getBase64(file) {
				return new Promise(function(resolve, reject) {
					let reader = new FileReader();
					let imgResult = "";
					reader.readAsDataURL(file);
					reader.onload = function() {
						imgResult = reader.result;
					};
					reader.onerror = function(error) {
						reject(error);
					};
					reader.onloadend = function() {
						resolve(imgResult);
					};
				});
			},

			handleRemove(file) {
				for (let key in this.dataList) {
					console.log(key)
					if (this.dataList[key].name == file.raw.name) {
						this.dataList.splice(key, 1)
					}
				}
				console.log(this.dataList)

			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			async uploadFile(params) {
				// console.log("uploadFile", params);
				let base64 =await this.$options.methods.getBase64(params.file)
        console.log(base64)
         	let name = this.$options.methods.randomName()
					name = name + params.file.type.replace('/', '.')
					let date
					var now = new Date();
					var year = now.getFullYear();
					var month = now.getMonth();
					var datenow = now.getDate();
					date = year + '年' + month + '月' + datenow
					console.log(date)
          let ret =  await this.$store.state.loginObj.upload( name,'default', base64, {"uploadDate": date})
          console.log(ret)
          if(ret)
          {
            console.log('upload success')
            return true
          }else{
            console.log('upload fiald')
            return false
          }
          
        
			},
			handlePreview(file) {
				console.log(file);
			},
			randomName() {
				const data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",
					"G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
					"Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
					"s", "t", "u", "v", "w", "x", "y", "z"
				];
				let nums = "";
				for (let i = 0; i < 15; i++) {
					const r = parseInt(Math.random() * 61, 10);
					nums += data[r];
				}
				return nums;
			}

		}
	}
</script>

<style>
	.allBody{
		width:100% ;
		height: 100%;
		padding:0;
	}
	.imgDisplay {
		float: left;
		margin: 10px;

	}

	.display_header {
		background-color: #EBEEF5;
		box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.5);
		width: 100%;
		height: 45px !important;
	}

	.display_tit {

		color: #00BFFF;
		display: inline-block;
		margin-top: 10px;
		margin-left: 10px;
		padding: 2px;
		box-shadow: 0 0 4px #00BFFF;


	}

	.display_body {
		margin: 0 10px;
		width: 100%;
		height: 100%;
		 overflow: scroll;
		 padding: 5px;
	}

	.display_upload {
		float: right;
		margin-top: 8px;
		margin-right: 20px;
	}
	.imgTit{
		margin: 10px;
		font-size:25px
	}
</style>
