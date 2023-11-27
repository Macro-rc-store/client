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
          status: undefined
        }
      }
    },

    methods: {
      emitVerify(response) {
        this.response.token = response;
        this.response.status = 'success'

        this.$emit('verify', this.response);
      },

      emitExpired() {
        this.response.token = undefined;
        this.response.status = 'expired'

        this.$emit('expired', this.response);
      },

      emitError() {
        this.response.token = undefined;
        this.response.status = 'error'

        this.$emit('error', this.response);
      }
    }
  }
</script>