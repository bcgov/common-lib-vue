<template>
  <div :class="className">
    <label :for="id">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label>
    <br/>
    <div class="input-group" :style='inputStyle'>
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input :id="id"
        class='form-control'
        v-model="formattedValue"
        :maxlength='maxlength'
        :data-cy="getCypressValue()"
        :readonly='readonly'
        :disabled='disabled'
        ref='input'
        @input="handleInput($event)"
        @keypress="handleKeyPress($event)"
        @blur="handleBlur($event)" />
    </div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from '../mixins/blur-mixin';
import { convertNumberToFormattedString } from '../helpers/string';

const isValidCurrencyAmount = (value) => {
  const criteria = /^[-]?([0-9]+)?\.?[0-9]?[0-9]?$/;
  return !value || criteria.test(value);
};

export default {
  name: 'CurrencyInput',
  mixins: [
    blurMixin,
    cypressMixin,
  ],
  props: {
    value: {
      type: String,
      validator: (value) => {
        return isValidCurrencyAmount(value);
      }
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: '1000'
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: () => {
    return {
      formattedValue: '',
    }
  },
  created() {
    this.formattedValue = convertNumberToFormattedString(this.value);
  },
  mounted() {
    this.$refs.input.addEventListener('paste', this.handlePaste);
  },
  beforeUnmount() {
    this.$refs.input.removeEventListener('paste', this.handlePaste);
  },
  watch: {
    value(newValue) {
      this.formattedValue = newValue ? convertNumberToFormattedString(newValue) : null;
    }
  },
  methods: {
    handleInput(event) {
      const inputValue = event.target.value;
      const value = this.removeCommas(inputValue).trim();
      
      if (isValidCurrencyAmount(value)) {
        this.formattedValue = convertNumberToFormattedString(value);
        this.$emit('input', value);
      } else {
        // Reset input value to previous value.
        this.formattedValue = convertNumberToFormattedString(this.value);
      }

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleKeyPress(event) {
      const keyCode = event.which ? event.which : event.keyCode;

      if ((keyCode >= 48 && keyCode <= 57) // Number key.
        || (keyCode === 46 && !this.doesContainDecimal(this.value)) // Decimal key.
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

      if (isValidCurrencyAmount(value)) {
        return true;
      } else {
        event.preventDefault();
      }
    },
    removeCommas(formattedValue) {
      return formattedValue.replace(/[,]/g, '');
    },
    doesContainDecimal(str) {
      const criteria = /[.]/;
      return criteria.test(str);
    },
  },
}
</script>
