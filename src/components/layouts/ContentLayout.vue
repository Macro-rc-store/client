<template>
  <a-layout-content style="padding: 0 25px" class="content">
    <div :style="{
      background: '#EEEEEE',
      padding: '24px',
      minHeight: '280px',
      borderRadius: '5px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px'
    }">
      <router-view></router-view>
    </div>
  </a-layout-content>
</template>
  
<style scoped>
.content {
  margin-top: 100px;
}
</style>