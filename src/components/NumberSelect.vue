<template>
  <div :class='className'>
    <label :for='id'>
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label><br/>
    <select :id='id'
            class="form-control"
            :style='inputStyle'
            :value='value'
            @change="changeHandler($event)">
      <option :value='null'>Please select</option>
      <option v-for="option in options"
              :key="option"
              :data-cy="cyValue(option)"
              :value='option'>{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'NumberSelect',
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
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
  data: () => {
    return {
      options: [],
    }
  },
  created() {
    for (let i=this.min; i<=this.max; i++) {
      this.options.push(i);
    }
  },
  methods: {
    changeHandler(event) {
      this.$emit('input', event.target.value);
    },
    cyValue(argument) {
      //if no cypressId prop passed, don't add a data-cy tag
      if (!this.cypressId) {
        return null;
      }
      if (!argument) {
        return this.cypressId;
      }
      return this.cypressId + argument
    },
  }
}
</script>
