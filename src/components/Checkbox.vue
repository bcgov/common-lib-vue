<template>
  <div :class="`${className}`">
    <div class="form-check">
      <input type="checkbox"
        :class="inputClasses"
        :id="id"
        :disabled="disabled"
        :data-cy="getCypressValue()"
        v-model="localModel"
        ref="checkbox"
        @change="handleChange($event)"
        @blur="handleBlur($event)"/>
      <label class="form-check-label"
        :for="id">{{label}}</label>
    </div>
    <div class="slot-container">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'CheckboxComponent',
  components: {},
  mixins: [
    blurMixin,
    cypressMixin,
  ],
  props: {
    value: {
      type: Boolean,
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
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'check',
      validator: (value) => {
        return ['check', 'cross'].includes(value);
      }
    }
  },
  data: () => {
    return {
      localModel: null,
    }
  },
  created() {
    this.localModel = this.value;
  },
  watch: {
    value(newValue) {
      this.localModel = newValue;
    }
  },
  methods: {
    handleChange() {
      this.$emit('input', this.localModel);

      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.checkbox.focus();
      });
    },
  },
  computed: {
    inputClasses() {
      return `form-check-input icon-${this.icon}`;
    }
  }
}
</script>

<style scoped>
/* Base for label styling */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: 0;
  opacity: 0.01;
}
[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 2.3em;
}

/* checkbox aspect */
[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 1.4em;
  height: 1.4em;
  border: 1px solid #606060;
  background: #FFF;
  border-radius: .2em;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 rgba(0,0,0,0.1);
  -webkit-transition: all .275s;
      transition: all .275s;
}

/* checked mark aspect */
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  position: absolute;
  color: #606060;
  line-height: 0;
  -webkit-transition: all .2s;
  transition: all .2s;
}

[type="checkbox"].icon-check:not(:checked) + label:after,
[type="checkbox"].icon-check:checked + label:after {
  content: '✔';
  top: .56em;
  left: 0.2em;
  font-size: 1.2em;
}

[type="checkbox"].icon-cross:not(:checked) + label:after,
[type="checkbox"].icon-cross:checked + label:after {
  content: '✖';
  top: .525em;
  left: .09em;
  font-size: 1.355em;
}

/* checked mark aspect changes */
[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0) rotate(45deg);
      transform: scale(0) rotate(45deg);
}

[type="checkbox"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1) rotate(0);
      transform: scale(1) rotate(0);
}

/* Disabled checkbox */
[type="checkbox"]:disabled:not(:checked) + label:before,
[type="checkbox"]:disabled:checked + label:before {
  box-shadow: none;
  border-color: #bbb;
  background-color: #e9e9e9;
}

[type="checkbox"]:disabled:checked + label:after {
  color: #777;
}

/* Accessibility */
[type="checkbox"]:checked:focus + label:before,
[type="checkbox"]:not(:checked):focus + label:before {
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1), 0 0 0 3px rgba(0,0,0,0.1);
}

.form-check {
  padding-left: 0; /* Override Bootstrap default */
}
.slot-container {
  padding-left: 2.3em;
}
</style>