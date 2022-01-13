<template>
  <div :class="className">
    <label v-if="label"
      :for="id">
      <span v-html="label"></span>
      <span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label>
    <br v-if="label"/>
    <div>
      <slot name="description"></slot>
    </div>
    <div class="input-group" :style='inputStyle'>
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input :id="id"
        class='form-control'
        v-model="inputValue"
        :maxlength='maxlength'
        :data-cy="getCypressValue()"
        :readonly='readonly'
        :disabled='disabled'
        ref='input'
        @input="handleInput($event)"
        @keypress="handleKeyPress($event)"
        @focus="handleFocus($event)"
        @blur="handleBlur($event)" />
    </div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import { convertNumberToFormattedString } from '../helpers/string';

const isValidCurrencyAmount = (value) => {
  const criteria = /^[-]?([0-9]+)?\.?[0-9]?[0-9]?$/;
  return !value || criteria.test(value);
};

export default {
  name: 'CurrencyInput',
  mixins: [
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
    isEmptyCentsAppended: {
      type: Boolean,
      default: true
    },
  },
  data: () => {
    return {
      isEditing: false,
      formattedValue: '',
      inputValue: '',
    }
  },
  created() {
    this.formattedValue = convertNumberToFormattedString(this.value);
    this.inputValue = this.formattedValue;
  },
  mounted() {
    this.$refs.input.addEventListener('paste', this.handlePaste);
  },
  beforeUnmount() {
    this.$refs.input.removeEventListener('paste', this.handlePaste);
  },
  watch: {
    value(newValue) {
      if (this.isEditing) {
        this.inputValue = newValue || null;
      } else {
        this.formattedValue = newValue ? convertNumberToFormattedString(newValue) : null;
        this.inputValue = this.formattedValue;
      }
    }
  },
  methods: {
    handleFocus() {
      this.isEditing = true;
      this.inputValue = this.value;
    },
    handleBlur(event) {
      this.isEditing = false;
      if (this.isEmptyCentsAppended) {
        const value = this.appendEmptyCents(this.value);
        this.$emit('input', value);
        this.formattedValue = convertNumberToFormattedString(value);
      }
      this.inputValue = this.formattedValue;
      this.$emit('blur', event);
    },
    handleInput(event) {
      const value = event.target.value;
      
      if (isValidCurrencyAmount(value)
        // Prevent leading "00".
        && !(value.length > 1 && value[0] === '0' && !isNaN(parseInt(value[1])))) {
        this.inputValue = value;
        this.formattedValue = convertNumberToFormattedString(value);
        this.$emit('input', value);
      } else {
        // Reset input value to previous value.
        this.inputValue = this.value;
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
        || (keyCode === 46 && !this.containsDecimal(this.value)) // Decimal key.
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
    containsDecimal(str) {
      const criteria = /[.]/;
      return criteria.test(str);
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
    }
  },
}
</script>
