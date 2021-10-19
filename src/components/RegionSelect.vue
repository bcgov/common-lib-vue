<template>
  <div :class="className">
    <label :for="id">{{label}}</label>
    <br/>
    <div>
      <slot name="description"></slot>
    </div>
    <VueRegionSelect 
      :id="id" 
      aria-label='Region'
      :name="name"
      class="form-control"
      :disabled="disabled" 
      :value="value"
      :country="country"
      :region="value"
      :countryName="true"
      :regionName="true"
      :placeholder="defaultOptionLabel"
      @input="handleInput($event)"
      @blur="handleBlur($event)" />
  </div>
</template>

<script>
import {
  RegionSelect as VueRegionSelect,
} from 'vue-country-region-select';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'RegionSelect',
  components: {
    VueRegionSelect,
  },
  mixins: [
    blurMixin,
  ],
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'region'
    },
    value: {
      type: String,
    },
    country: {
      type: String,
      default: 'Canada'
    },
    label: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    defaultOptionLabel: {
      type: String,
      default: 'Select region'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value);
    }
  }
}
</script>
