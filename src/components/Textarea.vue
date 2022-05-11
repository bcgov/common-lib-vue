<template>
  <div :class="className">
    <label :for="id">
      {{ label
      }}<span v-if="isRequiredAsteriskShown" class="required-asterisk"
        >*</span
      > </label
    ><br />
    <textarea
      :id="id"
      class="form-control"
      :data-cy="getCypressValue()"
      :value="modelValue"
      :style="inputStyle"
      :maxlength="maxlength"
      ref="input"
      @input.stop="inputHandler($event)"
      @blur="handleBlur($event)"
    />
    <div v-if="isRemainingCharsShown" :class="remainingCharsClasses">
      {{ remainingCharsText }}
    </div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from "../mixins/blur-mixin";

export default {
  name: "TextareaComponent",
  components: {},
  mixins: [blurMixin, cypressMixin],
  props: {
    modelValue: {
      type: String,
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    maxlength: {
      type: String,
      default: null,
    },
    remainingCharsMaxlength: {
      type: Number,
      default: 0,
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isRemainingCharsShown: {
      type: Boolean,
      default: false,
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$emit("input", event.target.value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
  computed: {
    remainingCharsClasses() {
      const isError =
        this.modelValue &&
        this.remainingCharsMaxlength &&
        this.modelValue.length > this.remainingCharsMaxlength;
      return `remaining-chars ${isError ? "error text-danger" : ""}`;
    },
    remainingCharsText() {
      const remainingChars =
        this.modelValue && this.remainingCharsMaxlength
          ? this.remainingCharsMaxlength - this.modelValue.length
          : this.remainingCharsMaxlength;
      return `Characters remaining: ${remainingChars}`;
    },
  },
  emits: ["update:modelValue", "input"],
};
</script>

<style scoped>
.remaining-chars {
  text-align: right;
  font-size: 13.33px;
}
.remaining-chars.error {
  color: #d8292f;
}
</style>