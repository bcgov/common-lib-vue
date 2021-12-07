<template>
  <div :class="className">
    <label :for="id">{{label}}</label>
    <br/>
    <div>
      <slot name="description"></slot>
    </div>
    <VueCountrySelect
      :id="id"
      aria-label="Country"
      name="country"
      class="form-control"
      :disabled="disabled"
      :style='inputStyle'
      :value="value"
      :country="value"
      :countryName="true"
      topCountry="Canada"
      :placeholder="defaultOptionLabel"
      :disablePlaceholder="disablePlaceholder"
      @input="handleInput($event)"
      @blur="handleBlur($event)"/>
  </div>
</template>

<script>
import {
  CountrySelect as VueCountrySelect,
} from 'vue-country-region-select';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'CountrySelect',
  components: {
    VueCountrySelect,
  },
  mixins: [
    blurMixin,
  ],
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
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    className: {
      type: String,
      default: ''
    },
    defaultOptionLabel: {
      type: String,
      default: 'Select a country'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disablePlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleInput(value) {
        this.$emit('input', value);
    }
  }
}
</script>