<template>
  <div :class="className">
    <label :for="id">{{label}}</label><br/>
    <masked-input
        :id="id"
        type="text"
        name="postalCode"
        class="form-control"
        v-model="localValue"
        :mask="mask"
        :guide="true"
        placeholderChar="_"
        @input="$emit('input', $event)"
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
      default: null
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
      localValue: null,
      mask: ['(', /[2-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    }
  },
  created() {
    this.localValue = this.value;
  },
  watch: {
    localValue(newValue) {
      this.$emit('input', newValue);
    }
  }
}
</script>
