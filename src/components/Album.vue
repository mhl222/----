<template>
	<div class="album">
		<div class="display_header">
			<el-row style="padding: 0 20px;">
				<el-col :span="12" style="height: 50px;"><span class="display_tit">/我的相册</span></el-col>
				<el-col :span="12" style="height: 50px;">
					<div class="display_upload">
						<el-popover
						  placement="bottom"
						  :width="300"
						  trigger="click"
						   v-model:visible="visible"
						>
						  <template #reference>
						    <el-button type="primary" size="small" round >创建相册<i class="el-icon-upload el-icon--right"></i></el-button>
						  </template>
						 <div class="crateDig">
							   <el-input placeholder="请输入内容" v-model="input1">
							     <template #prepend>相册名</template>
							   </el-input>
							   <div style="margin:5px 70px;">
								   <el-button size="mini" type="text" @click="visible = false">取消</el-button>
								    <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
							   </div>
							   
						 </div>
						</el-popover>

						
	
					</div>
				</el-col>
			</el-row>
		</div>
		<div>
			<div class="albumBody">

				<div v-for="(item,index) in imgs"  class="albumItem">
					<div class="albumItemBody">
						<img :src="item.img" />
						<p><strong>{{nameAlbum[index]}}</strong></p>
					</div>
		
				</div>
				
					
				</div>
				


			
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      input1: "",
      // 测试
      nameAlbum: ["defualt相册", "风景宜人"],
      imgs: [{img: require("../assets/login_back.jpg")}, {img: require("../assets/background.jpg")}],
    };
  },
};
</script>

<style>
.album {
  width: 100%;
  height: 100%;
}
.crateDig {
  width: 250px;
}
.albumBody {
  padding: 20px 20px;
}
.albumItem {
  width: 178px;
  height: 216px;
  padding: 0 20px 20px 0;
  margin: 0;
  float: left;
  margin: 10px 20px;
  background-image: url(../assets/back1.png);
  background-size: 100% 100%;
}
.albumItemBody {
  margin: 30px 20px;
}
.albumItem img {
  width: 150px;
  height: 150px;
  border-radius: 50px;
}
.albumItem p {
  text-align: center;
}
</style>