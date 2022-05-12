<template>
  <div
    :class="className"
  >
    <label
      :for="id"
    >{{ label }}</label>
    <br>
    <div>
      <slot
        name="description"
      />
    </div>
    <select
      :id="id"
      name="country"
      aria-label="Jurisdiction"
      class="form-control"
      :autocomplete="autocompleteAttr"
      :disabled="disabled"
      :style="inputStyle"
      @change="onChange($event.target.value)"
      @blur="handleBlur($event)"
    >
      <option
        v-if="!disablePlaceholder && !removePlaceholder"
        value=""
      >
        {{ defaultOptionLabel }}
      </option>
      <option
        v-if="disablePlaceholder && !removePlaceholder"
        value=""
        disabled
        selected
      >
        {{ defaultOptionLabel }}
      </option>
      <option
        v-if="topCountry" 
        :value="firstCountry"
        :selected="modelValue === firstCountry"
      >
        {{ topCountryName() }}
      </option>
      <option
        v-for="(country, index) in countries"
        :key="index"
        :value="country[valueType]"
        :selected="modelValue === country[valueType]"
      >
        {{ shortCodeDropdown ? country.countryShortCode : country.countryName }}
      </option>
    </select>
  </div>
</template>

<script>
import countries from '../constants/region-data';
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'VueCountrySelect',
  mixins: [
    blurMixin,
  ],
  props: {
    id: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    countryName: {
      type: Boolean,
      default: true,
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    whiteList: Array,
    blackList: Array,
    className: {
      type: String,
      default: '',
    },
    shortCodeDropdown: Boolean,
    autocomplete: Boolean,
    topCountry: {
      type: String,
      default: 'Canada',
    },
    defaultOptionLabel: {
      type: String,
      default: 'Select a jurisdiction',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disablePlaceholder: {
      type: Boolean,
      default: false,
    },
    removePlaceholder: {
      type: Boolean,
      default: false,
    },
    usei18n: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
  ],
  data: () => ({
    ran: false,
  }),
  computed: {
    countries() {
      let countryList = countries.filter((country) => {
        if (this.countryName) {
          return country.countryName !== this.firstCountry
        } else {
          return country.countryShortCode !== this.firstCountry
        }
      })
      if (this.whiteList) {
        countryList = countryList.filter((country) => {
          return this.whiteList.includes(country.countryShortCode)
        })
      }
      if (this.blackList) {
        countryList = countryList.filter((country) => {
          return !this.blackList.includes(country.countryShortCode)
        })
      }
      if (this.usei18n && this.$i18n) {
        countryList = countryList.map((country) => {
          let localeCountry = Object.assign({}, country)
          localeCountry.countryName = this.$t(country.countryName)
          return localeCountry
        })
        countryList.sort((country1, country2) => {
          return (country1.countryName > country2.countryName) ? 1 : -1
        })
      }
      if (this.removePlaceholder) {
        let c = this.firstCountry || countryList[0][this.valueType]
        this.onChange(c)
      }
      return countryList
    },
    firstCountry() {
      if (this.countryName) {
        if (this.topCountry.length === 2) {
          const countryObj = countries.find((country) => {
            return country.countryShortCode === this.topCountry
          })
          return countryObj.countryName
        } else {
          return this.topCountry
        }
      }
      if (this.topCountry) {
        return this.topCountry
      }
      return ''
    },
    valueType() {
      return this.countryName ? 'countryName' : 'countryShortCode'
    },
    autocompleteAttr() {
      const autocompleteType = (showsFullCountryName) => showsFullCountryName ? 'country-name' : 'country';
      return this.autocomplete ? autocompleteType(this.countryName) : 'off';
    },
  },
  methods: {
    onChange(country) {
      this.$emit('update:modelValue', country);
    },
    topCountryName() {
      const countryObj = countries.find((country) => {
        if (this.countryName) {
          return country.countryName === this.firstCountry
        } else {
          return country.countryShortCode === this.firstCountry
        }
      })
      if (this.usei18n && this.$i18n) {
        return this.$t(countryObj.countryName)
      }
      return this.shortCodeDropdown ? countryObj.countryShortCode : countryObj.countryName
    },
  },
}
</script>
