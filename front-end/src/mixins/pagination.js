export default {
  data() {
    return {
      currentPage: 1,
      pageSize: this.perPage || 6,
    }
  },
  watch: {
    currentPage(val) {
      // this.loading = true;
      // let url = new URL(window.location.href);
      // let url_str = url.searchParams.get('gallery') ? `?gallery=${url.searchParams.get('gallery')}&page=${val}` : `?page=${val}`;

      // History.pushState({page: val}, '', url_str);
      this.$scrollTo(this.$refs.wrapper, {offset: -170});

      // this.loading = false;

      // this.toggleAnimate();
    }
  },
}