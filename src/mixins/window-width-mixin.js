export default {
  data: () => {
    return {
      winWidth: 0,
    }
  },
  mounted() {
    this.winWidth = window.innerWidth;
    
    // timeout reduces the frequency of resize events
    let respondToResize;
    window.onresize = () => {
      clearTimeout(respondToResize);
      respondToResize = setTimeout(() => {
        this.winWidth = window.innerWidth;
      }, 100);
    };
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    windowWidthLessThan(width) {
      return this.winWidth < width;
    },
    windowWidthGreaterThan(width) {
      return this.winWidth > width;
    },
  },
};