<template>
  <el-container class="_container">
    <el-header class="_header"><homeheader/></el-header>
     <el-container class="_body">
        <el-aside class="_aside"><homeaside/></el-aside>
        <router-view></router-view>
     </el-container>
  </el-container>
</template>

<script>

import homeheader from '../components/index/Home_header'
import homeaside from '../components/index/Home_aside'
export default {
  components: {
    homeheader,
    homeaside,
  },
 
  methods:{
	  
  }
  ,created() {
  	if(!this.$store.state.loginObj)
  	    this.$router.push('/login')
  }
};
</script>
<style>
._container {
  height: 100%;
}
._body{
  height: 100%;
}._header{
  box-shadow: 0 3px 15px 0 rgb(0 0 0 / 6%);
  height: 330px;
  background: #fff;
  z-index: 1;
 border-bottom: 1px solid #00FFFF;
}
._aside{
  box-shadow: 3px 0 15px 0 rgb(0 0 0 / 6%);
  background: #fff;
  height: 100%;
  width: 210px !important;

}
</style>