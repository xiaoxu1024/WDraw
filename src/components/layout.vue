<template>
  <div class="layout">
    <div class="title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WLayout',
  props: {
    title: String,
  }
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title {
    font-size: 15px;
    font-weight: bolder;
  }
}
</style>