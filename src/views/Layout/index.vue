<template>
  <div class="layer-out">
    <!-- 顶部导航 -->
    <!-- 左侧导航栏 -->
    <!-- 页面主体 -->
    <router-view ></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class layOut extends Vue {}
</script>

<style lang="scss" scoped>
</style>