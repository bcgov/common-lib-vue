<template>
  <div :class="className">
    <label :for="id">{{label}}:</label><br/>
    <masked-input
        :id="id"
        type="text"
        name="postalCode"
        class="form-control"
        v-model="localValue"
        :mask="mask"
        :guide="true"
        placeholderChar="_">
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
    id: String,
    value: String,
    label: String,
    className: String,
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
