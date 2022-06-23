<template>
  <button
    :class="classes"
    :data-cy="getCypressValue()"
    :disabled="disabled || hasLoader"
  >
    <div
      v-if="hasLoader"
      class="bcgov-loader-show"
    >
      <Loader />
    </div>
    {{ label }}
  </button>
</template>

<script>
import Loader from './Loader.vue';
import cypressMixin from '../mixins/cypress-mixin.js'

export default {
  name: 'ButtonComponent',
  components: {
    Loader,
  },
  mixins: [
    cypressMixin,
  ],
  props: {
    label: {
      type: String,
      required: true,
    },
    hasLoader: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'blue',
      validator: function (value) {
        // The value must match one of these strings
        return [
          'blue',
          'white',
          'gold',
        ].indexOf(value) !== -1
      },
    },
  },
  computed: {
    classes() {
      return `bcgov-button bcgov-normal-${this.color} btn ${this.className}`;
    },
  },
}
</script>

<style scoped>
.bcgov-normal-blue {
  color: white;
  font-weight: 700;
  font-style: normal;
  background-color: #003366;
}

.bcgov-normal-blue:hover {
  background-color: rgba(43, 91, 164, 1);
  color: white;
}

.bcgov-normal-gold {
  color: #003366;
  font-weight: 700;
  font-style: normal;
  background-color: #FCBA19;
}

.bcgov-normal-gold:hover {
  background-color: #E2AA3A;
  color: #003366;
}

.bcgov-normal-white {
  color: #003366;
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(204, 204, 204, 1);
}

.bcgov-normal-white:hover {
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  background-color: rgba(242, 242, 242, 1);
  border-color: rgba(204, 204, 204, 1);
}

.bcgov-button {
  min-width: 150px;
  min-height: 40px;
}

.bcgov-button:focus {
  box-shadow: 0 0 0 0.2rem #7999c9;
}

@media (max-width: 767.98px) {
  .bcgov-button {
    min-width: 100%;
  }
}

.bcgov-loader-show {
  display: inline-block;
  margin: 2px 6px -3px 0;
  vertical-align: middle;
}
</style>
