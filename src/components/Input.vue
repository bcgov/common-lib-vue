<template>
  <div :class="className">
    <label :for="id">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label><br/>
    <input :id="id"
           class='form-control'
           :value="value"
           :maxlength='maxlength'
           :style='inputStyle'
           :data-cy="getCypressValue()"
           ref='input'
           @input="inputHandler($event)"
           @blur="$emit('blur', $event)" />
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js"

export default {
  name: 'Input',
  components: {},
  mixins: [ cypressMixin ],
  props: {
    value: {
      type: String,
    },
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: '1000'
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false
    },
    isUpperCaseForced: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    inputHandler(event) {
      let value = event.target.value;

      if (value && this.isUpperCaseForced) {
        value = value.toUpperCase();
      }
      this.$emit('input', value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  }
}
</script>
