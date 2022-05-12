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
      v-maska="{ mask: '#### ### ###' }"
      type="text"
      name="phn"
      class="form-control"
      :data-cy="getCypressValue()"
      :value="modelValue"
      :placeholder="placeholder"
      :style="inputStyle"
      @input.stop="inputHandler($event)"
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import { maska } from 'maska';
import cypressMixin from '../mixins/cypress-mixin.js';
import blurMixin from '../mixins/blur-mixin';

export const phnValidator = (value) => {
  if (!value) {
    return false;
  }
  // Init weights and other stuff
  const weights = [
    -1,
    2,
    4,
    8,
    5,
    10,
    9,
    7,
    3,
    -1,
  ];
  let sumOfRemainders = 0;
  let phn;
  // Clean up string
  value = value.trim();
  phn = value
    .replace(/^0+/, '') // remove leading zeros
    .replace(/_/g, '') // remove underlines
    .replace(/\s/g, ''); // spaces

  // Test for length
  if (phn.length !== 10) {
    return false;
  }

  // Walk through each character
  for (let i = 0; i < phn.length; i++) {

    // pull out char
    const char = phn.charAt(i);

    // parse the number
    const num = Number(char);

    if (Number.isNaN(num)) {
      return false;
    }

    // Only use the multiplier if weight is greater than zero
    let result = 0;
    if (weights[i] > 0) {
      // multiply the value against the weight
      result = num * weights[i];

      // divide by 11 and save the remainder
      result = result % 11;

      // add it to our sum
      sumOfRemainders += result;
    }
  }

  // mod by 11
  const checkDigit = 11 - (sumOfRemainders % 11);

  // if the result is 10 or 11, it is an invalid PHN
  if (checkDigit === 10 || checkDigit === 11) {
    return false;
  }

  // Compare against 10th digitfinalDigit
  const finalDigit = Number(phn.substring(9, 10));
  if (checkDigit !== finalDigit) {
    return false;
  }
  return true;
};

export default {
  name: 'PhnInput',
  directives: { maska, },
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
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: [
    'input',
    'update:modelValue',
  ],
  methods: {
    inputHandler(event) {
      const value = event?.target?.value;
      this.$emit('input', value);
      this.$emit('update:modelValue', value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
}
</script>
