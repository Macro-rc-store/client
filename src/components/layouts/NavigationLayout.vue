<template>
  <a-menu class="menu" mode="horizontal" :selectedKeys="[selectedKey]">
    <a-menu-item key="HomePage">
      <router-link to="/"> <a-icon type="home" /> Trang chủ </router-link>
    </a-menu-item>

    <a-sub-menu v-if="isUser()">
      <span slot="title" class="submenu-title-wrapper"><a-icon type="appstore" /> Bảng giá dịch vụ </span>
      <a-menu-item key="MailList">
        <router-link to="/services/mail">
          <a-icon type="mail" /> Mail
        </router-link>
      </a-menu-item>
    </a-sub-menu>

    <a-sub-menu class="user-dropdown">
      <span slot="title" class="submenu-title-wrapper">
        <a-icon type="user" />{{ username || 'Guest' }}
      </span>
      <a-menu-item v-if="isUser()" key="UserDashboard">
        <router-link to="/user-dashboard/profile">
          <a-icon type="idcard" /> Xem tài khoản
        </router-link>
      </a-menu-item>
      <a-menu-item v-if="username" @click="logout">
        <a-icon type="logout" /> Đăng xuất
      </a-menu-item>
      <a-menu-item v-if="!username" key="LoginPage">
        <router-link to="/auth/login">
          <a-icon type="login" /> Đăng nhập
        </router-link>
      </a-menu-item>
      <a-menu-item v-if="!username" key="RegisterPage">
        <router-link to="/auth/register">
          <a-icon type="user-add" /> Đăng ký
        </router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 0 25px !important;
}

.user-dropdown {
  float: right;
  margin-left: auto;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'NavigationLayout',

  computed: {
    ...mapGetters("auth", {
      username: "getUsername",
      role: "getRole"
    }),

    selectedKey() {
      return this.$route.name;
    }
  },

  methods: {
    ...mapActions("auth", {
      removeSession: "removeSession"
    }),

    isUser() {
      return (this.role === "user") ? true : false
    },

    isAdmin() {
      return (this.role === "admin") ? true : false
    },

    logout() {
      this.removeSession();
      this.$message.success("Logout success!");
      this.$router.push({name: "LoginPage"});
    }
  }
}

</script>