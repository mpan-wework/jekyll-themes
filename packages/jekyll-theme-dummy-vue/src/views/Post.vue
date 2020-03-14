<template>
  <div v-if="downloading">Downloading</div>
  <div v-else>
    <HtmlWrapper :html="content || original" />
    <VueDisqus
      v-if="disqus.shortname"
      :shortname="disqus.shortname"
      :identifier="disqus.identifier"
      :title="disqus.title"
      :url="disqus.url"
    />
  </div>
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
    disqus() {
      const shortname = this.$store.state.site.disqus;
      const identifier = this.$route.path.replace(/[^a-zA-Z0-9]/g, '');
      const url = `${this.$store.state.site.baseurl}#${this.$route.path}`;

      return {
        shortname,
        identifier,
        title: identifier,
        url,
      };
    },
  },
  async mounted() {
    await this.$store.dispatch('site/load');
    await this.$store.dispatch('post/downloading');
    await this.$store.dispatch('post/download', {
      post: this.$store.state.route.props.post || {},
    });
    await this.$store.dispatch('post/downloaded');
  },
};
</script>
