# Vue Recaptcha Component
A user interface component built using the Angular web application framework designed to adapt Google Recaptcha to replace the pre-existing captcha component.

## Integration:
First install the moh-common-lib package on the command line with:  npm i common-lib-vue
Make the following changes to the component that is going to integrate the Recaptcha component (herein referred to as the host component).

### Template Section
Between the tags for the host component insert the Recaptcha tag.
#### Example:
```vue
<template>
  <div id="host">
    <Recaptcha v-if="!isRecaptchaValid"
                    :apiBasePath="recaptchaAPIBasePath"
                    :nonce="applicationUuid"
                    :publicKey="this.recaptchaPublicKey"
                    @recaptchaVerified="handleCaptchaVerified($event)" />
  </div>
</template>
```
### Script Section
Import the recaptcha component and add it to the list of components.  Also add the variables required by recaptcha to the object returned by the data function and add a handleCaptchaVerified method to the methods list.
#### Example:
```vue
<script>
import {Recaptcha} from 'common-lib-vue';
export default {
  name: 'HostComponent',
  components: {
    Recaptcha,
  },
  data: () => {
    return {
      recaptchaPublicKey: "REPLACE_WITH_PUBLIC_KEY_FROM_GOOGLE",
      recaptchaAPIBasePath: PATH_TO_RECAPTCHA_SERVICE,
      applicationUuid: GENERATED_UUID,
      isRecaptchaValid: false,
    }
  },
  methods:  {
    handleCaptchaVerified(captchaToken) {
      console.log("Verified", captchaToken);
      // this.$store.dispatch(formModule + '/' + SET_CAPTCHA_TOKEN, captchaToken); //Use the token as needed by the application
      this.isRecaptchaValid = true;
    },
  },
}
</script>
```
PATH_TO_RECAPTCHA_SERVICE is likely to be stored in the environment, but it is just the path to communicate with the recaptcha service.
REPLACE_WITH_PUBLIC_KEY_FROM_GOOGLE should be filled in with the public key provided by Google.  The private key will be used via an environment variable on the recaptcha service.
GENERATED_UUID should be the UUID used by the application.
