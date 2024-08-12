<template>
  <div :class="className">
    <label :for="id">
      {{ label }}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span> </label
    ><br />
    <div>
      <slot name="description" />
    </div>
    <select
      :id="id"
      v-model="localValue"
      class="form-control field"
      :style="inputStyle"
      :required="required"
      :aria-required="required"
      @change="changeHandler($event)"
      @blur="handleBlur($event)"
    >
      <option :value="null" :disabled="disablePlaceholder">
        {{ defaultOptionLabel }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :data-cy="getCypressValue(index)"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from "../mixins/blur-mixin";

export const selectOptionsMonths = [
  {
    value: "1",
    label: "January",
  },
  {
    value: "2",
    label: "February",
  },
  {
    value: "3",
    label: "March",
  },
  {
    value: "4",
    label: "April",
  },
  {
    value: "5",
    label: "May",
  },
  {
    value: "6",
    label: "June",
  },
  {
    value: "7",
    label: "July",
  },
  {
    value: "8",
    label: "August",
  },
  {
    value: "9",
    label: "September",
  },
  {
    value: "10",
    label: "October",
  },
  {
    value: "11",
    label: "November",
  },
  {
    value: "12",
    label: "December",
  },
];

export default {
  name: "SelectComponent",
  mixins: [blurMixin, cypressMixin],
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    defaultOptionLabel: {
      type: String,
      default: "Select",
    },
    disablePlaceholder: {
      type: Boolean,
      default: false,
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "input"],
  data: () => {
    return {
      localValue: null,
    };
  },
  watch: {
    modelValue(newValue) {
      this.localValue = newValue || null;
    },
  },
  created() {
    this.localValue = this.modelValue;
  },
  methods: {
    changeHandler(event) {
      const value = event.target.value === this.defaultOptionLabel ? null : event.target.value;
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
../mixins/blur-mixin.js
