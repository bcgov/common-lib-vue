<template>
  <div :class="className">
    <label v-if="label" :for="id">
      {{ label
      }}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label>
    <br v-if="label" />
    <input
      :id="id"
      type="text"
      name="SIN"
      class="form-control"
      :data-cy="getCypressValue()"
      :value="modelValue"
      :placeholder="placeholder"
      ref="input"
      @input.stop="inputHandler($event)"
      @blur="handleBlur($event)"
      :style="inputStyle"
      v-maska="{ mask: '### ### ###' }"
    />
  </div>
</template>

<script>
import { maska } from "maska";
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from "../mixins/blur-mixin";

export const sinValidator = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  // Init weights and other stuff
  const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1];
  let sum = 0;

  // Clean up string
  let sin = value.trim();
  sin = value
    .replace(/_/g, "") // remove underlines
    .replace(/\s/g, ""); // spaces

  // Test for length
  if (sin.length !== 9) {
    return false;
  }

  // Test for string of zeros
  if (sin === "000000000") {
    return false;
  }

  // Test for SINs that begin with 0
  if (sin[0] === "0") {
    return false;
  }

  // Walk through each character
  for (let i = 0; i < sin.length; i++) {
    // pull out char
    const char = sin.charAt(i);

    // parse the number
    const num = Number(char);
    if (Number.isNaN(num)) {
      return false;
    }

    // multiply the value against the weight
    let result = num * weights[i];

    // If two digit result, substract 9
    if (result > 9) {
      result = result - 9;
    }

    // add it to our sum
    sum += result;
  }

  // The sum must be divisible by 10
  if (sum % 10 !== 0) {
    return false;
  }
  return true;
};

export default {
  name: "SINInput",
  directives: { maska },
  mixins: [blurMixin, cypressMixin],
  props: {
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
    placeholder: {
      type: String,
      default: "",
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit("update:modelValue", event.target.value);
      this.$emit("input", event.target.value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
  emits: ["update:modelValue", "input"],
};
</script>
