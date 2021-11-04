export default {
  data: () => {
    return {
      windowWidth: 0,
      respondToResize: null,
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    
    window.addEventListener('resize', this.getResizeFunction());
  },
  destroyed() {
    window.removeEventListener('resize', this.getResizeFunction());
  },
  methods: {
    getResizeFunction() {
      let resizeFunction = () => {
        // timeout reduces the frequency of resize events
        clearTimeout(this.respondToResize);
        this.respondToResize = setTimeout(() => {
          this.windowWidth = window.innerWidth;
        }, 100);
      }
      return resizeFunction
    },
    windowWidthLessThan(width) {
      return this.windowWidth < width;
    },
    windowWidthGreaterThan(width) {
      return this.windowWidth > width;
    },
  },
};