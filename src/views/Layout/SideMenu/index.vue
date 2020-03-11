<template>
  <div class="side-menu">
    <el-aside :width="layerAsideWidth">
      <el-menu
        :default-active="defaultActive"
        :background-color="layoutBgColor"
        :router="true"
        :unique-opened="true"
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
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import SubMenu from "./submenu.vue";

interface IsideMenuItem {
  title: string;
  path?: string;
  icon?: string;
  children?: IsideMenuItem[];
}
interface IVueOpen extends Vue {
  open: (param: string) => {};
}

@Component({
  components: {
    SubMenu
  }
})
export default class SideMenu extends Vue {
  @Prop() private layerAsideWidth!: string;
  private layoutBgColor: string = "#3a424d";
  private defaultActive: string = "";
  private sideMenuData: IsideMenuItem[] = [
    {
      title: "系统管理",
      icon: "el-icon-setting",
      path: "/system",
      children: [
        {
          title: "用户管理",
          path: "/system/userManager",
          icon: "el-icon-user"
        },
        {
          title: "应用管理",
          path: "/system/applicationManagement",
          icon: "el-icon-menu"
        },
        {
          title: "国家管理",
          path: "/system/countryManager",
          icon: "el-icon-menu"
        },
        {
          title: "货币管理",
          path: "/system/currenciesManager",
          icon: "el-icon-menu"
        },
        {
          title: "平台管理",
          path: "/system/platformManager",
          icon: "el-icon-menu"
        },
        { title: "测试", path: "/system/test", icon: "el-icon-user" }
      ]
    }
  ];

  @Getter
  private activeLayoutTab!: string;

  // watch
  @Watch("activeLayoutTab")
  private onActiveLayoutTabChanged(val: string, oldVal: string): void {
    this.defaultActive = val;
    if (val !== "/home" && val !== "/404") {
      let strList = val.split("/");
      strList.pop();
      (this.$refs["sideMenu"] as IVueOpen).open(strList.join("/"));
    }
  }

  // methods

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
