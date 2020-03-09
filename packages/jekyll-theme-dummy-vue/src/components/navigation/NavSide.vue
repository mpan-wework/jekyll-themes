<template>
  <div class="NavSide">
    <router-link :to="{ path: '/' }">
      Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavSide',
};
</script>

<style lang="less" scoped>
@import '../../sass/styles.less';
.NavSide {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: @primaryBgColor;
  color: @primaryColor;
  border-radius: 0.25rem;

  > a {
    color: @primaryColor;
    text-decoration: none;
  }
}
</style>
