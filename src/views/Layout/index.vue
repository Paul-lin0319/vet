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
          v-model="activeTabStr"
          type="card"
          @tab-remove="removeTab"
          @tab-click="activeTabChange"
        >
          <el-tab-pane
            v-for="(item, index) in includeList"
            :key="index"
            :label="item.title"
            :name="`${index}&&${item.name}`"
            :closable="item.closable"
          >
          </el-tab-pane>
        </el-tabs>
        <keep-alive :include="keepAliveList">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import { IincludeList, IincludeItem } from '@/store/layerMainNav/state';
import TopNav from './TopNav/index.vue';
import SideMenu from './SideMenu/index.vue';
import router from '../../router';

interface IeditableTabsObj {
  name: string;
  title: string;
  closable: boolean;
}
interface paramVue {
  name: string;
}

@Component({
  components: {
    TopNav,
    SideMenu
  }
})
export default class LayOut extends Vue {
  // data
  private layerTopHeight: string = '60px';
  private layerAsideWidth: string = '200px';
  private editableTabsValue: string = '111';
  private activeTab: string = '';

  // store
  @Getter
  private activeLayoutTab!: string;
  @Getter
  private includeList!: IincludeItem[];
  @Getter
  private keepAliveList!: string[];
  @Action
  private initIncludeList!: () => void;
  @Action
  private changeActiveLayoutTab!: (name: string) => void;
  @Action
  private delIncludeList!: (name: string) => void;

  // 计算属性
  get activeTabStr(): string {
    return (
      this.includeList.findIndex(item => this.activeLayoutTab === item.name) +
      '&&' +
      this.activeLayoutTab
    );
  }
  // 设置计算属性
  set activeTabStr(param: string) {
    this.activeTab = param;
  }

  // method
  private activateTabChange(val: string) {
    this.activeTab =
      this.includeList.findIndex(item => val === item.name) + '&&' + val;
  }
  private removeTab(name: string): void {
    const tabName: string = name.split('&&')[1];
    this.delIncludeList(tabName);
    if (tabName === this.$route.path) {
      this.$router.push(this.includeList.slice(-1)[0].name);
    }
  }
  private activeTabChange(tab: paramVue) {
    const tabName: string = tab.name.split('&&')[1];
    if (tabName !== this.$route.path) {
      this.$router.push(tabName);
    }
  }

  // mounted()
  private mounted() {
    this.initIncludeList();
    this.activeTab =
      this.includeList.findIndex(item => this.activeLayoutTab === item.name) +
      '&&' +
      this.activeLayoutTab;
  }
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
