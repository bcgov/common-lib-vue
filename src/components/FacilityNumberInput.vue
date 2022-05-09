<template>
  <div
    :class="className"
  >
    <label
      :for="id"
    >
      {{ label }}<span
        v-if="isRequiredAsteriskShown"
        class="required-asterisk"
      >*</span>
    </label><br>
    <masked-input
      :id="id"
      ref="input"
      type="text"
      name="practitionerNumber"
      class="form-control"
      :value="value"
      :mask="mask"
      :data-cy="getCypressValue()"
      :guide="false"
      placeholder-char="#"
      :style="inputStyle"
      @input="inputHandler($event)"
      @blur="handleBlur($event)"
    />
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from '../mixins/blur-mixin';

export default {
  name: 'FacilityNumberInput',
  components: {
    MaskedInput,
  },
  mixins: [
    blurMixin,
    cypressMixin,
  ],
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
      },
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mask: [
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
        /[A-Za-z0-9]/,
      ],
    }
  },
  methods: {
    inputHandler(value) {
      if (value) {
        const upperCaseValue = value.toUpperCase();
        this.$emit('input', upperCaseValue);
      } else {
        this.$emit('input', null);
      }
      // Prevent input focus loss during rerender.
      this.$nextTick(() => {
        this.$refs.input.$el.focus();
      });
    },
  },
}
</script>
