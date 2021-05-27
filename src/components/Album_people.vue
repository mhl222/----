<template>
  <el-container style="allBody">
		<el-header class="display_header">
			<el-row>
				<el-col :span="12" style="height: 50px;"><span class="display_tit">/人物聚类</span></el-col>
				<el-col :span="12" style="height: 50px;">
					
				</el-col>
			</el-row>
		</el-header>

		<el-main class="display_body">
		<div class="albumBody">

				<div v-for="(item,index) in imgs"  class="peopleItem">
					<div class="albumItemBody">
						<img :src="item.img" />
					</div>
				</div>
					
				</div>
		</el-main>
		
</el-container>
</template>

<script>
export default {
     data(){
       return { // 测试
      imgs:[{img: require("../assets/p2.jpg")}, {img: require("../assets/p3.jpg")}],}
     
     }
}
</script>

<style>
.peopleItem{  width: 178px;
  height: 216px;
  padding: 0 20px 20px 0;
  margin: 0;
  float: left;
  margin: 10px 20px;
}
.peopleItem img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>