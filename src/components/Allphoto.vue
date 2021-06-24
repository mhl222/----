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
                :on-error="uploadFileError" :on-success="uploadFileSuccess"
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

				checkList: ['data:image/png;base64,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'],
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
      downloadFile(content, fileName) { //下载base64图片
        var base64ToBlob = function(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for(let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
        };
        let aLink = document.createElement('a');
        let blob = base64ToBlob(content); //new Blob([content]);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
      },
			downloadImg() {
				if (this.checkList.length == 0) {

					alert('请最少勾选一项！')
				}
        this.$options.methods.downloadFile(this.checkList[0],'test')
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
      //自定义上传
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
          if(ret)
          {
            params.onSuccess(ret)
          }else{
            params.onError(ret)
          }
          
        
			},
      //上传失败
	    uploadFileError(err, file, fileList){
	      console.log('文件上传失败')
	    },
      	//上传成功
	    uploadFileSuccess(response, file, fileList){
	       console.log('文件上传成功')
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
.allBody {
  width: 100%;
  height: 100%;
  padding: 0;
}
.imgDisplay {
  float: left;
  margin: 10px;
}

.display_header {
  background-color: #ebeef5;
  box-shadow: 0px 15px 10px -15px rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 45px !important;
}

.display_tit {
  color: #00bfff;
  display: inline-block;
  margin-top: 10px;
  margin-left: 10px;
  padding: 2px;
  box-shadow: 0 0 4px #00bfff;
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
.imgTit {
  margin: 10px;
  font-size: 25px;
}
</style>
