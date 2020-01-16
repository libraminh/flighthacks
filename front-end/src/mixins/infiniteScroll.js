export default {
  data() {
    return {
      count: 3,
      loading: false,
      numberInitShow: 3,
      numberLoadItems: 3,
    }
  },
  computed: {
    noMore() {
      return this.count >= this.list.length;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    offset() {
      return this.list.length - this.count >= this.numberLoadItems ? this.numberLoadItems : this.list.length - this.count;
    },
  },
  mounted () {
    // this.$refs.renderList.style.height = `${this.$refs.renderList.offsetHeight}px`;
    // console.log(this.$refs.renderList.style);
    this.count = this.numberInitShow;

    window.addEventListener('scroll', this.$utils.throttle(() => {
      const scroll = window.scrollY || window.pageYOffset;
      const triggerPoint = this.$refs.renderList.getBoundingClientRect().top + scroll + Math.abs(this.$refs.renderList.clientHeight - window.innerHeight / 1.125)

      if (triggerPoint < scroll && !this.disabled) this.load();
    }))
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += this.offset;
        this.loading = false
      }, 2000)
    }
  },
}