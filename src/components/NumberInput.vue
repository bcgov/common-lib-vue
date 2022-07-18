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
      class="form-control field"
      :data-cy="getCypressValue()"
      :value="modelValue"
      :style="inputStyle"
      :maxlength="maxlength"
      :required="required"
      :aria-required="required"
      @input.stop="inputHandler($event)"
      @keypress="keypressHandler($event)"
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import cypressMixin from '../mixins/cypress-mixin.js';
import blurMixin from '../mixins/blur-mixin';

export const intValidator = (value) => {
  const number = parseFloat(value);
  const criteria = /^[+-]?\d+$/;
  return !isNaN(number) && (number % 1) === 0 && criteria.test(value);
};

export const floatValidator = (value) => {
  const number = parseFloat(value);
  const criteria = /^[+-]?\d+(\.\d+)$/;
  return !isNaN(number) && criteria.test(value);
};

export const positiveNumberValidator = (value) => {
  const number = parseFloat(value);
  return !isNaN(number) && number >= 0;
};

export const negativeNumberValidator = (value) => {
  const number = parseFloat(value);
  return !isNaN(number) && number <= 0;
};

export const nonZeroNumberValidator = (value) => {
  const number = parseFloat(value);
  return !isNaN(number) && number !== 0;
};

export const dollarNumberValidator = (value) => {
  const number = parseFloat(value);
  const criteria = /^[-]?\d+(\.\d{2})$/;
  return !isNaN(number) && criteria.test(value);
};

export default {
  name: 'NumberInput',
  mixins: [
    blurMixin,
    cypressMixin,
  ],
  props: {
    required: {
      type: Boolean,
      default: false
    },
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
      this.$emit('update:modelValue', event.target.value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    keypressHandler(event) {
      const keyCode = event.which ? event.which : event.keyCode;

      if ((keyCode >= 48 && keyCode <= 57) // Is a number.
        || keyCode === 45 // Is '-' char.
        || keyCode === 46 // Is '.' char.
      ) {
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
      if (intValidator(text) || floatValidator(text)) {
        return true;
      } else {
        event.preventDefault();
      }
    },
  },
}
</script>
