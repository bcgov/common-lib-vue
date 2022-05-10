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
      v-maska="{ mask: 'SX######'}"
      type="text"
      name="motorVehicleAccidentClaimNumberInput"
      class="form-control"
      :value="modelValue"
      :data-cy="getCypressValue()"
      :style="inputStyle"
      @input.stop="inputHandler($event)"
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import { maska } from 'maska';
import { replaceAt } from '../helpers/string';
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from '../mixins/blur-mixin';

const alphanumericMap = {
  A: '1',
  B: '2',
  C: '3',
  D: '4',
  E: '5',
  F: '6',
  G: '7',
  H: '8',
  I: '9',
  J: '0',
  K: '1',
  L: '2',
  M: '3',
  N: '4',
  O: '5',
  P: '6',
  Q: '7',
  R: '8',
  S: '9',
  T: '0',
  U: '1',
  V: '2',
  W: '3',
  X: '4',
  Y: '5',
  Z: '6',
};

const getNumericAlphaValue = (char) => {
  if (alphanumericMap[char]) {
    return alphanumericMap[char];
  }
  return char;
};

export const motorVehicleAccidentClaimNumberValidator = (value) => {
  if (!value || value.length !== 8) {
    return false;
  }
  let numericClaimNumber = value;
  for (let i=0; i< value.length; i++) {
    numericClaimNumber = replaceAt(numericClaimNumber, i, getNumericAlphaValue(numericClaimNumber[i]));
  }
  const dividend = parseInt(numericClaimNumber.substr(0, 7));
  const remainder = dividend % 7;

  if (remainder !== parseInt(numericClaimNumber[7])) {
    return false;
  }
  return true;
};

export default {
  name: 'MotorVehicleAccidentClaimNumberInput',
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
  },
  emits: [
    'update:modelValue',
    'input',
  ],
  methods: {
    inputHandler(event) {
      const value = event?.target?.value;
      if (value) {
        const upperCaseValue = value.toUpperCase();
        this.$emit('input', upperCaseValue);
        this.$emit('update:modelValue', upperCaseValue);
      } else {
        this.$emit('input', null);
        this.$emit('update:modelValue', null);
      }
      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
}
</script>
