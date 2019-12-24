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
          v-model="activeTab"
          type="card"
          @tab-remove="removeTab"
          @tab-click="activeTabChange"
        >
          <el-tab-pane
            v-for="(item, index) in includeList"
            :key="index"
            :label="item.title"
            :name="item.name"
            :closable="item.closable"
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
  @Action
  private initIncludeList!: () => void;
  @Action
  private changeActiveLayoutTab!: (name: string) => void;
  @Action
  private delIncludeList!: (name: string) => void;

  // watch
  @Watch('activeLayoutTab')
  private onChildChanged(val: string, oldVal: string): void {
    this.activeTab = val;
  }

  // method
  private removeTab(name: string): void {
    this.delIncludeList(name);
    if (name === this.$route.path) {
      this.$router.push(this.includeList.slice(-1)[0].name);
    }
  }
  private activeTabChange(tab: paramVue) {
    if (tab.name !== this.$route.path) {
      this.$router.push(tab.name);
    }
  }

  // mounted()
  private mounted() {
    this.initIncludeList();
    this.activeTab = this.activeLayoutTab;
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
