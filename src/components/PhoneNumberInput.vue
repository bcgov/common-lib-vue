<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <masked-input
        :id="id"
        type="text"
        name="postalCode"
        class="form-control"
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

export default {
  name: 'PhoneNumberInput',
  components: {
    MaskedInput
  },
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
    }
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
    }
  }
}
</script>
