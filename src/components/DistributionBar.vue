<template>
  <div>
    <!-- Progress bar unit labels -->
    <div class="progress-labels">
      <span v-html="startingLabel"></span>
      <span v-for="(item, index) in items"
        :key="index"
        v-html="item.barLabel"></span>
    </div>
    <!-- Proress bar -->
    <div class="progress">
      <div v-for="(item, index) in items"
        :key="index"
        class="progress-bar"
        :style="getProgressStyle(item)"
        role="progressbar"
        aria-label="distribution percent"
        :aria-valuenow="widthPercent"
        aria-valuemin="0"
        aria-valuemax="100"></div>
    </div>
    <div class="legend">
      <div v-for="(item, index) in items"
        :key="index"
        class="legend-item mt-2">
        <span class="legend-item-color"
          :style="{backgroundColor: item.color}"></span>
        <span class="legend-item-label">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DistributionBar',
  props: {
    startingLabel: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    widthPercent() {
      if (this.items.length === 0) {
        return 0;
      }
      return 100 / this.items.length;
    }
  },
  methods: {
    getProgressStyle(item) {
      return {
        backgroundColor: item.color,
        width: `${this.widthPercent}%`
      };
    },
  },
};
</script>

<style scoped>
.progress-labels {
  display: flex;
  justify-content: space-between;
}
.legend-item {
  display: flex;
}
.legend-item-color {
  width: 1.2rem;
  height: 1.2rem;
  margin-top: 0.2rem;
  margin-right: .5rem;
  border-radius: 0.25rem;
}
.legend-item-label {
  flex: 1;
}
</style>
