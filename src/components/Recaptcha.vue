<template>
  <div>
    <vue-recaptcha :sitekey="publicKey"
                  :loadRecaptchaScript="true"
                  @verify="validate"/>
    <div v-if="errorMessage"
        class="error-message mt-2 text-danger">{{errorMessage}}</div>
  </div>
</template>

<script>
import axios from 'axios';
import VueRecaptcha from 'vue-recaptcha';

const RECAPTCHA_VERIFY_URL = '/verify/captcha';
const GENERIC_ERROR_MESSAGE = 'Could not connect to recaptcha service. Please try again later.';

export default {
  name: 'Recaptcha',
  components: {
    VueRecaptcha,
  },
  props: {
    // Example: '/oop/api/recaptcha'
    apiBasePath: {
      type: String,
      required: true
    },
    nonce: {
      type: String,
      required: true
    },
    publicKey: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      isLoadingRecaptchaVerification: false,
      isInputValid: null,
      errorMessage: null,
    }
  },
  methods: {
    validate(response) {
      this.isLoadingRecaptchaVerification = true;
      this.errorMessage = null;

      axios.post(this.apiBasePath + RECAPTCHA_VERIFY_URL, {
        nonce: this.nonce,
        token: response,
      })
        .then((res) => {
          const isValid = res.data.valid;
          const token = res.data.jwt;

          this.isInputValid = isValid;
          this.isLoadingRecaptchaVerification = false;

          if (isValid) {
            this.$emit('recaptchaVerified', token);
          } else {
            this.errorMessage = GENERIC_ERROR_MESSAGE;
          }
        })
        .catch(() => {
          this.isLoadingRecaptchaVerification = false;
          this.errorMessage = GENERIC_ERROR_MESSAGE;
        });
    }
  }
}
</script>

<style scoped></style>
