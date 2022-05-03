<template>
  <div :class="className">
    <label :for="id">{{label}}</label>
    <br/>
    <div>
      <slot name="description"></slot>
    </div>
    <select @change="onChange($event.target.value)"
      @blur="handleBlur($event)"
      :autocomplete="autocompleteAttr"
      :disabled="disabled"
      :style="inputStyle"
      class="form-control"
      aria-label="Region"
      :name="name">
      <option v-if="!disablePlaceholder && !removePlaceholder"
        value="">{{ defaultOptionLabel }}</option>
      <option v-if="disablePlaceholder && !removePlaceholder"
        value=""
        disabled
        selected>{{ defaultOptionLabel }}</option>
      <option v-for="(place, index) in shownRegions"
        v-bind:key="index"
        :value="place[valueType] !== '' ? place[valueType] : place.name.substring(0,3)"
        :selected="modelValue === place[valueType]">{{shortCodeDropdown ? place.shortCode : place.name}}</option>
    </select>
  </div>  
</template>

<script>
import regions from '../constants/region-data';
import blurMixin from '../mixins/blur-mixin';
import cypressMixin from "../mixins/cypress-mixin.js";

export default {
  name: 'RegionSelect',
  mixins: [blurMixin, cypressMixin],
  props: {
    id: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'region'
    },
    modelValue: {
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
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    defaultRegion: {
      type: String,
      default: '',
    },
    defaultOptionLabel: {
      type: String,
      default: 'Select region',
    },
    countryName: {
      type: Boolean,
      default: true,
    },
    regionName: {
      type: Boolean,
      default: true,
    },
    whiteList: Array,
    blackList: Array,
    className: {
      type: String,
      default: '',
    },
    shortCodeDropdown: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    disablePlaceholder: {
      type: Boolean,
      default: false,
    },
    removePlaceholder: {
      type: Boolean,
      default: false
    },
    usei18n: {
      type: Boolean,
      default: true,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    shownRegions: [],
    regions,
    ran: false
  }),
  mounted() {
    if (this.country) {
      this.getRegionWithCountry()
    } else {
      let findRegion = ''
      if (this.countryName) {
        findRegion = this.defaultRegion ? this.defaultRegion : 'United States'
      } else {
        findRegion = this.defaultRegion ? this.defaultRegion : 'US'
      }
      this.getRegionWithCountry(findRegion)
    }
  },
  computed: {
    valueType() {
      return this.regionName ? 'name' : 'shortCode'
    },
    autocompleteAttr() {
      return this.autocomplete ? "address-level1" : "off";
    }
  },
  methods: {
    onChange(modelValue) {
      this.$emit('update:modelValue', modelValue)
    },
    getRegionWithCountry(country) {
      country = country || this.country
      let countryRegions = regions.find((elem) => {
        if (this.countryName) {
          return elem.countryName === country
        } else {
          return elem.countryShortCode === country
        }
      }).regions
      if (this.$i18n && this.usei18n) {
        countryRegions = countryRegions.map((region) => {
          let localeRegion = Object.assign({}, region)
          localeRegion.name = this.$t(region.name)
          return localeRegion
        })
        countryRegions.sort((region1, region2) => {
          return region1.name > region2.name ? 1 : -1
        })
      }
      if (this.whiteList) {
        countryRegions = countryRegions.filter((region) => {
          return this.whiteList.includes(region.shortCode)
        })
      }
      if (this.blackList) {
        countryRegions = countryRegions.filter((region) => {
          return !this.blackList.includes(region.shortCode)
        })
      }
      this.shownRegions = countryRegions
      if (this.disablePlaceholder && this.ran) {
        this.onChange(this.shownRegions[0][this.valueType])
      }
      if (this.removePlaceholder) {
        this.onChange(this.shownRegions[0][this.valueType])
      }
      this.ran = true
    }
  },
  watch: {
    country(newVal, oldVal) {
      if (oldVal !== '') {
        this.onChange('')
      }
      if (this.country) {
        this.getRegionWithCountry()
      } else {
        this.shownRegions = []
      }
    }
  },
  emits: ['update:modelValue']
}
</script>
