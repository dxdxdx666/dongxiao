<template>
  <div class="forget-next">
    <van-nav-bar>
      <template #left>
        <div class="left-box">
          <div class="logo">
            <img class="auto-img" src="../assets/home_active.png" alt="" />
          </div>
          <div class="logo-text">Luckin Coffee</div>
        </div>
      </template>
      <template #right>
        <div class="home-text" @click="goPage('Home')">先逛一逛</div>
      </template>
    </van-nav-bar>
    <div class="forget-next-box">
      <div class="find-title">找回密码</div>
      <div class="find-subtitle">Find password</div>

      <div class="form-box">
        <van-form>
          <van-field
            v-model="loginUserInfo.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            autocomplete="off"
            :rules="[{ pattern, message: '请输入正确的手机号' }]"
          />

          <van-field
            v-model="loginUserInfo.password"
            :type="!isOpenLogin ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="密码"
            :right-icon="!isOpenLogin ? 'closed-eye' : 'eye-o'"
            autocomplete="off"
            @click-right-icon="toggleLoginPasssword"
          />

          <div class="hasAccount">
            <div class="hasAccount-pwd" @click="hasAccount">
              已有账号,立即登录
            </div>
          </div>

          <div class="submit-btn">
            <van-button round block color="#0C34BA" @click="retrievePassword"
              >提交</van-button
            >
          </div>
          <div class="submit-btn">
            <van-button round block type="default" @click="back"
              >返回</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetNext",
  data() {
    return {
      loginUserInfo: {
        phone: "",
        password: "",
      },
      //查看登录密码
      isOpenLogin: false,

      pattern: /^1[3456789]\d{9}$/,
    };
  },
  methods: {
    //查看首页
    goPage(name) {
      this.$router.push({ name });
    },

    hasAccount() {
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 1000);
    },

    //切换登录密码可见状态
    toggleLoginPasssword() {
      this.isOpenLogin = !this.isOpenLogin;
    },

    //找回密码接口
    retrievePassword() {
      this.axios({
        method: "post",
        url: "/retrievePassword",
        data: {
          ...this.loginUserInfo,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);
          if (result.data.code === "L001") {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }
        })
        .catch((err) => {});
    },

    //返回上一级
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.forget-next {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  .forget-next-box {
    margin-top: 80px;
    padding: 10px;
  }

  .find-title {
    font-size: 30px;
    font-weight: border;
  }
  .find-subtitle {
    font-size: 18px;
    margin-top: 20px;
    color: #999;
  }

  .hasAccount {
    margin-top: 20px;
    display: flex;
  }
  .hasAccount-pwd {
    margin-left: auto;
    font-size: 14px;
    color: #666;
  }
  .submit-btn {
    margin-top: 50px;
  }
  .form-box {
    margin-top: 50px;
    padding: 10px;
  }
  .home-text {
    color: #0c34ba;
    font-weight: bold;
    font-size: 14px;
  }
  .left-box {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
  }
  .logo-text {
    margin-left: 10px;
    font-weight: bold;
    font-size: 14px;
  }
}
</style>