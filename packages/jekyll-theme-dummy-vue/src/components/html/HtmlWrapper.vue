<template>
  <div class="HtmlWrapper" v-html="html" />
</template>

<script>
export default {
  name: 'HtmlWrapper',
  props: {
    html: String,
  },
};
</script>

<style lang="less" scoped>
.HtmlWrapper {
  width: 100%;
  height: 100%;
}
</style>
