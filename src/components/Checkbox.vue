<template>
  <div :class="`${className}`">
    <div class="form-check">
      <input
        :id="id"
        ref="checkbox"
        v-model="localModel"
        type="checkbox"
        :class="inputClasses"
        :disabled="disabled"
        :data-cy="getCypressValue()"
        @change="handleChange($event)"
        @blur="handleBlur($event)"
      />
      <label class="form-check-label" :for="id">{{ label }}</label>
    </div>
    <div class="slot-container">
      <slot name="description" />
    </div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from "../mixins/blur-mixin";

export default {
  name: "CheckboxComponent",
  components: {},
  mixins: [blurMixin, cypressMixin],
  props: {
    modelValue: {
      type: Boolean,
    },
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "check",
      validator: (value) => {
        return ["check", "cross"].includes(value);
      },
    },
  },
  emits: ["update:modelValue", "input"],
  data: () => {
    return {
      localModel: null,
    };
  },
  computed: {
    inputClasses() {
      return `form-check-input icon-${this.icon}`;
    },
  },
  watch: {
    modelValue(newValue) {
      this.localModel = newValue;
    },
  },
  created() {
    this.localModel = this.modelValue;
  },
  methods: {
    handleChange(event) {
      this.$emit("update:modelValue", event.target.checked);
      this.$emit("input", this.localModel);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.checkbox.focus();
      });
    },
  },
};
</script>

<style scoped>
/* Base for label styling */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: 0;
  opacity: 0.01;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 2.3em;
}

/* checkbox aspect */
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1.4em;
  height: 1.4em;
  border: 1px solid #606060;
  background: #fff;
  border-radius: 0.2em;
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.1),
    0 0 0 rgba(0, 0, 0, 0.1);
  -webkit-transition: all 0.275s;
  transition: all 0.275s;
}

/* checked mark aspect */
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  position: absolute;
  color: #606060;
  line-height: 0;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

[type="checkbox"].icon-check:not(:checked) + label:after,
[type="checkbox"].icon-check:checked + label:after {
  content: "✔";
  top: 0.56em;
  left: 0.2em;
  font-size: 1.2em;
}

[type="checkbox"].icon-cross:not(:checked) + label:after,
[type="checkbox"].icon-cross:checked + label:after {
  content: "✖";
  top: 0.525em;
  left: 0.09em;
  font-size: 1.355em;
}

/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0) rotate(45deg);
  transform: scale(0) rotate(45deg);
}

[type="checkbox"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1) rotate(0);
  transform: scale(1) rotate(0);
}

/* Disabled checkbox */
[type="checkbox"]:disabled:not(:checked) + label:before,
[type="checkbox"]:disabled:checked + label:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #e9e9e9;
}

[type="checkbox"]:disabled:checked + label:after {
  color: #777;
}

/* Accessibility */
[type="checkbox"]:checked:focus + label:before,
[type="checkbox"]:not(:checked):focus + label:before {
  box-shadow: 0 0 0 0.2rem #7999c9;
}

.form-check {
  padding-left: 0; /* Override Bootstrap default */
}
.slot-container {
  padding-left: 2.3em;
}
</style>
