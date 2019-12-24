<template>
  <div class="side-menu">
    <el-aside :width="layerAsideWidth">
      <el-menu
        :default-active="defaultActive"
        :background-color="layoutBgColor"
        :router="true"
        :unique-opened="true"
        @select="aa"
        text-color="#fff"
        ref="sideMenu"
      >
        <SubMenu
          v-for="(item, index) in sideMenuData"
          :key="index"
          :subMenuData="item"
        ></SubMenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import SubMenu from './submenu.vue';

interface IsideMenuItem {
  title: string;
  path?: string;
  icon?: string;
  children?: IsideMenuItem[];
}

@Component({
  components: {
    SubMenu
  }
})
export default class SideMenu extends Vue {
  @Prop() private layerAsideWidth!: string;
  private layoutBgColor: string = '#3a424d';
  private defaultActive: string = '';
  private sideMenuData: IsideMenuItem[] = [
    {
      title: '系统管理',
      icon: 'el-icon-setting',
      path: '/system',
      children: [
        {
          title: '用户管理',
          path: '/system/userManager',
          icon: 'el-icon-user'
        },
        { title: '测试', path: '/system/test', icon: 'el-icon-user' }
      ]
    }
  ];

  @Getter
  private activeLayoutTab!: string;

  // watch
  @Watch('activeLayoutTab')
  private onChildChanged(val: string, oldVal: string): void {
    this.defaultActive = val;
    if (val !== '/home') {
      let strList = val.split('/');
      strList.pop();
      this.$refs['sideMenu'].open(strList.join('/'));
    }
  }

  // methods
  private aa() {
    console.log(arguments);
  }

  // mounted
  private mounted() {
    this.defaultActive = this.activeLayoutTab;
  }
}
</script>

<style lang="scss" scoped>
.side-menu {
  height: 100%;
  background: $layout-bg-color;
  .el-menu {
    border-right: none;
  }
}
</style>
