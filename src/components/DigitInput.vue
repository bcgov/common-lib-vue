<template>
  <div
    :class="className"
  >
    <label
      :for="id"
    >
      {{ label }}<span
        v-if="isRequiredAsteriskShown"
        class="required-asterisk"
      >*</span>
    </label><br>
    <input
      :id="id"
      ref="input"
      type="text"
      name="number"
      class="form-control"
      :data-cy="getCypressValue()"
      :value="modelValue"
      :style="inputStyle"
      :maxlength="maxlength"
      @input="inputHandler($event)"
      @keypress="keypressHandler($event)"
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from '../mixins/blur-mixin';

export const digitValidator = (value) => {
  const number = parseFloat(value);
  const criteria = /^\d+$/;
  return !isNaN(number) && number % 1 === 0 && criteria.test(value);
};

export default {
  name: 'DigitInput',
  mixins: [
    blurMixin,
    cypressMixin,
  ],
  props: {
    id: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String,
      default: '1000',
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'input',
  ],
  mounted() {
    this.$refs.input.addEventListener('paste', this.pasteHandler);
  },
  beforeUnmount() {
    this.$refs.input.removeEventListener('paste', this.pasteHandler);
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value);
      this.$emit('update:modelValue', event.target.value)
      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    keypressHandler(event) {
      const keyCode = event.which ? event.which : event.keyCode;

      // If is a number.
      if ((keyCode >= 48 && keyCode <= 57)) {
        return true;
      } else {
        event.preventDefault();
      }
    },
    pasteHandler(event) {
      const clipboardData = (event.clipboardData || window.clipboardData);
      // IE doesn't support the clipboardData property, so we prevent the paste action and don't process the data.
      if (!clipboardData) {
        event.preventDefault();
        return;
      }

      const text = clipboardData.getData('text');
      if (digitValidator(text)) {
        return true;
      } else {
        event.preventDefault();
      }
    },
  },
}
</script>
