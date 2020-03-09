<template>
  <div class="NavTop">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'NavTop',
  computed: {
    title() {
      const location = this.$route;
      if (location.path === '/') {
        return '';
      } else if (location.path.startsWith('/posts/')) {
        const post = this.$store.state.post.post;
        return (post || {}).title || '';
      }
      return '';
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../sass/styles.less';
.NavTop {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: @primaryBgColor;
  color: @primaryColor;
  border-radius: 0.25rem;
}
</style>
