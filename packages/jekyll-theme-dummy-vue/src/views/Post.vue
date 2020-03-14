<template>
  <div v-if="downloading">Downloading</div>
  <HtmlWrapper v-else :html="content || original" />
</template>

<script>
import HtmlWrapper from '../components/html/HtmlWrapper';

export default {
  name: 'Post',
  components: { HtmlWrapper },
  computed: {
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
  mounted() {
    this.$store
      .dispatch('post/downloading')
      .then(() =>
        this.$store.dispatch('post/download', {
          post: this.$store.state.route.props.post || {},
        })
      )
      .then(() => this.$store.dispatch('post/downloaded'));
  },
};
</script>
