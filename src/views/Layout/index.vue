<template>
  <div class="layer-out">
    <!-- 顶部导航 -->
    <TopNav :layerTopHeight="layerTopHeight"></TopNav>
    <!-- <el-header :height="layerTopHeight"></el-header> -->
    <el-container>
      <!-- 左侧导航栏 -->
      <SideMenu :layerAsideWidth="layerAsideWidth"></SideMenu>
      <!-- 页面主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from './TopNav/index.vue';
import SideMenu from './SideMenu/index.vue';

@Component({
  components: {
    TopNav,
    SideMenu
  }
})
export default class LayOut extends Vue {
  private layerTopHeight = '60px';
  private layerAsideWidth = '200px';
}
</script>

<style lang="scss" scoped>
.layer-out {
  height: 100%;
  .el-container {
    height: calc(100% - 60px);
  }
}
</style>
