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
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
            :closable="false"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive :include="[]">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TopNav from './TopNav/index.vue';
import SideMenu from './SideMenu/index.vue';

interface IeditableTabsObj {
  name: string;
  title: string;
}

@Component({
  components: {
    TopNav,
    SideMenu
  }
})
export default class LayOut extends Vue {
  private layerTopHeight: string = '60px';
  private layerAsideWidth: string = '200px';
  private editableTabs: IeditableTabsObj[] = [
    {
      name: '111',
      title: 'tt'
    }
  ];
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
