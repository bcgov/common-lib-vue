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
      class="form-control field"
      :value="modelValue"
      :maxlength="maxlength"
      :style="inputStyle"
      :required="required"
      :aria-required="required"
      :data-cy="getCypressValue()"
      :readonly="readonly"
      :disabled="disabled"
      @input.stop="inputHandler($event)"
      @blur="handleBlur($event)"
    >
  </div>
</template>

<script>
import cypressMixin from '../mixins/cypress-mixin.js';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'InputComponent',
  components: {},
  mixins: [
    blurMixin,
    cypressMixin,
  ],
  props: {
    required: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
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
    isUpperCaseForced: {
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
  },
  emits: [
    'input',
    'update:modelValue',
  ],
  methods: {
    inputHandler(event) {
      let value = event.target.value;

      if (value && this.isUpperCaseForced) {
        value = value.toUpperCase();
      }
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
