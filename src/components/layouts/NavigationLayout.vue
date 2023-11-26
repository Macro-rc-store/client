<template>
  <a-layout-header class="layout-header">
    <div class="logo"></div>

    <a-menu class="menu" mode="horizontal" theme="dark" :selectedKeys="[selectedKey]">
      <a-menu-item>
        <router-link to="/"> <a-icon type="home" /> Trang chủ </router-link>
      </a-menu-item>

      <a-sub-menu class="user-dropdown">
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="user" />{{ username || 'Guest' }}
        </span>
        <a-menu-item v-if="username" key="LoginPage">
          <a-icon type="logout" /> Đăng xuất
        </a-menu-item>
        <a-menu-item v-if="!username" key="LoginPage">
          <router-link to="/auth/login">
            <a-icon type="login" /> Đăng nhập
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-header>
</template>

<style scoped>
.layout-header {
  position: fixed;
  z-index: 1;
  width: 100vw;
  padding: 0 25px !important;
}

.menu {
  line-height: 60px;
}

.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.user-dropdown {
  float: right;
  margin-left: auto;
}
</style>

<script>

export default {
  name: 'NavigationLayout',
  data() {
    return {
      theme: 'light'
    }
  }
}

</script>