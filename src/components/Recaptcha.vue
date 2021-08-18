<template>
  <div>
    <vue-recaptcha :sitekey="this.publicKey"
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
      console.log("responce:\n", response)

      axios.post(this.apiBasePath + RECAPTCHA_VERIFY_URL, {
        nonce: this.nonce,
        token: response,
      })
        .then((response) => {
          const isValid = response.data.valid;
          const token = response.data.jwt;

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

<style scoped>
.recaptcha-image-container {
  display: inline-block;
  border: solid thin #000;
}
.button-container {
  display: flex;
  flex-direction: column;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  justify-content: space-between;
}
.recaptcha-group-container {
  display: flex;
  flex-direction: column;
  flex-flow: wrap;
  justify-content: space-between;
  max-width: 315px;
}
#input-answer {
  max-width: 150px;
}
.svg-defs {
  display: none;
}
.recaptcha-button {
  background-color: #003366;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 5px 10px; /* changed from the default 12px 32px */
  text-align: center;
  text-decoration: none;
  font-size: 10px; /* changed from the default 18px */
  font-family: 'BCSans', 'Noto Sans', Verdana, Arial, sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  box-sizing: border-box;

  /* Added to space icons and text evenly */
  justify-content: center;
  align-items: center;
  display: flex;
}
.recaptcha-button:hover {
  text-decoration: underline;
  opacity: 0.80;
}
.recaptcha-button:focus {
  box-shadow: 0 0 0 0.2rem rgba(56,89,138,0.25);
}
.recaptcha-button:active {
  opacity: 1;
}
.play-audio-button {
  margin-bottom: 3px;
}
.icon-play,
.icon-loop {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  stroke-width: 0;
  stroke: #FFF;
  fill: #FFF;
}
.audio-spinner {
  display: inline-block;
  width: 15px;
  height: 15px;
  stroke-width: 0;
  stroke: #FFF;
  fill: #FFF;
}
.button-container > button {
  height: 28px;
}
.button-container > button > span {
  margin-left: 4px;
}
.input-answer {
  display: inline-block;
  vertical-align: middle;
}
.validation-spinner-container {
  display: inline-block;
  margin-left: 15px;
  vertical-align: middle;
}
</style>
