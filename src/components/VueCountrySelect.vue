<template>
  <select @change="onChange($event.target.value)"
    @blur="onBlur($event)"
    :class="className + ' field'"
    :required="required"
    :aria-required="required"
    :autocomplete="autocompleteAttr">
    <option v-if="!disablePlaceholder && !removePlaceholder"
      value="">{{ placeholder }}</option>
    <option v-if="disablePlaceholder && !removePlaceholder"
       value=""
       disabled
       selected>{{ placeholder }}</option>
    <option v-if="topCountry" :value="firstCountry"
      :selected="country === firstCountry">{{topCountryName()}}</option>
    <option v-for="(region, index) in countries"
      :key="index"
      :value="region[valueType]"
      :selected="country === region[valueType]">{{ shortCodeDropdown ? region.countryShortCode : region.countryName }}</option>
  </select>
</template>

<script>
  import regions from '../constants/region-data';

  export default {
    name: 'VueCountrySelect',
    props: {
      required: {
        type: Boolean,
        default: false
      },
      country: String,
      countryName: Boolean,
      whiteList: Array,
      blackList: Array,
      className: String,
      shortCodeDropdown: Boolean,
      autocomplete: Boolean,
      topCountry: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: 'Select Country'
      },
      disablePlaceholder: {
        type: Boolean,
        default: false
      },
      removePlaceholder: {
        type: Boolean,
        default: false
      },
      usei18n: {
        type: Boolean,
        default: true
      }
    },
    data: () => ({
      ran: false
    }),
    computed: {
      countries() {
        let countryList = regions.filter((region) => {
          if (this.countryName) {
            return region.countryName !== this.firstCountry
          } else {
            return region.countryShortCode !== this.firstCountry
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
        if (this.$i18n && this.usei18n) {
          countryList = countryList.map((country) => {
            let localeCountry = Object.assign({ }, country)
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
        if(this.countryName) {
          if(this.topCountry.length === 2 ) {
            const regionObj = regions.find((region) => {
              return region.countryShortCode === this.topCountry
            })
            return regionObj.countryName
          } else {
            return this.topCountry
          }
        }
        if (this.topCountry) {
          return this.topCountry
        }
        return ''
      },
      name() {
        return this.name
      },
      value() {
        return this.country
      },
      valueType() {
        return this.countryName ? 'countryName' : 'countryShortCode'
      },
      autocompleteAttr() {
        const autocompleteType = (showsFullCountryName) => showsFullCountryName ? "country-name" : "country";
        return this.autocomplete ? autocompleteType(this.countryName) : "off";
      }
    },
    methods: {
      onChange(country) {
        this.$emit('input', country)
      },
      onBlur(event) {
        this.$emit('blur', event);
      },
      topCountryName() {
        const regionObj = regions.find((region) => {
          if (this.countryName) {
            return region.countryName === this.firstCountry
          } else {
            return region.countryShortCode === this.firstCountry
          }
        })
        if (this.$i18n && this.usei18n) {
          return this.$t(regionObj.countryName)
        }
        return this.shortCodeDropdown ? regionObj.countryShortCode : regionObj.countryName
      }
    }
  }
</script>
