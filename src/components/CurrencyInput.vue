<template>
  <div
    :class="className"
  >
    <label
      v-if="label"
      :for="id"
    >
      <span
        v-html="label"
      />
      <span
        v-if="isRequiredAsteriskShown"
        class="required-asterisk"
      >*</span>
    </label>
    <br
      v-if="label"
    >
    <div>
      <slot
        name="description"
      />
    </div>
    <div
      class="input-group"
      :style="inputStyle"
    >
      <div
        class="input-group-prepend"
      >
        <span
          class="input-group-text"
        >$</span>
      </div>
      <input
        :id="id"
        ref="input"
        v-model="inputValue"
        class="form-control field"
        :maxlength="maxlength"
        :required="required"
        :aria-required="required"
        :data-cy="getCypressValue()"
        :readonly="readonly"
        :disabled="disabled"
        @input.stop="handleInput($event)"
        @keypress="handleKeyPress($event)"
        @focus="handleFocus($event)"
        @blur="handleBlur($event)"
      >
    </div>
  </div>
</template>

<script>
import cypressMixin from '../mixins/cypress-mixin.js';
import { convertNumberToFormattedString } from '../helpers/string';

const isValidInput = (value) => {
  const criteria = /^[-]?([0-9]+)?\.?[0-9]?[0-9]?$/;
  return !value || criteria.test(value);
};

const isValidDecimalCurrencyAmount = (value) => {
  const criteria = /^[-]?([0-9]+)\.?[0-9]?[0-9]?$/;
  return !value || criteria.test(value);
};

const isValidRoundCurrencyAmount = (value) => {
  const criteria = /^[-]?([0-9]+)$/;
  return !value || criteria.test(value);
};

export default {
  name: 'CurrencyInput',
  mixins: [
    cypressMixin,
  ],
  props: {
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      validator: (value) => {
        return isValidInput(value);
      },
    },
    id: {
      type: String,
      default: '',
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
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isEmptyCentsAppended: {
      type: Boolean,
      default: false,
    },
    isCentsEnabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'input',
    'blur',
  ],
  data: () => {
    return {
      isEditing: false,
      formattedValue: '',
      inputValue: '',
    }
  },
  watch: {
    modelValue(newValue) {
      if (this.isEditing) {
        this.inputValue = newValue || null;
      } else {
        this.formattedValue = newValue ? convertNumberToFormattedString(newValue) : null;
        this.inputValue = this.formattedValue;
      }
    },
  },
  created() {
    this.formattedValue = convertNumberToFormattedString(this.modelValue);
    this.inputValue = this.formattedValue;
  },
  mounted() {
    this.$refs.input.addEventListener('paste', this.handlePaste);
  },
  beforeUnmount() {
    this.$refs.input.removeEventListener('paste', this.handlePaste);
  },
  methods: {
    handleFocus() {
      this.isEditing = true;
      this.inputValue = this.modelValue;
    },
    handleBlur(event) {
      let value = this.modelValue;

      this.isEditing = false;
      value = this.removeLeadingZeros(value);

      if (this.isCentsEnabled && this.isEmptyCentsAppended) {
        value = this.appendEmptyCents(value);
      }

      this.$emit('input', value);
      this.formattedValue = convertNumberToFormattedString(value);
      this.inputValue = this.formattedValue;

      this.$emit('blur', event);
    },
    handleInput(event) {
      const value = event.target.value;
      if (isValidInput(value)) {
        this.inputValue = value;
        this.formattedValue = convertNumberToFormattedString(value);
        this.$emit('input', value);
        this.$emit('update:modelValue', value);
      } else {
        // Reset input value to previous value.
        this.inputValue = this.modelValue;
        this.formattedValue = convertNumberToFormattedString(this.modelValue);
      }

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleKeyPress(event) {
      const keyCode = event.which ? event.which : event.keyCode;

      if ((keyCode >= 48 && keyCode <= 57) // Number key.
        || (keyCode === 46 && this.isCentsEnabled && !this.containsDecimal(this.modelValue)) // Decimal key.
        || keyCode === 45) // Minus key
      {
        return true;
      } else {
        event.preventDefault();
      }
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      // IE doesn't support the clipboardData property, so we prevent the paste action and don't process the data.
      if (!clipboardData) {
        event.preventDefault();
        return;
      }

      const text = clipboardData.getData('text').trim();
      const value = this.removeCommas(text);

      if ((this.isCentsEnabled && isValidDecimalCurrencyAmount(value))
        || (!this.isCentsEnabled && isValidRoundCurrencyAmount(value))) {
        return true;
      } else {
        event.preventDefault();
      }
    },
    removeCommas(formattedValue) {
      return formattedValue.replace(/[,]/g, '');
    },
    containsDecimal(str) {
      const criteria = /[.]/;
      return criteria.test(str);
    },
    removeLeadingZeros(value) {
      if (!value || typeof value !== 'string') {
        return value;
      }
      const valueParts = value.split('.');
      let wholeNumber = parseInt(valueParts[0]);
      let wholeNumberStr = valueParts[0];
      let result = '';

      if (value.includes('-')) {
        wholeNumberStr = wholeNumberStr.replace('-', '');
        result += '-';
      }
      if (wholeNumberStr.length === 0) {
        result += '0';
      } else if (wholeNumberStr.length === 1) {
        result += wholeNumberStr;
      } else if (wholeNumberStr.length > 1) {
        if (!isNaN(wholeNumber)) {
          result += `${Math.abs(wholeNumber)}`;
        }
      }

      if (valueParts.length === 2) {
        result = `${result}.${valueParts[1]}`
      }
      return result;
    },
    appendEmptyCents(value) {
      if (!value || typeof value !== 'string') {
        return;
      }
      if (!this.containsDecimal(value)) {
        return `${value}.00`;
      } else {
        const valueParts = value.split('.');

        if (valueParts.length === 2) {
          if (valueParts[1].length === 0) {
            return `${value}00`;
          } else if (valueParts[1].length === 1) {
            return `${value}0`;
          }
        }
      }
      return value;
    },
  },
}
</script>
