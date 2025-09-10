export default {
  data: () => {
    return {
      windowWidth: 0,
      resizeTimeout: null,
    };
  },
  mounted() {
    this.windowWidth = window.innerWidth;

    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      // timeout reduces the frequency of resize events
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.windowWidth = window.innerWidth;
      }, 100);
    },
  },
};
