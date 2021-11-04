export default {
  data: () => {
    return {
      windowWidth: 0,
      respondToResize: null,
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    
    window.addEventListener('resize', this.callResizeFunction);
  },
  destroyed() {
    window.removeEventListener('resize', this.callResizeFunction);
  },
  methods: {
    callResizeFunction() {
      let resizeFunction = () => {
        // timeout reduces the frequency of resize events
        clearTimeout(this.respondToResize);
        this.respondToResize = setTimeout(() => {
          this.windowWidth = window.innerWidth;
        }, 100);
      }
      resizeFunction();
    },
    windowWidthLessThan(width) {
      return this.windowWidth < width;
    },
    windowWidthGreaterThan(width) {
      return this.windowWidth > width;
    },
  },
};