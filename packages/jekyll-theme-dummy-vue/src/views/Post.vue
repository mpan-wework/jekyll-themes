<template>
  <HtmlWrapper :html="content || original" />
</template>

<script>
import HtmlWrapper from '../components/html/HtmlWrapper';

export default {
  name: 'Post',
  components: { HtmlWrapper },
  computed: {
    original() {
      return this.$slots.default[0].text;
    },
    content() {
      return this.$store.state.post.content;
    },
  },
  mounted() {
    this.$store.dispatch('post/download', {
      post: this.$store.state.route.props.post || {},
    });
  },
};
</script>
