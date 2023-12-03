<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <div id="actions">
      <a-button type="primary" @click="fetch">
        <a-icon type="reload" /> Làm mới
      </a-button>
    </div>
    <br>
    <a-card title="Service monitor" class="root-card" :loading="serviceMetricsLoading">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card title="Ram" :bordered="false">
            <span><i style="font-size: 30px">{{ (serviceMetrics.totalRam / 1073741824).toFixed(2) }}</i>gb</span>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="Ram usage" :bordered="false">
            <span><i style="font-size: 30px">{{ Math.ceil(serviceMetrics.ramUsage / 1048576) }}</i>mb</span>
            <br>
            <span><i style="font-size: 30px">{{ ((serviceMetrics.ramUsage / serviceMetrics.totalRam) *
              100).toFixed(2) }}</i>%</span>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="Free ram" :bordered="false">
            <span><i style="font-size: 30px">{{ Math.ceil(serviceMetrics.freeRam / 1048576) }}</i>mb</span>
            <br>
            <span><i style="font-size: 30px">{{ (serviceMetrics.freeRam / 1073741824).toFixed(2) }}</i>gb</span>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card title="Uptime" :bordered="false">
            <span><i style="font-size: 30px">{{ (serviceMetrics.uptime / 60).toFixed(2) }}</i>m</span>
            <br>
            <span><i style="font-size: 30px">{{ (serviceMetrics.uptime / 3600).toFixed(2) }}</i>h</span>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <br>
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

<style scoped>
.root-card>.ant-card-body {
  padding-bottom: 0px;
}

.root-card>.ant-card-head {
  background: #fafafa;
}
</style>

<script>
import { Empty } from 'ant-design-vue';
import { mapActions } from "vuex";

export default {
  name: 'HomePage',

  data() {
    return {
      serviceMetricsLoading: false,
      serviceMetrics: {
        ramUsage: 0,
        totalRam: 0,
        uptime: 0,
        freeRam: 0
      }
    }
  },

  beforeCreate() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  },

  mounted() {
    this.fetch();
  },

  methods: {
    ...mapActions('serviceActuator', {
      getMetrics: "getMetrics"
    }),

    async fetchServiceMetrics() {
      this.serviceMetricsLoading = true;
      const metrics = await this.getMetrics();

      this.serviceMetrics = {
        ramUsage: metrics.ramUsage,
        totalRam: metrics.totalRam,
        uptime: metrics.uptime,
        freeRam: metrics.freeRam
      }
      this.serviceMetricsLoading = false;
    },

    fetch() {
      this.fetchServiceMetrics();
    }
  }
};
</script>
