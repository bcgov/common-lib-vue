<template>
  <div :class="classes">
    <div class="row align-items-center">
      <div class="col-md-1 pr-0 text-center">
        <IconCheckCircle
          v-if="isSuccess"
          color="#2E8540"
          class="check-circle-icon"
        />
        <IconTimesCircle
          v-if="isError"
          color="#d93e45"
          class="check-circle-icon"
        />
      </div>
      <div class="col-md-10 py-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import IconCheckCircle from "./icons/IconCheckCircle.vue";
import IconTimesCircle from "./icons/IconTimesCircle.vue";

export default {
  name: "ValidationMessage",
  components: {
    IconCheckCircle,
    IconTimesCircle,
  },
  props: {
    type: {
      type: String,
      default: "success",
      validator: function (value) {
        // The value must match one of these strings
        return ["success", "error"].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    classes() {
      let result = "container box-styling ";
      if (this.type === "success") {
        result += "success-box";
      } else {
        result += "error-box";
      }
      return result;
    },
    isSuccess() {
      return this.type === "success";
    },
    isError() {
      return this.type === "error";
    },
  },
};
</script>

<style scoped>
.box-styling {
  border-radius: 10px;
  padding: 10px;
}
.success-box {
  border: 2px solid #2e8540;
  background-color: #ceebcc;
}
.error-box {
  border: 2px solid #d93e45;
  background-color: #fccece;
}
.check-circle-icon {
  width: 32px;
  height: 32px;
}
</style>
