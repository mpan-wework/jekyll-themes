<template>
  <div v-if="downloading">Downloading</div>
  <div v-else>
    <HtmlWrapper :html="content || original" />
    <Comment />
  </div>
</template>

<script>
import HtmlWrapper from '../components/html/HtmlWrapper';
import Comment from '../components/post/Comment';

export default {
  name: 'Post',
  components: { HtmlWrapper, Comment },
  computed: {
    vuex() {
      return this.$store.state;
    },
    downloading() {
      return this.$store.state.post.downloading;
    },
    original() {
      return this.$slots.default[0].text;
    },
    content() {
      const content = this.$store.state.post.content;
      if (content) {
        const el = document.createElement('div');
        el.innerHTML = content;
        const outerHTML = el.getElementsByTagName('main')[0]?.outerHTML || '';
        el.remove();
        return outerHTML;
      }

      return '';
    },
  },
  async mounted() {
    await this.$store.dispatch('site/load');
    await this.$store.dispatch('post/downloading');
    await this.$store.dispatch('post/download', {
      post: this.$store.state.route.props.post || {
        url: this.$route.path,
      },
    });
    await this.$store.dispatch('post/downloaded');
  },
};
</script>
