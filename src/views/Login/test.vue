<template>
  <p>这是子组件</p>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ComponentSub extends Vue {}
</script>
