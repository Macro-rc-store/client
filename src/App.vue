<template>
  <a-layout id="components-layout" class="layout">
    <Navigation />
    <Content />
    <Footer />
    <a-back-top :visibility-height="100">
      <div class="back-top-button">
        <a-icon type="arrow-up" />
      </div>
    </a-back-top>
  </a-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import Navigation from "@/components/layouts/NavigationLayout.vue"
import Content from "@/components/layouts/ContentLayout.vue"
import Footer from "@/components/layouts/FooterLayout.vue"

export default {
  data() {
    return {
      guestPage: ["HomePage", "RegisterPage", "LoginPage", "LoginAdmin"],
      authenPage: ["RegisterPage", "LoginPage", "LoginAdmin"],
      adminPage: []
    }
  },

  name: 'CommonLayout',

  components: {
    Navigation,
    Content,
    Footer
  },

  mounted() {
    this.validateSession();
  },

  computed: {
    ...mapGetters("auth", {
      username: "getUsername"
    }),

    route() {
      return this.$route.name;
    }
  },

  methods: {
    ...mapActions("auth", {
      getProfile: "getProfile",
      removeSession: "removeSession"
    }),

    inGuestPage() {
      return this.guestPage.includes(this.$route.name);
    },
    inAuthenPage() {
      return this.authenPage.includes(this.$route.name);
    },
    inAdminPage() {
      return this.adminPage.includes(this.$route.name);
    },

    async callApi(func, onError) {
      try {
        await func();
      }
      catch(error) {
        if (onError) {
          onError();
        }

        this.$message.error(error?.response?.data?.error?.message || error?.response?.data || error?.message);
      }
    },

    async validateSession() {
      if (!this.inGuestPage()) {
        try {
          const user = await this.getProfile();
          if(this.inAdminPage() && (user.data.role != "admin")) {
            this.$message.error("Chỉ admin được truy cập!");
            this.$router.push({name: 'HomePage'});
          }
          else if(!this.inAdminPage() && (user.data.role === "admin")) {
            this.$message.error("Đang ở trang admin!");
            this.$router.push({name: 'HomePage'});
          }
        }
        catch(err) {
          if ((this.$route.name != 'LoginPage') || (this.$route.name != 'RegisterPage')) {
            this.$message.error(err?.response?.data || err.message);
          }
          this.removeSession();
          this.$router.push({name: 'LoginPage'});
        } 
      }
      else if(this.inAuthenPage()) {
        try {
          await this.getProfile();
          this.$message.info("Bạn đã đăng nhập rồi!");
          this.$router.push({name: 'HomePage'});
        }
        catch(err) {
          this.removeSession();
          return;
        }
      }
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    route(nextRoute) {
      this.validateSession();
    }
  }
}
</script>

<style>
#components-layout {
  min-height: 100%;
}

*::-webkit-scrollbar {
  width: 0.7em;
}

*::-webkit-scrollbar:horizontal {
  height: 0.7em;
}
 
*::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(252, 246, 246, 0.925);
}
 
*::-webkit-scrollbar-thumb {
  background-color: #bfbfbfcf;
}

.ant-back-top-content {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.back-top-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(24, 144, 255, 0.5);
  color: #fff;
  font-size: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s, transform 0.3s;
}

.back-top-button:hover {
  opacity: 0.8;
  transform: scale(1.2);
}

.back-top-button:active {
  opacity: 1;
  transform: scale(0.8);
}
</style>
