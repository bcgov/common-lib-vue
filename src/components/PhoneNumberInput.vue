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
      v-maska="{ mask: '(Z##) ###-####', tokens: { 'Z': { pattern: /[2-9]/ }}}" 
      type="text" 
      name="phoneNumber" 
      class="form-control field"
      :data-cy="getCypressValue()" 
      :value="modelValue"
      :style="inputStyle"
      :required="required"
      :aria-required="required"
      @input="inputHandler($event)" 
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import { maska } from 'maska';
import cypressMixin from '../mixins/cypress-mixin.js';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'PhoneNumberInput',
  directives: { maska, },
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
  ],
  methods: {
    inputHandler(event) {
      this.$emit('update:modelValue', event.target.value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
}
</script>
