<template>
  <div :class="className">
    <label :for="id">
      {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
    </label><br/>
    <masked-input
        :id="id"
        type="text"
        name="practitionerNumber"
        class="form-control"
        :value="value"
        :mask="mask"
        :data-cy="cyValue()"
        :guide="false"
        placeholderChar="#"
        ref="input"
        @input="inputHandler($event)"
        :style="inputStyle">
      </masked-input>
  </div>
</template>

<script>
import MaskedInput from 'vue-text-mask';

export default {
  name: 'FacilityNumberInput',
  components: {
    MaskedInput
  },
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
    className: {
      type: String,
      default: ''
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
    cypressId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      mask: [/[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/, /[A-Za-z0-9]/],
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
    cyValue(argument) {
      //if no cypressId prop passed, don't add a data-cy tag
      if (!this.cypressId) {
        return null;
      }
      if (!argument) {
        return this.cypressId;
      }
      return this.cypressId + argument
    },
  }
}
</script>
