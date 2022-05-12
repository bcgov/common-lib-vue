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
      v-maska="{ mask: 'Z####', tokens: { 'Z': { pattern: /[A-Za-z0-9]/ }}}"
      type="text"
      name="practitionerNumber"
      class="form-control"
      :data-cy="getCypressValue()"
      :value="modelValue"
      :style="inputStyle"
      @input.stop="inputHandler($event.target.value)"
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import { maska } from 'maska';
import cypressMixin from '../mixins/cypress-mixin.js';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'PractitionerNumberInput',
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
    inputHandler(value) {
      if (value) {
        const upperCaseValue = value.toUpperCase();
        this.$emit('update:modelValue', upperCaseValue);
        this.$emit('input', upperCaseValue);
      } else {
        this.$emit('update:modelValue', null);
        this.$emit('input', null);
      }
      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
}
</script>
