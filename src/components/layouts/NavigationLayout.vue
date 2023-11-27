<template>
  <a-menu class="menu" mode="horizontal">
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

export default {
  name: 'NavigationLayout',
}

</script>