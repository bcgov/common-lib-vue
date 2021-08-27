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
        :data-cy="getCypressValue()"
        :value="value"
        :mask="mask"
        :guide="true"
        placeholderChar="_"
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
  name: 'PhoneNumberInput',
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
      mask: ['(', /[2-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    }
  },
  methods: {
    inputHandler(value) {
      this.$emit('input', value);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.$el.focus();
      });
    },
  }
}
</script>
