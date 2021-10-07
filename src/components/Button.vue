<template>
  <button
    :class="'bcgov-button bcgov-normal-blue btn ' + className"
    :data-cy='getCypressValue()'
    @click="$emit('click', $event)"
    :disabled="disabled || hasLoader">
    <div v-if="hasLoader" class="bcgov-loader-show">
      <Loader />
    </div>
    {{ label }}
  </button>
</template>

<script>
import Loader from "./Loader.vue";
import cypressMixin from "../mixins/cypress-mixin.js"

export default {
  name: "Button",
  components: {
    Loader,
  },
  mixins: [ cypressMixin ],
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
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
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

@media (max-width: 767.98px) {
  .bcgov-button {
    min-width: 100%;
  }
}

.bcgov-loader-show {
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
}
</style>
