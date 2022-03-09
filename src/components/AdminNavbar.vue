<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand nav-link" to="/admin"
        >洋食館</router-link
      >
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/ticket"
              >優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/post">貼文</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const axios = inject("$axios");

    function checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        axios.defaults.headers.common.Authorization = token;
        const apiUrl = `${process.env.VUE_APP_API}v2/api/user/check`;
        axios
          .post(apiUrl, { api_token: token })
          .then(() => {
            
          })
          .catch((error) => {
            alert(error.response.data.message);
            router.push("/");
          });
      } else {
        alert("尚未登入");
        router.push("/");
      }
    }

    function logout() {
      document.cookie = "hexToken=;expires=;";
      alert("已清除 token");
      router.push("/");
    }

    onMounted(()=> {
      checkLogin();
    })
    return {
      logout,
    };
  },
};
</script>
