<template>
  <fieldset
    :class="className"
  >
    <legend
      v-if="label"
      tabindex="-1"
      class="label"
    >
      {{ label }}<span
        v-if="isRequiredAsteriskShown"
        class="required-asterisk"
      >*</span>
    </legend>
    <div>
      <slot
        name="description"
      />
    </div>
    <div
      :class="horizontalAlign ? 'horizontal-radio-container' : ''"
    >
      <div
        v-for="item in items"
        :key="item.value"
        class="md-radio"
      >
        <input
          :id="`${id}-${item.id}`"
          type="radio"
          :name="name"
          :data-cy="getCypressValue(item)"
          :value="item.value"
          :checked="modelValue === item.value"
          :required="required"
          :aria-required="required"
          @change="handleChangeValue($event)"
          @blur="handleBlur($event)"
        >
        <label
          :for="`${id}-${item.id}`"
        >{{ item.label }}</label>
        <br>
      </div>
    </div>
  </fieldset>
</template>

<script>
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'RadioComponent',
  mixins: [
    blurMixin,
  ],
  props: {
    required: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: '',
    },
    modelValue: {
      validator: (p) => {
        return p === null || typeof p === 'string';
      },
    },
    items: {
      type: Array,
      default: () => {
        return [
        ];
      },
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },
    className: {
      type: String,
      default: '',
    },
    horizontalAlign: {
      type: Boolean,
      default: false,
    },
    cypressId: {
      type: String,
      default: '',
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'input',
  ],
  methods: {
    handleChangeValue(event) {
      const value = event.target.value;
      this.$emit('update:modelValue', value);
      this.$emit('input', value);
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
  },
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

.horizontal-radio-container {
  display: flex;
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
  box-shadow: 0 0 0 0.2rem #7999c9;
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
