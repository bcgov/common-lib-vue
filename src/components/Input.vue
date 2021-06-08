<template>
  <div :class="className">
    <label :for="'input' + label">{{label}}</label><br/>
    <input :id="id"
           class='form-control'
           :value="value"
           :maxlength='maxlength'
           :style='inputStyle'
           @input="emitInput($event)"
           @blur="$emit('blur', $event)" />
  </div>
</template>

<script>
export default {
  name: 'Input',
  components: {},
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
    }
  },
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>
