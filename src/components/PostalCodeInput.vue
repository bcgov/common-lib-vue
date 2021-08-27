<template>
  <div :class="className">
    <label :for="id">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label><br/>
    <masked-input
        :id="id"
        type="text"
        name="postalCode"
        class="form-control"
        :data-cy="cyValue()"
        :value="value"
        :mask="mask"
        :guide="false"
        placeholderChar="#"
        ref="input"
        @input="inputHandler($event)"
        :style="inputStyle">
      </masked-input>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';
import cypressMixin from "../mixins/cypress-mixin.js"

export default {
  name: 'PostalCodeInput',
  components: {
    MaskedInput
  },
  mixins: [ cypressMixin ],
  props: {
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
    cypressId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      mask: [/[A-Za-z]/, /\d/, /[A-Za-z]/, ' ', /\d/, /[A-Za-z]/, /\d/],
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
