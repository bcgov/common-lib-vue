<template>
  <footer>
    <nav role="presentation">
      <div class="container">
        <div class="row align-items-end m-0 print-hide">
          <div class="col-md-11 pl-0">
            <ul class="footer-links py-2">
              <li class="d-md-inline-block m-1 px-md-3 py-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/disclaimer" target="_blank">Disclaimer</a>
              </li>
              <li class="d-md-inline-block m-1 px-md-3 py-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/privacy" target="_blank">Privacy</a>
              </li>
              <li class="d-md-inline-block m-1 px-md-3 py-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/accessibility" target="_blank">Accessibility</a>
              </li>
              <li class="d-md-inline-block m-1 px-md-3 py-1">
                <a href="https://www2.gov.bc.ca/gov/content/home/copyright" target="_blank">Copyright</a>
              </li>
              <li class="d-md-inline-block m-1 px-md-3 py-1">
                <a href="http://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents-contact-us" target="_blank">Contact Us</a>
              </li>
            </ul>
          </div>
          <div class="col-md-1 text-right">
            <span v-if="version"
                  class="text-right version">v{{version}}</span>
          </div>
        </div>
      </div>
    </nav>
  </footer>
</template>

<script>
  export default {
    name: "Footer",
    props: {
      version: {
        type: String,
      }
    }
  }
</script>

<style scoped>
.footer-links {
  margin: 0;
  padding: 0;
}
@media (min-width: 767.98px) {
  .footer-links li {
    border-right: thin solid #4b5e73;
  }
  .footer-links li:last-child {
    border-right: none;
  }
}
.version {
  font-size: 0.75rem;
  color: white;
}
a, a:visited, a:focus {
  color: white;
  text-decoration: none;
}
a:focus {
  outline: none;
  border: 3px solid #fcba19;
}
a:hover {
  text-decoration: underline;
}
ul {
  list-style: none;
}
@media print {
  .print-hide {
    display: none;
  }
  a, a:visited {
    color: #000;
  }
}
</style>
