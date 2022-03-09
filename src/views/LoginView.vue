<template>
  <div class="container mt-5">
    <form class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            v-model="user.password"
            required
          />
        </div>
        <div class="text-end mt-4">
          <button
            class="btn btn-lg btn-primary btn-block"
            type="button"
            @click="login"
          >
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
</style>

<script>
import { inject, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const axios = inject('$axios');
    const router = useRouter();
    const isLoading = ref(false);
    const user = reactive({
      username: "",
      password: "",
    });

    function login() {
      const apiUrl = `${process.env.VUE_APP_API}v2/admin/signin`;
      axios
        .post(apiUrl, user)
        .then((response) => {
          const { expired, token } = response.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;          
          router.push('/admin/products');
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    }

    onMounted(() => {});

    return {
      user,
      isLoading,
      login,
    };
  },
};
</script>
