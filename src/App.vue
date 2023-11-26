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
      publicPage: ["HomePage", "Setting", "LoginPage"]
    }
  },

  name: 'App',

  components: {
    Navigation,
    Content,
    Footer
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
      removeSession: "removeSession"
    }),

    inPublicPage() {
      return this.publicPage.includes(this.$route.name);
    },

    validateSession() {
      if(!this.inPublicPage()) {
        if(!this.username) {
          this.$message.error("You are not logged in!");
          this.removeSession();
          this.$router.push({name: 'LoginPage'});
        }
      }
    },
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
