<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="16">
        <a-card class="root-card" title="TIN TỨC" :bordered="false">
          <a-empty />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card class="root-card" title="THÔNG BÁO" :bordered="false">
          <a-empty :image="simpleImage" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue';

export default {
  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },
};
</script>

<style scoped>

.root-card > .ant-card-head {
  background: #fafafa;
}

</style>
