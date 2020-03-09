<template>
  <div class="home">
    <ul>
      <li v-for="post of posts" :key="post.url">
        <a @click="readPost(post)">{{ post.title }}</a>
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
    readPost(post) {
      this.$store.dispatch('route/replace', { post }).then(() => {
        this.$router.push(post.url);
      });
    },
  },
};
</script>
