<template>
  <nav v-if="isCurrentPathInSteps" class="progress-bar-component">
    <div
      ref="horizontalStepperVisibleContainer"
      :class="`horizontal-stepper-visible-container ${isSmoothScrollEnabled ? 'smooth-scroll' : ''}`"
    >
      <div class="horizontal-stepper-container" :style="horizontalStepperStyles">
        <div class="progress-bar-container">
          <div class="progress-bar" :style="progressBarStyles" />
        </div>
        <div class="step-container">
          <div v-for="(route, index) in routes" :key="route.path">
            <div
              class="step"
              :class="{
                'step-selected': index + 1 === currentStepNumber,
                'step-passed': index + 1 < currentStepNumber,
              }"
            >
              <div
                class="step-text"
                :class="{ 'v-step-text-selected': index + 1 === currentStepNumber }"
              >
                <DynamicTagWrapper
                  :tag="isStepClickable(route.path) ? 'a' : 'span'"
                  href="javascript:void(0);"
                  :data-cy="getCypressValue(index)"
                  :role="isStepClickable(route.path) ? null : 'link'"
                  :tabindex="isStepClickable(route.path) ? null : '0'"
                  :disabled="isStepClickable(route.path) ? null : 'disabled'"
                  :aria-disabled="isStepClickable(route.path) ? null : 'true'"
                  @click="handleClickLink(route.path)"
                >
                  {{ route.title }}
                </DynamicTagWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ hide: hideMobileStep }" class="mobile-step-container border-bottom">
      <div>Step {{ currentStepNumber }}/{{ routes.length }} - {{ currentStepTitle }}</div>
      <div class="chevron-container" @click="openDropdown">
        <IconChevronDown class="chevron-icon" />
      </div>
    </div>
    <div :class="{ hide: hideMobileProgress }" class="mobile-progress-bar-container border-bottom">
      <div class="v-progress-bar-container">
        <div class="v-progress-bar" :style="verticalProgressBarStyles" />
      </div>
      <div>
        <a
          v-for="(route, index) in routes"
          :key="route.path"
          href="javascript:void(0);"
          @click="handleClickLink(route.path)"
        >
          <div
            class="v-step"
            :class="{
              'v-step-selected': index + 1 === currentStepNumber,
              'v-step-passed': index + 1 < currentStepNumber,
            }"
          >
            <div
              class="v-step-text"
              :class="{ 'v-step-text-selected': index + 1 === currentStepNumber }"
            >
              {{ route.title }}
            </div>
          </div>
        </a>
      </div>
      <div class="chevron-container" @click="closeDropdown">
        <IconChevronUp class="chevron-icon" />
      </div>
    </div>
  </nav>
</template>

<script>
import cypressMixin from "../mixins/cypress-mixin.js";
import IconChevronDown from "./icons/IconChevronDown.vue";
import IconChevronUp from "./icons/IconChevronUp.vue";
import DynamicTagWrapper from "./DynamicTagWrapper.vue";

export default {
  name: "PageStepper",
  components: {
    DynamicTagWrapper,
    IconChevronDown,
    IconChevronUp,
  },
  mixins: [cypressMixin],
  props: {
    currentPath: {
      type: String,
    },
    routes: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isMobileStepperOpen: {
      type: Boolean,
      default: false,
    },
    minStepLabelWidth: {
      type: Number,
      default: 100,
    },
    isSmoothScrollEnabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hideMobileStep() {
      return this.isMobileStepperOpen;
    },
    hideMobileProgress() {
      return !this.isMobileStepperOpen;
    },
    progressBarStyles() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      return {
        width: (100 / this.routes.length) * index + 100 / this.routes.length / 2 + "%",
      };
    },
    verticalProgressBarStyles() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      return {
        height: (index / (this.routes.length - 1)) * 100 + "%",
      };
    },
    currentStepNumber() {
      const index = this.routes.findIndex((element) => {
        return element.path.includes(this.currentPath);
      });
      return index + 1;
    },
    currentStepTitle() {
      const index = this.routes.findIndex((element) => {
        return element.path.includes(this.currentPath);
      });
      return this.routes[index].title;
    },
    isCurrentPathInSteps() {
      const index = this.routes.findIndex((element) => {
        return element.path === this.currentPath;
      });
      return index > -1;
    },
    horizontalStepperStyles() {
      const minWidth = this.minStepLabelWidth * this.routes.length + "px";
      return {
        minWidth,
      };
    },
  },
  watch: {
    currentPath(newValue) {
      const routeIndex = this.routes.findIndex((route) => route.path === newValue);
      if (this.isCurrentPathInSteps) {
        this.scrollToStep(routeIndex);
      }
    },
  },
  mounted() {
    const routeIndex = this.routes.findIndex((route) => route.path === this.currentPath);
    if (this.isCurrentPathInSteps) {
      this.scrollToStep(routeIndex);
    }
  },
  methods: {
    handleClickLink(path) {
      if (this.isStepClickable(path)) {
        this.$emit("onClickLink", path);
      }
    },
    openDropdown() {
      this.$emit("toggleShowMobileDetails", true);
    },
    closeDropdown() {
      this.$emit("toggleShowMobileDetails", false);
    },
    isStepClickable(path) {
      const route = this.routes.find((item) => item.path === path);
      if (route && route.isClickable === false) {
        return false;
      }
      return this.isPastPath(path);
    },
    isPastPath(path) {
      for (let i = 0; i < this.routes.length; i++) {
        if (this.routes[i].path === this.currentPath) {
          return false;
        } else if (this.routes[i].path === path) {
          return true;
        }
      }
      return false;
    },
    scrollToStep(index) {
      const container = this.$refs.horizontalStepperVisibleContainer;
      const xPosition = this.minStepLabelWidth * index + this.minStepLabelWidth / 2;
      if (container) {
        container.scrollLeft = xPosition - container.clientWidth / 2;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.progress-bar-component {
  flex: 1;
  padding: 2em 0 0 0;
  min-height: 65px;
}
.horizontal-stepper-visible-container {
  overflow-x: auto;
  min-height: 60px;
  transform: translateY(-6px);
}
.smooth-scroll {
  scroll-behavior: smooth;
}
.horizontal-stepper-container {
  padding-top: 6px;
}
.progress-bar-container {
  background-color: #adb5bd;
  border-radius: 0.25rem;
  transform: translateY(-2px);
  height: 0.5rem;
}
.progress-bar {
  height: 100%;
  border-radius: 0.25rem;
  background: #036;
}
.step-container {
  display: flex;
  justify-content: space-around;
}
.step {
  position: relative;
  -webkit-transform: translateX(-0.5em);
  transform: translateX(-0.5em);
  margin-top: 2px;
}
.step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  color: #000;
  border: 2px solid #606060;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: 100%;
}
.step-selected:before {
  border: 2px solid #036;
}
.step-passed:before {
  border: 2px solid #036;
  background: #036;
}
.step-text {
  position: absolute;
  -webkit-transform: translateX(-37%);
  transform: translateX(-37%);
  white-space: nowrap;
  color: #000;
  background: #fff;
  font-weight: normal;
  font-size: 13.33px;
}
.step-text a {
  color: #000;
  text-decoration: none;
}
.step-text-selected {
  font-weight: bold;
}
.mobile-progress-bar-container {
  display: none;
  font-weight: bold;
  position: relative;
}
.mobile-step-container {
  display: none;
  font-weight: bold;
  padding: 16px 16px 0 16px;
}
@media only screen and (max-width: 480px) {
  .horizontal-stepper-visible-container {
    display: none;
  }
  .progress-bar-component {
    padding: 0;
  }
  .progress-bar-container,
  .step-container {
    display: none;
  }
  .mobile-step-container {
    display: block;
    font-size: 13.33px;
  }
  .mobile-progress-bar-container {
    display: block;
  }
}

.hide {
  display: none;
}

.chevron-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 16px 0;
}
.chevron-icon {
  width: 16px;
  height: 16px;
}
.v-step {
  position: relative;
  margin-top: 10px;
  height: 30px;
}
.v-step:before {
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: #fff;
  color: #000;
  border: 2px solid #606060;
  left: 0;
  margin: 13px auto auto 16px;
}
.v-step-selected:before {
  border: 2px solid #036;
}
.v-step-passed:before {
  border: 2px solid #036;
  background: #036;
}
.v-step-text {
  position: absolute;
  -webkit-transform: translateY(10px);
  transform: translateY(10px);
  white-space: nowrap;
  color: #000;
  font-weight: normal;
  font-size: 13.33px;
  margin-left: 48px;
}
.v-step-text-selected {
  font-weight: bold;
}
.v-progress-bar-container {
  background-color: #606060;
  width: 0.25rem;
  border-radius: 0.25rem;
  position: absolute;
  height: 100%;
  height: calc(
    100% - 30px - 32px
  ); /* - top/bottom progress bar padding - top/bottom chevron padding */
  margin-top: 13px;
  left: 22px;
}
.v-progress-bar {
  width: 100%;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  background-color: #036;
  transition: height 0.6s ease;
}
</style>
