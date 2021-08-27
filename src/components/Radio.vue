<template>
  <div :class="className">
    <legend v-if="label"
            tabindex="-1"
            class="label">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </legend>
    <div v-for="item in items"
        :key="item.value"
        :data-cy="getCypressValue(item)"
        class='md-radio'>
      <input type='radio'
            :id='item.id'
            :name='name'
            :value='item.value'
            v-model='selectedValue'
            @change="onChangeValue($event)" />
      <label :for='item.id'>{{item.label}}</label>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: String
    },
    items: {
      type: Array,
      default: () => {
        return [];
      }
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    className: {
      type: String,
      default: ''
    },
    cypressId: {
      type: String,
      default: ''
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false
    },
  },
  data: () => {
    return {
      selectedValue: null,
    }
  },
  created() {
    this.selectedValue = this.value;
  },
  methods: {
    onChangeValue() {
      this.$emit('input', this.selectedValue);
    },
    getCypressValue(item) {
      //if no cypressId prop passed, don't add a data-cy tag
      if (!this.cypressId) {
        return null;
      }
      //otherwise append the cypress tag with some way to tell the radio buttons apart from each other
      //it should pretty much always be id
      //but if for some reason there's a radio button that doesn't have one
      //it should trigger one of the other conditions
      if (item.id) {
        return this.cypressId + item.id 
      } else if (item.label) {
        return this.cypressId + item.label
      }
      //if none of those things exist, then don't return data-cy either
      return null
    },
  }
}
</script>

<style scoped>

.label {
  font-size: inherit;
}

@keyframes ripple {
  0% {
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.0);
  }
  50% {
    box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0px 0px 0px 15px rgba(0, 0, 0, 0);
  }
}

.md-radio {
  margin: 10px 0;
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

}
.md-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.md-radio input[type="radio"]:checked + label:before {
  border-color: #606060;
  animation: ripple 0.2s linear forwards;
}
.md-radio input[type="radio"]:checked + label:after {
  transform: scale(1);
}


.md-radio input[type="radio"]:focus + label:before {
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.1);
  animation: none;
}
.md-radio label {
  display: inline-block;
  height: auto;
  position: relative;
  padding: 0 30px;
  margin-bottom: 0;
  cursor: pointer;
  vertical-align: bottom;
}

.md-radio label:before,
.md-radio label:after {
  position: absolute;
  content: '';
  border-radius: 50%;
  transition: all .3s ease;
  transition-property: transform, border-color;
}

/* Outer circle of radio. */
.md-radio label:before {
  top: 2px;
  left: 0;
  width: 18px;
  height: 18px;
  border: 2px solid #606060;
  background-color: #FFF;
}

/* Inner circle when radio is selected. */
.md-radio label:after {
  top: 7px;
  left: 5px;
  width: 8px;
  height: 8px;
  transform: scale(0);
  background: #606060;
}
</style>
