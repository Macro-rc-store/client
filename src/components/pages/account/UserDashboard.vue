<template>
  <div>
    <a-menu class="menu" mode="horizontal" :selectedKeys="[selectedKey]">
      <a-menu-item>
        <router-link to="/profile"> 
          <a-icon type="home" /> Profile 
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/profile"> 
          <a-icon type="home" /> Nạp tiền 
        </router-link>
      </a-menu-item>
      <a-menu-item>
        <router-link to="/profile"> 
          <a-icon type="home" /> Lịch sử giao dịch 
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
    <div><router-view></router-view></div>
  </div>
</template>

<style>
.user-dropdown {
  float: right;
  margin-left: auto;
}
</style>

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
      this.$router.push({name: "LoginPage"});
    }
  }
}
</script>
