<template>
  <div class="home">
    <ul>
      <li v-for="post of posts" :key="post.url">
        <a :href="postUrl(post)">{{ post.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    posts() {
      return this.$store.state.site.posts;
    },
  },
  async mounted() {
    this.$store.dispatch('site/load');
  },
  methods: {
    postUrl(post) {
      return `${this.$store.state.site.baseurl}${post.url}`;
    },
  },
};
</script>
