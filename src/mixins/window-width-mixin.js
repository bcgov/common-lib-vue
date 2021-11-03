export default {
  data: {
    winWidth: 0
  },
  mounted() {
    this.winWidth = window.innerWidth;
    
    // timeout reduces the frequency of resize events
    let respondToResize;
    window.onresize = () => {
      clearTimeout(respondToResize);
      respondToResize = setTimeout(this.resizedw, 100);
    };
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    resizedw() {
      this.winWidth = window.innerWidth;
      console.log(this.winWidth)
    },
    windowWidthLessThan(width) {
      return this.winWidth < width;
    },
    windowWidthGreaterThan(width) {
      return this.winWidth > width;
    },
  },
};