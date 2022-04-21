<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-dark" aria-label="Header">
      <div class="container">
        <div>
          <div class="logo-container mr-3 d-inline-block align-middle">
            <a href="https://gov.bc.ca"
              target="_blank">
              <img
                alt="BC Logo"
                class="print-hide"
                classNames="img-fluid d-none d-md-block pointer"
                :width="181"
                :src="bcgovMainLogo"
              />
              <img
                alt="BC Logo"
                class="print-mainlogo"
                classNames="img-fluid d-none d-md-block pointer"
                :width="160"
                :height="52"
                :src="bcgovPrintLogo"
              />
            </a>
            
          </div>
          <div class="title-container align-middle">
            <div class="navbar-brand mr-0">
              {{ title }}
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
const MAIN_LOGO_FILENAME = 'bcgov-logo-text.svg';
const PRINT_LOGO_FILENAME = 'bcgov-logo.png';

export default {
  name: "HeaderComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      bcgovMainLogo: null,
      bcgovPrintLogo: null
    }
  },
  created() {
    this.bcgovMainLogo = this.imagePath + MAIN_LOGO_FILENAME;
    this.bcgovPrintLogo = this.imagePath + PRINT_LOGO_FILENAME;
  }
}
</script>

<style scoped>
.navbar {
  min-height: 65px;
}
.navbar > .container-fluid {
  width: 95%;
  justify-content: inherit;
}
.navbar-brand {
  white-space: pre-line;
}
.pointer {
  cursor: pointer;
}
.logo-container {
  width: 181px;
  height: 44px;
}
.print-mainlogo {
  display: none;
}
@media (max-width: 767.98px) {
  .logo-container {
    width: 64px;
    height: 44px;
  }
}
@media print {
  .print-hide {
    display: none !important;
  }
  .navbar {
    display: block;
  }
  .print-mainlogo {
    display: inline-block;
  }
  .navbar-dark .navbar-brand {
    color: #000;
  }
}

@media (min-width: 768px) {
    .title-container {
        display: inline-block !important;
    }
}
</style>
