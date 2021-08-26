<template>
  <div :class='className'>
    <fieldset>
      <legend>
        {{label}}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
      </legend>
      <div class="time-row">
        <label :for="id + '-hour-select'">Hour:</label>
        <select :id="id + '-hour-select'"
                class="form-control hour-select"
                v-model="hour"
                @change="changeHourHandler($event)"
                :disabled='disabled'>
          <!-- We show the blank option so the user can clear out their data.-->
          <option :value="null">{{isHourTwoDigits ? 'HH' : 'H'}}</option>
          <option v-for="(hour, index) in hours"
                  :key="index"
                  :data-cy="cyValue('Hour'+index)"
                  :value="hour">{{hour}}</option>
        </select>

        <div class="time-colon d-flex align-items-center">:</div>

        <label :for="id + '-minute-select'">Minute:</label>
        <select :id="id + '-minute-select'"
                class="form-control minute-select"
                v-model="minute"
                @change="changeMinuteHandler($event)"
                :disabled='disabled'>
          <!-- We show the blank option so the user can clear out their data.-->
          <option :value="null">MM</option>
          <option v-for="(minute, index) in minutes"
                  :key="index"
                  :data-cy="cyValue('Minute'+index)"
                  :value="minute">{{minute}}</option>
        </select>
      </div>
    </fieldset>
  </div>
</template>

<script>
import { cyValueMixin } from "../mixins/cypress-mixin.js"
export default {
  name: 'TimeInput',
  mixins: [ cyValueMixin ],
  props: {
    value: {
      type: Object,
    },
    id: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    isHourTwoDigits: {
      type: Boolean,
      default: false
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false
    },
    cypressId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      hour: null,
      minute: null,
      hours: [],
      minutes: [],
    }
  },
  created() {
    if (this.value) {
      this.hour = this.value.hour;
      this.minute = this.value.minute;

      if (!this.value.time) {
        this.writeModel();
      }
    } else {
      this.writeModel();
    }

    this.createHourOptions();
    this.createMinuteOptions();
  },
  methods: {
    createHourOptions() {
      this.hours = [];
      for (let i=0; i<24; i++) {
        this.hours.push(`${this.isHourTwoDigits ? this.getDoubleDigitNumber(i) : i}`);
      }
    },
    createMinuteOptions() {
      this.minutes = [];
      for (let i=0; i<60; i++) {
        this.minutes.push(this.getDoubleDigitNumber(i));
      }
    },
    getDoubleDigitNumber(number) {
      if (number > 9) {
        return `${number}`;
      } else {
        return `0${number}`;
      }
    },
    changeHourHandler(event) {
      const value = event.target.value
      this.hour = value ? value : null;
      this.writeModel();
      this.$emit('changeHour', this.hour);
    },
    changeMinuteHandler() {
      const value = event.target.value;
      this.minute = value ? value : null;
      this.writeModel();
      this.$emit('changeMinute', this.minute);
    },
    writeModel() {
      this.$emit('input', {
        hour: this.hour,
        minute: this.minute,
        time: this.isTimeValid() ? this.getTime() : null
      });
    },
    isTimeValid() {
      const hour = parseInt(this.hour);
      const minute = parseInt(this.minute);

      if (hour >= 0
        && hour < 24
        && minute >= 0
        && minute < 60) {
        return true;
      }
      return false;
    },
    getTime() {
      return `${this.hour}:${this.minute}`;
    },
  },
  watch: {
    value(value) {
      if (value) {
        this.hour = value.hour;
        this.minute = value.minute;
      } else {
        this.hour = null;
        this.minute = null;
      }
    },
    isHourTwoDigits() {
      this.createHourOptions();
    }
  }
}
</script>

<style scoped>
legend {
  font-size: 1rem;
}
.time-row {
  display: flex;
  flex-wrap: nowrap;
}
label {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.hour-select {
  width: 90px;
  max-width: auto;
  margin-right: 5px;
}
.time-colon {
  margin-right: 5px;
  font-size: 24px;
}
.minute-select {
  width: 90px;
  max-width: auto;
}
</style>
