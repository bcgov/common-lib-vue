<template>
  <div class="col-3 text-end">
    <a
      href="javascript:void(0)"
      class="print-btn"
      @click="printPage()"
    >
      <span class="print-link">Print or save as PDF</span>
      <IconPrint
        color="#1a5a96"
        class="icon"
      />
    </a>
    <div class="tip-container">
      <IconInfoCircle
        color="#1a5a96"
        class="icon ml-2"
      />
      <div class="tip">To save as a PDF, in the print window, select “Save as PDF”</div>
    </div>
  </div>
</template>

<script>
import IconInfoCircle from "./icons/IconInfoCircle.vue";
import IconPrint from "./icons/IconPrint.vue";

export default {
  name: "PrintPage",
  components: {
    IconInfoCircle,
    IconPrint,
  },
  methods: {
    printPage() {
      window.print();
    },
  },
};
</script>

<style scoped>
.tip-container {
  position: relative;
  display: inline-block;
  color: black;
}
.tip-container .tip {
  visibility: hidden;
  width: 220px;
  background-color: #f2f2f2;
  color: #606060;
  text-align: center;
  padding: 2px 4px;
  border: 2px solid #606060;
  font-weight: normal;
  font-size: 0.8em;
  right: 1em;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}
/* Show the tooltip text when you mouse over the tooltip container */
.tip-container:hover .tip {
  visibility: visible;
}
.icon {
  width: 1em;
  height: 1em;
}
.print-btn {
  text-decoration: none;
}
.print-link {
  text-decoration: none;
}
</style>
