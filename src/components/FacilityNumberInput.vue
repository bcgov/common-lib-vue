<template>
  <div :class="className">
    <label :for="id">
      {{ label }}
      <span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span> </label
    ><br />
    <input
      :id="id"
      ref="input"
      v-maska="{ mask: 'XXXXX' }"
      type="text"
      name="practitionerNumber"
      class="form-control field"
      :value="modelValue"
      :required="required"
      :aria-required="required"
      :data-cy="getCypressValue()"
      :style="inputStyle"
      @input.stop="inputHandler($event)"
      @blur="handleBlur($event)"
    />
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from "../mixins/blur-mixin";
import { maska } from "maska";

export default {
  name: "FacilityNumberInput",
  directives: { maska },
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
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "input"],
  methods: {
    inputHandler(event) {
      const value = event?.target?.value;
      if (value) {
        const upperCaseValue = value.toUpperCase();
        this.$emit("input", upperCaseValue);
        this.$emit("update:modelValue", upperCaseValue);
      } else {
        this.$emit("input", null);
        this.$emit("update:modelValue", null);
      }
      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>
