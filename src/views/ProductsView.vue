<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="getCurrentProduct(item.id)"
              >
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <productModal></productModal>
</template>

<script>
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Modal from 'bootstrap/js/dist/modal';
import productModal from '@/components/ProductModal.vue';

export default {
  components: {
    // productModal,
  },
  setup() {
    const store = useStore();
    const tempProduct = reactive({
      imagesUrl: [],
    });
    // const productModal = ref({});
    // const deleteModal = ref({});
    // const isBlock = computed(() => store.state.cart.isBlockItem);
    const products = computed(() => store.state.products.list);
    // const getCurrentProduct = (id) => store.dispatch('products/getProduct', id);

    // 監聽 Modal 狀態
    // const isShowModal = computed(() => store.state.products.showModal);
    // watch(isShowModal, (val) => {
    //   if (val) {
    //     productModal.value.show();
    //     store.commit('products/setShowModal', false);
    //   }
    // });

    function openModal(status) {
      if (status === "new") {
        // 清空資料
        tempProduct.imagesUrl = [];
        productModal.show();
        // this.isNew = true;
      } else if (status === "edit") {
        // 使用淺拷貝，如果有要顯示內層的圖，需要使用深拷貝
        // this.tempProduct = { ...product };
        // productModal.show();
        // this.isNew = false;
      } else if (status === "delete") {
        // this.tempProduct = { ...product };
        // delProductModal.show();
      }
    }

    onMounted(() => {
      // 取得產品列表
      store.dispatch("products/getAllProducts");

      // 初始化產品 Modal
      productModal.value = new Modal(document.getElementById('productModal'));
    });

    return {
      products,
      tempProduct,
      openModal,
      // isBlock,
      productModal,
      // deleteModal,
      // getCurrentProduct,
      // isShowModal,
    };
  },
};
</script>
