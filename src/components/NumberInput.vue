<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <input
      :id="id"
      type="text"
      name="number"
      class="form-control"
      :value="value"
      @input="inputHandler($event)"
      @keypress="keypressHandler($event)"
      :style="inputStyle"
      ref="input" />
  </div>
</template>

<script>
export const intValidator = (value) => {
  const number = parseFloat(value);
  const criteria = /^[+-]?\d+$/;
  return !isNaN(number) && (number % 1) === 0 && criteria.test(value);
};

export const floatValidator = (value) => {
  const number = parseFloat(value);
  const criteria = /^[+-]?\d+(\.\d+)?$/;
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

export default {
  name: 'NumberInput',
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
    },
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.$refs.input.addEventListener('paste', this.pasteHandler);
  },
  beforeUnmount() {
    this.$refs.input.removeEventListener('paste', this.pasteHandler);
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value);
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
    }
  },
}
</script>