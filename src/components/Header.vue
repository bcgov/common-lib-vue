<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-dark" aria-label="Header">
      <div class="container">
        <div>
          <div class="logo-container mr-3 d-inline-block align-middle">
            <a href="https://gov.bc.ca"
              target="_blank">
              <img
                class="img-fluid print-hide d-none d-md-block pointer"
                :src="bcgovLogoText"
                width="181"
                height="44"
                alt="B.C. Government Logo"
                role="img"
              />
              <img
                class="img-fluid print-hide d-md-none pointer"
                :src="bcgovLogo"
                width="64"
                height="44"
                alt="B.C. Government Logo"
                role="img"
              />
              <img
                class="img-fluid print-logo"
                :src="bcgovLogoPrint"
                width="236"
                height="62"
                alt="B.C. Government Logo - Print"
                role="img"
              />
            </a>
            
          </div>
          <div class="title-container d-inline-block align-middle">
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
        bcgovLogo: `/images/bcgov-logo.svg`,
        bcgovLogoText: `/images/bcgov-logo-text.svg`,
        bcgovLogoPrint: `/images/bcgov-logo-print.png`,
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
.print-logo {
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
  .print-logo {
    display: inline-block;
  }
  .navbar-dark .navbar-brand {
    color: #000;
  }
}
</style>