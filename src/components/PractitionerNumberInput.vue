<template>
  <div :class="className">
    <label :for="id">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label><br/>
    <masked-input
        :id="id"
        type="text"
        name="practitionerNumber"
        class="form-control field"
        :data-cy="getCypressValue()"
        :value="value"
        :required="required"
        :aria-required="required"
        :mask="mask"
        :guide="false"
        placeholderChar="#"
        ref="input"
        @input="inputHandler($event)"
        @blur="handleBlur($event)"
        :style="inputStyle">
      </masked-input>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'PractitionerNumberInput',
  components: {
    MaskedInput
  },
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
      default: ''
    },
    value: {
      type: String,
    },
    label: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
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
  },
  data() {
    return {
      mask: [/[A-Za-z0-9]/, /\d/, /\d/, /\d/, /\d/],
    }
  },
  methods: {
    inputHandler(value) {
      if (value) {
        const upperCaseValue = value.toUpperCase();
        this.$emit('input', upperCaseValue);
      } else {
        this.$emit('input', null);
      }
      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.$el.focus();
      });
    },
  }
}
</script>
