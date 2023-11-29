<template>
  <a-card title="Đăng ký" class="root-card">
    <a-form-model layout="horizontal" class="centered-form">
      <a-form-model-item>
        <a-auto-complete v-model="registerCredentials.email" :data-source="dataSource" @change="handleChangeText">
          <a-input placeholder="Email">
            <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-auto-complete>
      </a-form-model-item>
      <a-form-model-item>
        <a-input placeholder="Username" v-model="registerCredentials.username">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input type="password" placeholder="Password" v-model="registerCredentials.password">
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
        <a-button type="primary" @click="handleRegister" :loading="registerLoading" style="font-size: larger;"> Đăng ký </a-button>
      </a-form-model-item>
      <a-form-model-item class="centered-btn">
        Đã có tài khoản?  
        <router-link to="/auth/login" style="font-size: larger;"> Đăng nhập </router-link>
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
import { mapActions } from 'vuex';
import GoogleRecaptcha from './GoogleRecaptcha.vue';

export default {
  components: {
    GoogleRecaptcha
  },
  data() {
    return {
      dataSource: [],
      registerCredentials: {
        email: undefined,
        username: undefined,
        password: undefined,
        responseRecaptcha: {}
      },
      registerLoading: false
    }
  },
  methods: {
    ...mapActions("auth", {
      register: "register"
    }),
    verifyReCaptcha(response) {
      this.registerCredentials.responseRecaptcha = response;
    },

    expiredReCaptcha(response) {
      this.registerCredentials.responseRecaptcha = response;
      this.$message.error("reCaptcha has expired. Please verify again!");
    },

    errorRecaptcha(response) {
      this.registerCredentials.responseRecaptcha = response;
      this.$message.error("reCaptcha has error. Please come back later!");
    },

    handleChangeText(value) {
      this.dataSource = (!value || value.indexOf('@') >= 0) ? [] : [`${value}@gmail.com`];
    },

    async handleRegister() {
      this.registerLoading = true;

      try {
        await this.register(this.registerCredentials);
        this.$message.success("Register account success!");
        this.$router.push({name: 'LoginPage'});
      } catch (error) {
        this.$message.error(error?.response?.data?.error?.message || error?.response?.data || error.message);
      }

      this.registerLoading = false;
    },
  }
}
</script>
  