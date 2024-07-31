<template>
  <div :class="className">
    <fieldset>
      <legend class="date--legend">
        {{ label }}<span v-if="isRequiredAsteriskShown" class="required-asterisk">*</span>
      </legend>
      <div class="date-row">
        <label :for="id + '-month'">Month:</label>
        <select
          :id="id + '-month'"
          v-model="month"
          class="form-control monthSelect field"
          :disabled="disabled"
          :aria-required="required"
          :required="required"
          @blur="onBlurMonth($event)"
        >
          <!-- We show the blank option so the user can clear out their data.-->
          <option :value="null">Month</option>
          <option
            v-for="(month, index) in monthList"
            :key="index"
            :data-cy="getCypressValue('Month' + index)"
            :value="index"
          >
            {{ month }}
          </option>
        </select>

        <label :for="id + '-day'">Day:</label>
        <input
          :id="id + '-day'"
          v-model="day"
          class="form-control dayInput field"
          placeholder="DD"
          :data-cy="getCypressValue('Day')"
          :disabled="disabled"
          :required="required"
          :aria-required="required"
          maxlength="2"
          @blur="onBlurDay($event)"
          @keypress="isNumber($event)"
        />

        <label :for="id + '-year'">Year:</label>
        <input
          :id="id + '-year'"
          v-model="year"
          class="form-control yearInput field"
          placeholder="YYYY"
          :data-cy="getCypressValue('Year')"
          :disabled="disabled"
          :required="required"
          :aria-required="required"
          maxlength="4"
          @blur="onBlurYear($event)"
          @keypress="isNumber($event)"
        />
        <div
          class="date-picker-icon"
          :data-cy="getCypressValue('CalendarIcon')"
          @click="openCloseDatePicker($event)"
        >
          <IconCalendar />
        </div>
        <div ref="datePicker" class="date-picker-container">
          <div class="date-picker">
            <DatePicker
              v-if="isDatePickerOpen"
              v-model="datePickerDate"
              :cypress-id="cypressId"
              @dateSelected="handleDateSelected()"
            />
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
import cypressMixin from "../mixins/cypress-mixin.js";
import blurMixin from "../mixins/blur-mixin";
import IconCalendar from "./icons/IconCalendar.vue";
import {
  startOfDay,
  addYears,
  subYears,
  startOfToday,
  isAfter,
  isBefore,
  getDaysInMonth,
  isSameDay,
} from "date-fns";

const MAX_YEAR_RANGE = 150;

export const distantFutureValidator = (date) => {
  const distantFuture = addYears(startOfToday(), MAX_YEAR_RANGE);
  return isSameDay(date, distantFuture) || isBefore(date, distantFuture);
};

export const distantPastValidator = (date) => {
  const distantPast = subYears(startOfToday(), MAX_YEAR_RANGE);
  return isSameDay(date, distantPast) || isAfter(date, distantPast);
};

export const beforeDateValidator = (compareDateName) => {
  return (date, vm) => {
    const dateToCompare = vm[compareDateName];
    return dateToCompare == null || isSameDay(date, dateToCompare) == true
      ? true
      : isBefore(date, dateToCompare);
  };
};

export const futureDateValidator = (value) => {
  const dateToday = startOfToday();
  return value && isAfter(value, dateToday);
};

export const pastDateValidator = (value) => {
  const dateToday = startOfToday();
  return value && isBefore(value, dateToday);
};

export const afterDateValidator = (compareDateName) => {
  return (date, vm) => {
    const dateToCompare = vm[compareDateName];
    return dateToCompare == null || isSameDay(date, dateToCompare) == true
      ? true
      : isAfter(date, dateToCompare);
  };
};

export default {
  name: "DateInput",
  components: {
    DatePicker,
    IconCalendar,
  },
  mixins: [blurMixin, cypressMixin],
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Date,
    },
    id: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "Date",
    },
    isRequiredAsteriskShown: {
      type: Boolean,
      default: false,
    },
    watchForModelChange: {
      type: Boolean,
      default: false,
    },
    useInvalidState: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["processDate", "update:modelValue", "input"],
  data() {
    return {
      date: null,
      month: null,
      day: null,
      year: null,
      monthList: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      isDatePickerOpen: false,
      datePickerDate: null,
    };
  },
  watch: {
    modelValue(newValue) {
      if (this.watchForModelChange) {
        if (newValue instanceof Date && !isNaN(newValue)) {
          this.day = newValue.getDate().toString();
          this.month = newValue.getMonth();
          this.year = newValue.getFullYear().toString();
          this.datePickerDate = newValue;
        } else if (newValue === null) {
          this.day = null;
          this.month = null;
          this.year = null;
          this.datePickerDate = null;
        }
      }
    },
    datePickerDate(newDate) {
      this.date = newDate;

      if (this.date instanceof Date && !isNaN(this.date)) {
        this.day = this.date.getDate().toString();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear().toString();
      }
      this.$emit("input", this.date);
      this.$emit("update:modelValue", this.date);
      this.$emit("processDate", {
        date: this.date,
        month: this.month,
        day: this.day,
        year: this.year,
      });
    },
  },
  created() {
    if (this.modelValue instanceof Date && !isNaN(this.modelValue)) {
      this.day = this.modelValue.getDate().toString();
      this.month = this.modelValue.getMonth();
      this.year = this.modelValue.getFullYear().toString();
      this.datePickerDate = this.modelValue;
    }
  },
  mounted() {
    window.addEventListener("close-date-picker", this.closeDatePicker);
    window.addEventListener("click", this.closeDatePicker);
    this.$refs.datePicker.addEventListener("click", this.stopPropagation);
  },
  beforeUnmount() {
    window.removeEventListener("close-date-picker", this.closeDatePicker);
    window.removeEventListener("click", this.closeDatePicker);
    this.$refs.datePicker.removeEventListener("click", this.stopPropagation);
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    processDate() {
      if (this.canCreateDate()) {
        const year = this.getNumericValue(this.year);
        const month = this.month;
        const day = this.getNumericValue(this.day);

        // Date function appears to use setYear() so any year 0-99 results in year 1900 to 1999
        // Set each field individually, use setFullYear() instead of setYear()
        // Set time on date to 00:00:00 for comparing later
        this.date = startOfDay(new Date(year, month, day));
        this.date.setFullYear(year);
      } else {
        // Trigger validator for emptying fields use case. This is to remove the 'Invalid date' error.
        if (this.date || (!this.year && !this.day && !this.month)) {
          if (this.useInvalidState) {
            this.date = new Date(NaN);
          } else {
            this.date = null;
          }
        }
      }
      this.datePickerDate = this.date;
      this.$emit("input", this.date);
      this.$emit("update:modelValue", this.date);
      this.$emit("processDate", {
        date: this.date,
        month: this.month,
        day: this.day,
        year: this.year,
      });
    },
    canCreateDate() {
      // special because "0" is valid (Jan)
      const isMonthValid = typeof this.month === "number";

      const day = parseInt(this.day);
      // If the user puts '0' as the day, return invalid
      if (day === 0 || !isMonthValid) {
        return false;
      }
      const daysInMonth = getDaysInMonth(new Date(this.year, this.month, 2));
      const isDateValid = day <= daysInMonth;
      if (!!this.year && !!this.day && isMonthValid && isDateValid) {
        return true;
      }
      return false;
    },
    getNumericValue(value) {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? null : parsed;
    },
    onBlurDay(event) {
      const value = event.target.value;
      this.day = value;
      this.processDate();
      this.handleBlur(event);
    },
    onBlurYear(event) {
      const value = event.target.value;
      this.year = value;
      this.processDate();
      this.handleBlur(event);
    },
    onBlurMonth(event) {
      const value = parseInt(event.target.value);
      this.month = isNaN(value) ? null : value;
      this.processDate();
      this.handleBlur(event);
    },
    openCloseDatePicker(event) {
      event.stopPropagation();
      if (this.isDatePickerOpen) {
        this.closeDatePicker();
      } else {
        let closeEvent;
        if (typeof Event === "function") {
          closeEvent = new Event("close-date-picker");
        } else {
          // For IE event dispatching.
          closeEvent = document.createEvent("Event");
          closeEvent.initEvent("close-date-picker", true, true);
        }
        // Close existing date pickers.
        window.dispatchEvent(closeEvent);

        if (!this.disabled) {
          // Open component date picker.
          this.isDatePickerOpen = true;
        }
      }
    },
    handleDateSelected() {
      this.closeDatePicker();
      this.handleBlur();
    },
    closeDatePicker() {
      this.isDatePickerOpen = false;
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
legend {
  font-size: 1rem;
}
.date-row {
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
.monthSelect {
  width: 160px;
  max-width: auto;
  margin-right: 1em;
}
.dayInput {
  width: 50px;
  margin-right: 1em;
}
.yearInput {
  width: 65px;
  margin-right: 1em;
}
.date-picker-icon {
  width: 32px;
  height: 39px;
  font-size: 26px;
  cursor: pointer;
}
.date-picker-container {
  position: relative;
}
.date-picker {
  position: absolute;
  top: 18px;
  right: 0;
  z-index: 1;
}
</style>
