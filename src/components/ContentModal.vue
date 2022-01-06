<template>
  <div class="modal fade show"
    tabindex="-1"
    aria-labelledby="modal-title"
    aria-modal="true"
    role="dialog"
    ref="modal"
    @click="handleClickBackground()">
    <div class="modal-dialog"
      @click="stopPropagation($event)">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"
            id="modal-title">{{title}}</h5>
          <button v-if="isCloseButtonShown"
            type="button"
            class="close"
            aria-label="Close"
            @click="handleClose()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot>Content Here</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js"

export default {
  name: "ContentModal",
  mixins: [ cypressMixin ],
  props: {
    title: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    isCloseButtonShown: {
      type: Boolean,
      default: true,
    },
    closeOnBackgroundClick: {
      type: Boolean,
      default: true,
    }
  },
  data: () => {
    return {
      focusableEls: [],
      focusedEl: null,
      contentObserver: null,
    };
  },
  created() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.classList.add('no-scroll');
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.classList.remove('no-scroll');
  },
  mounted() {
    this.focusableEls = this.getFocusableEls();

    const observerConfig = {
      attributes: true,
      childList: true,
      subtree: true
    };
    this.contentObserver = new MutationObserver(this.handleContentChange);
    this.contentObserver.observe(this.$refs.modal, observerConfig);
  },
  beforeUnmount() {
    this.contentObserver.disconnect();
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleClickBackground() {
      if (this.closeOnBackgroundClick) {
        this.handleClose();
      }
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    getFocusableEls() {
      // Create an array of focusable elements from the contents of the modal
      return Array.from(this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button, [tabindex="0"]'));
    },
    handleContentChange() {
      this.focusableEls = this.getFocusableEls();
    },
    handleKeyDown(event) {
      // Handle tabbing
      if (event.key === 'Tab') {
        // Prevent usual tabbing, manually set focus
        event.preventDefault();
        if (event.shiftKey) {
          this.handleTabBackwards();
        } else {
          this.handleTab();
        }
      }
    },
    // Move to next focusable element, if at last element, move to first
    handleTab() {
      if (!this.focusedEl && this.focusableEls.length > 0) {
        this.focusedEl = this.focusableEls[0];
        this.focusedEl.focus();
        return;
      }
      const position = this.focusableEls.indexOf(this.focusedEl);
      if (position === this.focusableEls.length - 1) {
        this.focusedEl = this.focusableEls[0];
      } else {
        this.focusedEl = this.focusableEls[position + 1];
      }
      this.focusedEl.focus();
    },
    // Move to next focusable element, if at last element, move to first
    handleTabBackwards() {
      if (!this.focusedEl && this.focusableEls.length > 0) {
        this.focusedEl = this.focusableEls[this.focusableEls.length - 1];
        this.focusedEl.focus();
        return;
      }
      const position = this.focusableEls.indexOf(this.focusedEl);
      if (position === 0) {
        this.focusedEl = this.focusableEls[this.focusableEls.length - 1];
      } else {
        this.focusedEl = this.focusableEls[position - 1];
      }
      this.focusedEl.focus();
    },
  },
}
</script>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: scroll;
}
</style>
