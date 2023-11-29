<template>
  <a-card title="Đăng nhập" class="root-card">
    <a-form-model layout="horizontal" class="centered-form">
      <a-form-model-item>
        <a-input placeholder="Username" v-model="loginCredentials.username">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input type="password" placeholder="Password" v-model="loginCredentials.password">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <google-recaptcha
          @verify="verifyReCaptcha" 
          @expired="expiredReCaptcha"
          @error="errorRecaptcha">
        </google-recaptcha>
      </a-form-model-item>
      <a-form-model-item class="centered-btn">
        <a-button type="primary" @click="handleLogin" :loading="loginLoading" style="font-size: larger;"> Đăng nhập </a-button>
      </a-form-model-item>
      <a-form-model-item class="centered-btn">
        Chưa có tài khoản? 
        <router-link to="/auth/register" style="font-size: larger;"> Đăng ký ngay! </router-link>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>
  
<style scoped>
.centered-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
}

.centered-form .ant-form-item {
  margin-bottom: 10px;
}

.centered-form .ant-row {
  width: 300px;
}

.centered-btn {
  display: flex;
  justify-content: center;
}
</style>

<script>
import { mapActions } from "vuex"
import GoogleRecaptcha from "./GoogleRecaptcha.vue";

export default {
  components: {
    GoogleRecaptcha
  },

  data() {
    return {
      loginCredentials: {
        username: undefined,
        password: undefined,
        responseRecaptcha: {}
      },
      loginLoading: false,
    }
  },

  methods: {
    ...mapActions("auth", {
      login: "login"
    }),

    verifyReCaptcha(response) {
      this.loginCredentials.responseRecaptcha = response;
    },

    expiredReCaptcha(response) {
      this.loginCredentials.responseRecaptcha = response;
      this.$message.warning("reCaptcha has expired. Please verify again!");
    },

    errorRecaptcha(response) {
      this.loginCredentials.responseRecaptcha = response;
      this.$message.error("reCaptcha has error. Please come back later!");
    },

    async handleLogin() {
      this.loginLoading = true;

      try {
        await this.login(this.loginCredentials);
        this.$message.success("Login success!");
        this.$router.push({name: 'HomePage'});
      }
      catch(error) {
        this.$message.error(error?.response?.data?.error?.message || error?.response?.data || error.message);
      }

      this.loginLoading = false;
    }
  }
}
</script>