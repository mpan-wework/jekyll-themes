<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="HtmlWrapper" v-html="html" />
</template>

<script>
export default {
  name: 'HtmlWrapper',
  props: {
    html: {
      type: String,
      default: () => '',
    },
  },
};
</script>

<style lang="less" scoped>
.HtmlWrapper {
  width: 100%;
  height: 100%;
}
</style>
