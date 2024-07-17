<template>
  <div :class="componentClass">
    <div class="d-flex flex-wrap justify-content-end p-3 container">
      <ButtonComponent
        v-if="hasSecondaryButton"
        :class-name="'secondary-button'"
        :color="'gold'"
        :label="secondaryButtonLabel"
        :data-cy="getCypressValue()"
        @click="onSecondaryClick()"
      />
      <ButtonComponent
        :label="buttonLabel"
        :has-loader="hasLoader"
        :data-cy="getCypressValue()"
        @click="onContinue()"
      />
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'
import cypressMixin from '../mixins/cypress-mixin.js'

export default {
  name: 'ContinueBar',
  components: {
    ButtonComponent
  },
  mixins: [cypressMixin],
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
      type: String
    },
    isSticky: {
      type: Boolean,
      default: true
    }
  },
  emits: ['continue', 'secondary'],
  computed: {
    componentClass() {
      return `continue-bar ${this.isSticky ? 'sticky' : ''}`
    }
  },
  methods: {
    onContinue() {
      this.$emit('continue')
    },
    onSecondaryClick() {
      this.$emit('secondary')
    }
  }
}
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
