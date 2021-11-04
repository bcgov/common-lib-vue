export default {
  data: () => {
    return {
      windowWidth: 0,
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    
    // timeout reduces the frequency of resize events
    let respondToResize;
    window.onresize = () => {
      clearTimeout(respondToResize);
      respondToResize = setTimeout(() => {
        this.windowWidth = window.innerWidth;
      }, 100);
    };
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    windowWidthLessThan(width) {
      return this.windowWidth < width;
    },
    windowWidthGreaterThan(width) {
      return this.windowWidth > width;
    },
  },
};