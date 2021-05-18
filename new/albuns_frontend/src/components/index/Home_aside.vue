<template>

    <el-menu
      :default-openeds="[ '1', '2']"
      :default-active="$route.path"
      class="_menu"
      router
    >
      <el-submenu index="1">
        <template #title>
          <i class="el-icon-picture"></i>
          <span>照片</span>
        </template>
        <el-menu-item index="/index/allphoto">全部照片</el-menu-item>
      </el-submenu>
      <el-submenu index="2" class="_el-submenu">
        <template #title
          ><i class="el-icon-s-management"></i><span>相册</span></template
        >
        <el-menu-item index="/index/album"
          ><i class="el-icon-s-finance"></i>相册</el-menu-item
        >
        <el-menu-item index="/index/people"
          ><i class="el-icon-s-custom"></i>人物</el-menu-item
        >
        <el-menu-item index="/index/location"
          ><i class="el-icon-guide"></i>地点</el-menu-item
        >
      </el-submenu>

      <el-menu-item index="/index/recyclebin">
        <template #title>
          <i class="el-icon-delete" style="font-size: 25px; color: black"></i
          ><span style="font-size: 20px; font-weight: bold"
            >回收站</span
          ></template
        >
      </el-menu-item>
    </el-menu>
  
</template>

<script>
export default {};
</script>

<style>

._menu {
  border-right: 0 !important;
  margin-top: 60px;
}
._el-submenu {
  border-bottom: 3px solid silver;
}
</style>