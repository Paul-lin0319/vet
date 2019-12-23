<template>
  <div class="top-nav">
    <el-header :height="layerTopHeight">
      <div>logo</div>
      <div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </div>
    </el-header>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TopNav extends Vue {
  @Prop() private layerTopHeight!: string;
}
</script>

<style lang="scss" scoped>
.top-nav {
  background: $layout-bg-color;
  .el-header {
    display: flex;
    padding: 0 20px 0 0;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
