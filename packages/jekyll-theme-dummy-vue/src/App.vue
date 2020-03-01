<template>
  <div class="App">
    <div class="navSide">
      <NavSide />
    </div>
    <div class="container">
      <div class="navTop">
        <NavTop />
      </div>
      <div class="content">
        <router-view>
          <slot />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavSide from './components/navigation/NavSide';
import NavTop from './components/navigation/NavTop';

export default {
  name: 'App',
  components: {
    NavSide,
    NavTop,
  },
};
</script>

<style lang="less" scoped>
.App {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 0.5rem;
}

.navSide {
  flex: 0 0 12.5rem;
}

.container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
}

.navTop {
  flex: 0 0 3.125rem;
}

.content {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: scroll;
  margin-top: 0.5rem;
}
</style>
