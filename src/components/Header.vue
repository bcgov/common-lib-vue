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
                :src="bcidLogoRev"
              />
              <img
                alt="BC Logo"
                class="print-mainlogo"
                classNames="img-fluid d-none d-md-block pointer"
                :width="160"
                :height="52"
                :src="bcidMainLogoRev"
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
  export default {
    name: "Header",
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        // bcgovLogo: `/images/bcgov-logo.svg`,
        // bcgovLogoText: `/images/bcgov-logo-text.svg`,
        // bcgovLogoPrint: `/images/bcgov-logo-print.png`,
        bcidSymbol: "/images/bcid-symbol-rev.svg",
        bcidLogoRev: "/images/bcid-logo-rev-en.svg",
        bcidMainLogoRev: "/images/bcgov-mainlogo.jpg"
      }
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
