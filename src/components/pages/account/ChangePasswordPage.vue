<template>
  <a-card title="Đổi mật khẩu" class="root-card">
    <a-form-model layout="horizontal" class="centered-form">
      <a-form-model-item>
        <a-input type="password" placeholder="Current password" v-model="verification.currentPassword">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input type="password" placeholder="New Password" v-model="verification.newPassword">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input type="password" placeholder="Confirm password" v-model="verification.confirmPassword">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item class="centered-btn">
        <a-button type="primary" @click="handleChangePassword" :loading="changePassLoading">Đổi mật khẩu</a-button>
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
  margin-bottom: 15px !important;
}
</style>
      
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      verification: {
        currentPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined,
      },
      changePassLoading: false,
    }
  },
  methods: {
    ...mapActions("account", {
      changePassword: "changePassword",
    }),

    async handleChangePassword() {
      this.changePassLoading = true;
      try {
        const { message } = await this.changePassword(this.verification);
        this.$message.success(message);
        this.$router.push({ name: 'Home' });
      }
      catch (error) {
        console.log(this.verification);
        this.$message.error(error?.response?.data?.error?.message || error?.response?.data || error.message);
      }
      this.changePassLoading = false;
    },
  }
}
</script>
      