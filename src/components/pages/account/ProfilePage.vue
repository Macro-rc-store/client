<template>
  <div>
    <a-col class="user-info" :span="12">
      <a-statistic title="Tên tài khoản" :value="username" style="margin-bottom: 5%;" />
      <a-statistic title="Email" :value="email" />
    </a-col>

    <a-col class="balance" :span="12">
      <a-statistic title="Số dư tài khoản" :value="balance" suffix="đ" />
    </a-col>
  </div>
</template>

<style></style>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: undefined,
      email: undefined,
      balance: undefined
    }
  },

  mounted() {
    this.getUserInfo();
  },

  methods: {
    ...mapActions("account", {
      getInfo: "getInfo",
    }),

    async getUserInfo() {
      try {
        const { data } = await this.getInfo();
        this.username = data.username;
        this.email = data.email;
        this.balance = data.balance;
      }
      catch (error) {
        console.log(this.verification);
        this.$message.error(error?.response?.data?.error?.message || error?.response?.data || error.message);
      }
    }
  }
}
</script>