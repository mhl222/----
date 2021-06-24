<template>
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
</template>

<script>
export default {
  data(){
    return {
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
  }
}
</script>

<style>

</style>