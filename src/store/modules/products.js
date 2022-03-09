import axios from "axios";

const url = `${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}`;

const store = {
  namespaced: true,
  state: {
    list: [], // 產品列表
    tempList: [], // 暫存產品列表
    item: [], // 產品
    pagination: [], // 分頁
    showModal: false,
  },
  actions: {
    // 取得產品列表
    async getAllProducts({ commit }) {
      await axios
        .get(`${url}/products/all`)
        .then((res) => {
          commit("setProducts", res.data.products);
          commit("setPagination", res.data.pagination);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 取得指定產品
    async getProduct({ commit }, id) {
      await axios
        .get(`${url}/product/${id}`)
        .then((res) => {
          commit("setProduct", res.data.product);
          commit("setShowModal", true);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    // 更新產品
    //   async updateProduct() {
    //     let url = `${url}/admin/product`;
    //     let method = 'post';
    //     if(!this.isNew) {
    //         url = `${url}/admin/product/${this.tempProduct.id}`;
    //         method = 'put';
    //     }
    //     // 依照後端需求，傳入 data 物件
    //     axios[method](url, { data: this.tempProduct })
    //     .then((res) => {
    //         this.getProducts();
    //         productModal.hide();
    //     })
    //     .catch((err) => {
    //         alert(err.data.message);
    //     });
    // },
  },
  mutations: {
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setProducts(state, products) {
      state.list = products;
    },
    setProduct(state, product) {
      state.item = product;
    },
    setShowModal(state, isShow) {
      state.showModal = isShow;
    },
  },
};

export default store;
