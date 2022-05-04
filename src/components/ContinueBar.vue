<template>
  <div :class='componentClass'>
    <div class="d-flex flex-wrap justify-content-end p-3 container">
      <Button v-if="hasSecondaryButton"
              :className="'secondary-button'"
              :color="'gold'"
              :label='secondaryButtonLabel'
              :data-cy="getCypressValue()"
              @click='onSecondaryClick()'/>
      <Button :label='buttonLabel'
              :hasLoader='hasLoader'
              :data-cy="getCypressValue()"
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
    hasSecondaryButton: {
      type: Boolean,
      default: false
    },
    buttonLabel: {
      type: String,
      default: 'Continue'
    },
    secondaryButtonLabel: {
      type: String,
    },
    isSticky: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['continue', 'secondary'],
  methods: {
    onContinue() {
      this.$emit('continue');
    },
    onSecondaryClick() {
      this.$emit('secondary');
    }
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
@media print {
  .continue-bar {
    display: none;
  }
}

.secondary-button {
  margin-bottom: 6px;
}

@media (min-width: 768px) {
  .secondary-button {
    margin-bottom: 0;
    margin-right: 6px;
  }
}
</style>
