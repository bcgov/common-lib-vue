<template>
  <div ref="modal">
    <div
      id="exampleModal"
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div
        class="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">
              {{ title }}
            </h2>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer justify-content-center d-block">
            <div class="row">
              <div class="col-6 text-right">
                <ButtonComponent
                  :label="yesButtonLabel"
                  :data-cy="getCypressValue('Left')"
                  @click="yesButtonHandler()"
                />
              </div>
              <div class="col-6">
                <ButtonComponent
                  :label="noButtonLabel"
                  :data-cy="getCypressValue('Right')"
                  @click="noButtonHandler()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";
import cypressMixin from "../mixins/cypress-mixin.js";

export default {
  name: "PromptModal",
  components: {
    ButtonComponent,
  },
  mixins: [cypressMixin],
  props: {
    title: {
      type: String,
      default: "",
    },
    yesButtonLabel: {
      type: String,
      default: "Yes",
    },
    noButtonLabel: {
      type: String,
      default: "No",
    },
  },
  emits: ["yes", "no"],
  data: () => {
    return {
      focusableEls: [],
      focusedEl: null,
    };
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
    document.body.classList.add("no-scroll");
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleKeyDown);
    document.body.classList.remove("no-scroll");
  },
  mounted() {
    this.focusableEls = this.getFocusableEls();
  },
  methods: {
    yesButtonHandler() {
      this.$emit("yes");
    },
    noButtonHandler() {
      this.$emit("no");
    },
    getFocusableEls() {
      // Create an array of focusable elements from the contents of the modal
      return Array.from(
        this.$refs.modal.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button, [tabindex="0"]'
        )
      );
    },
    handleKeyDown(event) {
      // Handle tabbing
      if (event.key === "Tab") {
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
  color: #fff;
}
</style>
