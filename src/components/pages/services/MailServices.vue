<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <template slot="action" slot-scope="text, record">
        <a-button type="primary" @click="showBuyMailModal(record)">
          Mua
        </a-button>
      </template>
    </a-table>

    <a-modal 
      :title = "'Sản phẩm: ' + productInfor.name"
      v-model = "visibleBuyMailModal" 
      :confirm-loading = "confirmLoading"
      width = "420px"
      :maskClosable = "false"
      @cancel="handleCloseModal"
      :footer="null">

      <a-form-model layout="horizontal">
        <a-form-model-item label="Số lượng">
          <a-input-number 
            v-model="productOrder.quantity"
            :min="1"
            :max="productInfor.quantity"
            @change="paymentUpdate"
            width = "420px"
            placeholder = "Nhập số lượng"
            style="width: 100%;"/>
        </a-form-model-item>

        <a-form-model-item label="Giá tiền">
          <a-input 
            :default-value="productInfor.price"
            addon-after="VND" read-only 
            style="width: 100%;"/>
        </a-form-model-item>

        <a-form-model-item label="Thành tiền">
          <a-input 
            v-model="productOrder.payment"
            addon-after="VND" read-only 
            style="width: 100%;"/>
        </a-form-model-item>

        <a-form-model-item>
          <a-button type="primary" :disabled="disableBuyProduct" @click="buyProduct" block>
            Mua ngay!
          </a-button>
        </a-form-model-item>

      </a-form-model>
    </a-modal>
  </div>
</template>

<style></style>

<script>
const columns = [
  { title: 'Sản phẩm', dataIndex: 'name', key: 'name', width: '35%' },
  { title: 'POP3', dataIndex: 'pop3', key: 'pop3', width: '13%' },
  { title: 'Live', dataIndex: 'live', key: 'live', width: '13%' },
  { title: 'Quốc gia', dataIndex: 'country', key: 'country', width: '10%' },
  { title: 'Giá', dataIndex: 'price', key: 'price', align: 'center', width: '10%' },
  { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: 'center', width: '10%' },
  {
    title: '',
    key: 'operation',
    width: '7%',
    align: 'center',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    name: 'Hotmail',
    pop3: 'ON',
    live: '3-6 hours',
    country: 'VietNam',
    price: 50,
    quantity: 2000
  },
  {
    name: 'Outlook',
    pop3: 'ON',
    live: '12 hours',
    country: 'USA',
    price: 100,
    quantity: 1244
  }
];

export default {
  data() {
    return {
      data,
      columns,
      visibleBuyMailModal: false,
      disableBuyProduct: false,
      confirmLoading: false,

      productInfor: {
        name: undefined,
        price: undefined,        
        quantity: undefined
      },
      originalProductInfor: {},

      productOrder: {
        quantity: 1,
        payment: undefined
      },
      originalProductOrder: {}
    };
  },

  methods: {
    handleCloseModal() {
      this.visibleBuyMailModal = false;
      this.productOrder = {...this.originalProductOrder};
    },

    showBuyMailModal(product) {
      this.originalProductOrder = {...this.productOrder};
      this.productInfor.name = product.name;
      this.productInfor.quantity = Number(product.quantity);
      this.productInfor.price = Number(product.price);
      this.productOrder.payment = this.productOrder.quantity * this.productInfor.price;

      this.visibleBuyMailModal = true;
    },

    paymentUpdate() {
      if((this.productOrder.quantity>this.productInfor.quantity) || (this.productOrder.quantity<1) || (typeof this.productOrder.quantity!='number'))
        this.disableBuyProduct = true;
      else
        this.disableBuyProduct = false;

      this.productOrder.payment = this.productOrder.quantity * this.productInfor.price;
    },

    buyProduct() {
      this.confirmLoading = true;

      console.log(this.productOrder.quantity);

      this.confirmLoading = false;
    }
  }
};
</script>
