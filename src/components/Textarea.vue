<template>
  <div :class="className">
    <label :for="id">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label><br/>
    <textarea :id="id"
           class='form-control'
           :data-cy="getCypressValue()"
           :value="value"
           :style='inputStyle'
           :maxlength="maxlength"
           ref='input'
           @input="inputHandler($event)"
           @blur="$emit('blur', $event)" />
    <div v-if="isRemainingCharsShown"
        :class="remainingCharsClasses">{{remainingCharsText}}</div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js"
export default {
  name: 'Textarea',
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
      default: null
    },
    remainingCharsMaxlength: {
      type: Number,
      default: 0,
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isRemainingCharsShown: {
      type: Boolean,
      default: false,
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
  computed: {
    remainingCharsClasses() {
      const isError = this.value && this.remainingCharsMaxlength && this.value.length > this.remainingCharsMaxlength;
      return `remaining-chars ${isError ? 'error text-danger' : ''}`;
    },
    remainingCharsText() {
      const remainingChars = (this.value && this.remainingCharsMaxlength) ? this.remainingCharsMaxlength - this.value.length : this.remainingCharsMaxlength;
      return `Characters remaining: ${remainingChars}`;
    }
  }
}
</script>

<style scoped>
.remaining-chars {
  text-align: right;
  font-size: 13.33px;
}
.remaining-chars.error {
  color: #D8292F;
}
</style>