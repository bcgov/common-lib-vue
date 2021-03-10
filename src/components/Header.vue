<template>
  <header>
    <nav class="container-fluid navbar navbar-expand-lg navbar-dark" aria-label="Header">
      <div class="container">
        <div>
          <div class="logo-container d-inline-block align-middle">
            <a href="https://gov.bc.ca"
              target="_blank">
              <img
                class="img-fluid d-none d-md-block pointer"
                :src="bcidLogoRev"
                width="181"
                height="44"
                alt="B.C. Government Logo"
                role="img"
              />
              <img
                class="img-fluid d-md-none pointer"
                :src="bcidSymbol"
                width="64"
                height="44"
                alt="B.C. Government Logo"
                role="img"
              />
            </a>
            
          </div>
          <div class="title-container d-inline-block align-middle">
            <div id="title" class="navbar-brand">
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
        bcidSymbol: `/images/bcid-symbol-rev.svg`,
        bcidLogoRev: `/images/bcid-logo-rev-en.svg`,
      }
    }
  }
</script>

<style scoped>
.navbar {
  height: 65px;
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
@media (max-width: 767.98px) {
  .logo-container {
    width: 64px;
    height: 44px;
  }
}
</style>