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
import renderCanvasFavIcon from '../util/renderCanvasFavIcon';

export default {
  name: 'Home',
  computed: {
    posts() {
      return this.$store.state.site.posts;
    },
  },
  async mounted() {
    this.$store.dispatch('site/load');
    this.$store.dispatch('post/downloading');
    renderCanvasFavIcon({ width: 16, height: 16, draw: this.draw });
  },
  methods: {
    readPost(post) {
      this.$store.dispatch('route/replace', { post }).then(() => {
        this.$router.push(post.url);
      });
    },
    draw(ctx) {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(0, 0, 16, 16);
    },
  },
};
</script>
