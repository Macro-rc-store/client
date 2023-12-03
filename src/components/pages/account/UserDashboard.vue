<template>
  <a-layout>

    <a-layout-sider>
      <a-menu 
        class="menu" mode="inline" 
        :selectedKeys="[selectedKey]" 
        :style="{ height: '100%', borderRight: 0 }">

        <a-menu-item>
          <router-link to="/user-dashboard/">
            <a-icon type="profile" /> Profile
          </router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/user-dashboard/recharge">
            <a-icon type="credit-card" /> Nạp tiền
          </router-link>
        </a-menu-item>
        <a-menu-item>
          <router-link to="/user-dashboard/payment-history">
            <a-icon type="transaction" /> Lịch sử giao dịch
          </router-link>
        </a-menu-item>
        <a-menu-item key="ChangePasswordPage">
          <router-link to="/user-dashboard/change-password">
            <a-icon type="edit" /> Đổi mật khẩu
          </router-link>
        </a-menu-item>
        <a-menu-item class="user-dropdown" @click="logout">
          <a-icon type="logout" /> Đăng xuất
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '200px' }">
      <router-view></router-view>
    </a-layout-content>
    
  </a-layout>
</template>

<style></style>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    selectedKey() {
      return this.$route.name;
    }
  },

  methods: {
    ...mapActions("auth", {
      removeSession: "removeSession"
    }),

    logout() {
      this.removeSession();
      this.$message.success("Logout success!");
      this.$router.push({ name: "LoginPage" });
    }
  }
}
</script>
