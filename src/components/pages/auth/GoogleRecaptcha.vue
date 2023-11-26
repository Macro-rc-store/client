<template>
  <div>
    <vue-recaptcha 
      ref="recaptcha"
      :sitekey="siteKey" 
      @verify="emitVerify"
      @expired="emitExpired"
      @error="emitError">
    </vue-recaptcha>
  </div>
</template>

<script>
  import { VueRecaptcha } from 'vue-recaptcha';

  export default {
    components: {
      VueRecaptcha
    },

    data() {
      return {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
        response: {
          token: undefined,
          success: false,
          expired: false,
          error: false
        }
      }
    },

    methods: {
      emitVerify(response) {
        this.response.token = response;
        this.response.expired = false;
        this.response.error = false;
        this.response.success = true;

        this.$emit('verify', this.response);
      },

      emitExpired() {
        this.response.token = undefined;
        this.response.expired = true;
        this.response.error = false;
        this.response.success = false;

        this.$emit('expired', this.response);
      },

      emitError() {
        this.response.token = undefined;
        this.response.expired = false;
        this.response.error = true;
        this.response.success = false;

        this.$emit('error', this.response);
      },
    }
  }
</script>