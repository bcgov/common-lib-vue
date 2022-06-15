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
    <select
      :id="id"
      class="form-control"
      :style="inputStyle"
      v-model="localValue"
      @change="changeHandler($event)"
      @blur="handleBlur($event)"
    >
      <option
        :value="null"
      >{{defaultOptionLabel}}</option>
      <option
        v-for="option in options"
        :key="option"
        :data-cy="getCypressValue(option)"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import cypressMixin from '../mixins/cypress-mixin.js';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'NumberSelect',
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
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    defaultOptionLabel: {
      type: String,
      default: 'Please select'
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
  data: () => {
    return {
      localValue: null,
      options: [
      ],
    }
  },
  created() {
    this.localValue = this.modelValue;

    for (let i = this.min; i <= this.max; i++) {
      this.options.push(i);
    }
  },
  methods: {
    changeHandler(event) {
      const value = event.target.value === this.defaultOptionLabel ? null : event.target.value;
      this.$emit('input', value);
      this.$emit('update:modelValue', value);
    },
  },
  watch: {
    modelValue(newValue) {
      this.localValue = newValue || null;
    },
  },
};
</script>
