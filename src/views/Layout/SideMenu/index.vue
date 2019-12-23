<template>
  <div class="side-menu">
    <el-aside :width="layerAsideWidth">
      <el-menu
        :default-openeds="[]"
        :background-color="layoutBgColor"
        text-color="#fff"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>系统设置
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">
              <i class="el-icon-user"></i>用户管理
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SideMenu extends Vue {
  @Prop() private layerAsideWidth!: string;
  private layoutBgColor = '#3a424d';
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
