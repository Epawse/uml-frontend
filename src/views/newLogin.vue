<template>
  <div class="login-wrapper">
    <div class="bg-wrapper">
      <div class="left-wrapper">
        <img
          src="../assets/images/logo.png"
          style="border-radius: 10px; width: 80px; height: 80px"
        />
        <span class="title">武汉反馈可视化系统</span>
      </div>
      <div class="right-wrapper">
        <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
          <div class="login-title">欢迎登录</div>
          <el-form-item style="margin-top: 20px" prop="username">
            <el-input
              v-model="loginForm.username"
              size="large"
              style="width: 300px"
              placeholder="用户名"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 20px" prop="password">
            <el-input
              show-password
              v-model="loginForm.password"
              size="large"
              style="width: 300px"
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 30px">
            <el-button type="primary" style="width: 100%" size="large" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loading: false,
      pwdType: "password",
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginRef.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(response => {
              this.loading = false;
              let code = response.data.code;
              if (code == 200) {
                this.$router.push({
                  path: "/dashboard",
                  query: { data: response.data.data }
                });
              } else {
                this.$router.push({
                  path: "/error",
                  query: { message: response.data.message }
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // eslint-disable-next-line no-console
          console.log("参数验证不合法！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login_bg.jpg");
  background-size: cover;
  display: flex;
  flex-direction: row;
  z-index: 1;
  justify-content: center;
  align-items: center;
}

.bg-wrapper {
  width: 70%;
  height: 65%;
  z-index: 9999;
  opacity: 0.95;
  display: flex;
  flex-direction: row;
}

.left-wrapper {
  display: flex;
  flex: 1;
  background-color: #6190e8;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  color: white;
  font-size: 30px;
  margin-top: 30px;
}

.right-wrapper {
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.login-title {
  width: 300px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 40px;
}
</style>