<template>
  <el-submenu :index="subMenuData.path">
    <template slot="title">
      <i :class="subMenuData.icon"></i>{{ subMenuData.title }}
    </template>
    <el-menu-item-group>
      <template v-for="(item, index) in subMenuData.children">
        <div :key="index">
          <SubMenu
            v-if="item.children && item.children.length > 0"
            :subMenuData="item"
          ></SubMenu>
          <el-menu-item v-else :index="item.path">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </div>
      </template>
    </el-menu-item-group>
  </el-submenu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'SubMenu'
})
export default class SubMenu extends Vue {
  @Prop()
  private subMenuData!: object;
}
</script>

<style></style>
