<template>
  <div class="modal fade show"
    tabindex="-1"
    aria-labelledby="modal-title"
    aria-modal="true"
    role="dialog"
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
    }
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
