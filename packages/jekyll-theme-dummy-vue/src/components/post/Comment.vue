<template>
  <div class="Comment">
    <div class="mode">
      <span v-for="value of ['none', 'disqus']" :key="value">
        <input
          type="radio"
          :value="value"
          :checked="value === mode"
          @change="onModeChange(value)"
        />
        <label>{{ value }}</label>
      </span>
    </div>
    <VueDisqus
      v-if="disqus.shortname"
      :shortname="disqus.shortname"
      :identifier="disqus.identifier"
      :title="disqus.title"
      :url="disqus.url"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Comment',
  data() {
    return {
      mode: 'none',
    };
  },
  computed: {
    disqus() {
      if (this.mode !== 'disqus') {
        return {};
      }

      const shortname = this.$store.state.site.disqus;
      const identifier = this.$route.path.replace(/[^a-zA-Z0-9]/g, '');
      const url = `${this.$store.state.site.baseurl}${this.$route.path}`;

      return {
        shortname,
        identifier: `id${identifier}`,
        title: `title${identifier}`,
        url,
      };
    },
  },
  methods: {
    onModeChange(value) {
      this.mode = value;
    },
  },
});
</script>

<style lang="scss" scoped>
.mode {
  display: flex;
  > span {
    margin-right: 0.5rem;
    > input {
      margin-right: 0.5rem;
    }
  }
}
</style>
