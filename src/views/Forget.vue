<template>
  <div class="forget">
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
    <div class="forget-box">
      <div class="find-title">找回密码</div>
      <div class="find-subtitle">Find password</div>

      <div class="form-box">
        <van-form>
          <van-field
            v-model="value1"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            autocomplete="off"
            :rules="[{ pattern, message: '请输入正确的邮箱' }]"
          />
          <div class="code-box">
            <van-field
              v-model="value2"
              name="验证码"
              label="验证码"
              placeholder="验证码(6个字符)"
              autocomplete="off"
            />

            <div class="code-btn">
              <van-button
                class="code"
                type="info"
                size="small"
                color="#0C34BA"
                @click="clickEamil"
                >获取验证码</van-button
              >
            </div>
          </div>

          <div class="hasAccount">
            <div class="hasAccount-pwd" @click="hasAccount">
              已有账号,立即登录
            </div>
          </div>

          <div class="next-btn">
            <van-button round block color="#0C34BA" @click="nextClick"
              >下一步</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Forget",
  data() {
    return {
      value1: "",
      value2: "",
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    };
  },
  methods: {
    //查看首页
    goPage(name) {
      this.$router.push({ name });
    },

    //点击获取验证码按钮
    clickEamil() {
      this.emailValidCode(this.value1);
    },

    //点击下一步进行验证
    nextClick() {
      this.checkValidCode(this.value2);
    },
    hasAccount() {
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 1000);
    },

    //获取邮箱验证码
    emailValidCode(email) {
      this.axios({
        method: "post",
        url: "/emailValidCode",
        data: {
          email,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);
        })
        .catch((err) => {});
    },

    //验证码验证
    checkValidCode(validCode) {
      this.axios({
        method: "post",
        url: "/checkValidCode",
        data: {
          validCode,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);
          if (result.data.code === "K001") {
            setTimeout(() => {
              this.$router.push({ name: "ForgetNext" });
            }, 1000);
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.forget {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  .forget-box {
    margin-top: 80px;
    padding: 10px;
  }
  .code-btn {
    position: relative;
    top: -40px;
    right: -250px;
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
  .next-btn {
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