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
      <option :value='null'>{{defaultOptionLabel}}</option>
      <option v-for="(option, index) in options"
              :key="index"
              :data-cy="cyValue(index)"
              :value='option.value'>{{option.label}}</option>
    </select>
  </div>
</template>

<script>

export const selectOptionsMonths = [
  {
    value: '1',
    label: 'January'
  },
  {
    value: '2',
    label: 'February'
  },
  {
    value: '3',
    label: 'March'
  },
  {
    value: '4',
    label: 'April'
  },
  {
    value: '5',
    label: 'May'
  },
  {
    value: '6',
    label: 'June'
  },
  {
    value: '7',
    label: 'July'
  },
  {
    value: '8',
    label: 'August'
  },
  {
    value: '9',
    label: 'September'
  },
  {
    value: '10',
    label: 'October'
  },
  {
    value: '11',
    label: 'November'
  },
  {
    value: '12',
    label: 'December'
  }
];

export default {
  name: 'Select',
  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
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
    options: {
      type: Array,
      default: () => {
        return [];
      }
    },
    defaultOptionLabel: {
      type: String,
      default: 'Select'
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
