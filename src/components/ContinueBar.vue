<template>
  <div :class='componentClass'>
    <div class="d-flex flex-row-reverse p-3 container">
      <Button :label='buttonLabel'
              :hasLoader='hasLoader'
              :data-cy="cyValue()"
              @click='onContinue()'/>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';
import cypressMixin from "../mixins/cypress-mixin.js"

export default {
  name: 'ContinueBar',
  components: {
    Button
  },
  mixins: [ cypressMixin ],
  props: {
    hasLoader: {
      type: Boolean,
      default: false
    },
    buttonLabel: {
      type: String,
      default: 'Continue'
    },
    isSticky: {
      type: Boolean,
      default: true,
    },
    cypressId: {
      type: String,
      default: ''
    },
  },
  methods: {
    onContinue() {
      this.$emit('continue');
    },
  },
  computed: {
    componentClass() {
      return `continue-bar ${this.isSticky ? 'sticky' : ''}`;
    }
  }
};
</script>

<style scoped>
.continue-bar {
  background-color: #cdd9e4;
}
.continue-bar.sticky {
  position: sticky;
  bottom: 0;
}
</style>
