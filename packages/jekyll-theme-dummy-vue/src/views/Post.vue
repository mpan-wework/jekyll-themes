<template>
  <HtmlWrapper :html="$slots.default[0].text" />
</template>

<script>
import HtmlWrapper from '../components/html/HtmlWrapper';

export default {
  name: 'Post',
  components: { HtmlWrapper },
};
</script>
