<template>
  <div ref="modal">
    <div class="modal fade show"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{title}}</h2>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer justify-content-center d-block">
            <div class="row">
              <div class="col-6 text-right">
                <Button :label="yesButtonLabel"
                        :data-cy="cyValue('Left')"
                        @click="yesButtonHandler()"/>
              </div>
              <div class="col-6">
                <Button :label="noButtonLabel"
                        :data-cy="cyValue('Right')"
                        @click="noButtonHandler()"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import { cypressMixin } from "../mixins/cypress-mixin.js"

export default {
  name: "PromptModal",
  components: {
    Button,
  },
  mixins: [ cypressMixin ],
  props: {
    title: {
      type: String,
      default: '',
    },
    yesButtonLabel: {
      type: String,
      default: 'Yes'
    },
    noButtonLabel: {
      type: String,
      default: 'No'
    },
    cypressId: {
      type: String,
      default: ''
    },
  },
  data: () => {
    return {
      focusableEls: [],
      focusedEl: null,
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
  },
  methods: {
    yesButtonHandler() {
      this.$emit('yes');
    },
    noButtonHandler() {
      this.$emit('no');
    },
    getFocusableEls() {
      // Create an array of focusable elements from the contents of the modal
      return Array.from(this.$refs.modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button, [tabindex="0"]'));
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
  }
};
</script>

<style scoped>
.modal.show {
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: scroll;
}
.modal-header {
  background: #036;
  color: #FFF;
}
</style>
