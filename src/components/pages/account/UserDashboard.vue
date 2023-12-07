<template>
  <a-layout>

    <a-layout-sider>
      <a-menu class="menu" mode="inline" :selectedKeys="[selectedKey]" :style="{ height: '100%', borderRight: 0 }">

        <a-menu-item key="ProfilePage">
          <router-link to="/user-dashboard/profile">
            <a-icon type="profile" /> Profile
          </router-link>
        </a-menu-item>
        <a-menu-item key="RechargePage">
          <router-link to="/user-dashboard/recharge">
            <a-icon type="credit-card" /> Nạp tiền
          </router-link>
        </a-menu-item>
        <a-menu-item key="PaymentHistory">
          <router-link to="/user-dashboard/payment-history">
            <a-icon type="transaction" /> Lịch sử giao dịch
          </router-link>
        </a-menu-item>
        <a-menu-item key="ChangePasswordPage">
          <router-link to="/user-dashboard/change-password">
            <a-icon type="edit" /> Đổi mật khẩu
          </router-link>
        </a-menu-item>
        <a-menu-item>
          <a-popconfirm placement="bottomRight" title="Bạn chắc chắn muốn đăng xuất?" :visible="visiblePopConfirm" ok-text="Có" cancel-text="Không"
            @visibleChange="handleVisibleConfirm" @confirm="logout">
            <a-icon type="logout" /> Đăng xuất
          </a-popconfirm>
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
  data() {
    return {
      visiblePopConfirm: false
    }
  },
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
      this.visiblePopConfirm = false;
      this.removeSession();
      this.$message.success("Logout success!");
      this.$router.push({ name: "LoginPage" });
    },

    handleVisibleConfirm(visiblePopConfirm) {
      if (!visiblePopConfirm) {
        this.visiblePopConfirm = false;
        return;
      }
      this.visiblePopConfirm = true;
    }
  }
}
</script>
