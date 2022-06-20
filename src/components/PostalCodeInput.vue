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
      v-maska="{ mask: 'A#A #A#'}"
      type="text"
      name="postalCode"
      class="form-control field"
      :data-cy="getCypressValue()"
      :value="modelValue"
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

export default {
  name: 'PostalCodeInput',
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
    'input',
    'update:modelValue',
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
