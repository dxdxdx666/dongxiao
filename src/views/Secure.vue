<template>
  <div class="secure">
    <Navi title="安全中心" :fixed="true" />
    <div>
      <Bg />
      <div class="secure-box">
        <van-cell is-link @click="showPopup">修改密码</van-cell>
        <van-popup
          v-model="show"
          position="bottom"
          :style="{ height: '40%' }"
          closeable
        >
          <div class="title">修改密码</div>
          <div class="inp-box">
            <van-form validate-first>
              <van-field
                v-model="updateInfo.oldPassword"
                :type="!isOpenOlder ? 'password' : 'text'"
                name="pattern"
                label="旧密码"
                placeholder="旧密码(首字符必须为字母)"
                :right-icon="!isOpenOlder ? 'closed-eye' : 'eye-o'"
                autocomplete="off"
                @click-right-icon="toggleOlderPasssword"
                :rules="[{ pattern, message: '请输入正确内容' }]"
              />

              <van-field
                v-model="updateInfo.password"
                :type="!isOpenNew ? 'password' : 'text'"
                name="pattern"
                label="新密码"
                placeholder="新密码(首字符必须为字母)"
                :right-icon="!isOpenNew ? 'closed-eye' : 'eye-o'"
                autocomplete="off"
                @click-right-icon="toggleNewPasssword"
                :rules="[{ pattern, message: '请输入正确内容' }]"
              />
              <div style="margin: 50px">
                <van-button
                  round
                  block
                  type="info"
                  native-type="submit"
                  color="#0C34BA"
                  @click="subClick"
                  >提交</van-button
                >
              </div>
            </van-form>
          </div>
        </van-popup>
        <van-cell is-link @click="dialog">注销账号</van-cell>
      </div>

      <div class="exit" @click="exitLogin">退出登录</div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import Bg from "../components/Bg.vue";
export default {
  name: "Secure",
  components: {
    Navi,
    Bg,
  },
  data() {
    return {
      updateInfo: {
        password: "",
        oldPassword: "",
      },

      show: false,
      pattern: /^[a-zA-Z]\w{5,10}$/,
      //查看旧密码
      isOpenNew: false,

      //查看新密码
      isOpenOlder: false,
    };
  },

  created() {},

  methods: {
    showPopup() {
      this.show = true;
    },

    toggleNewPasssword() {
      this.isOpenNew = !this.isOpenNew;
    },
    toggleOlderPasssword() {
      this.isOpenOlder = !this.isOpenOlder;
    },
    //点击提交判断
    subClick(){
      if(this.updateInfo.password === this.updateInfo.oldPassword){
         this.$toast('新密码不能与旧密码相同');
        return;
      }

      this.updatePassword()
    },
    
    updatePassword() {
      this.axios({
        method: "post",
        url: "/updatePassword",
        data: {
          ...this.updateInfo,
        },
      })
        .then((result) => {
          this.$toast(result.data.msg);

           if (result.data.code === 700) {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }
          
          if (result.data.code === "E001") {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }
        })
        .catch((err) => {});
    },

    exitLogin() {
      this.axios({
        method: "post",
        url: "/logout",
      })
        .then((result) => {
          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }

          if (result.data.code === "F001") {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }
        })
        .catch((err) => {});
    },

    destroyAccount() {
      this.axios({
        method: "post",
        url: "/destroyAccount",
      })
        .then((result) => {
          // console.log(result);

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }

          if (result.data.code === "G001") {
            setTimeout(() => {
              this.$router.push({ name: "Login" });
            }, 1000);
          }
        })
        .catch((err) => {});
    },

    dialog() {
      this.$dialog
        .confirm({
          title: "注销账号",
          message: "是否确定注销账号，—旦注销无法恢复!",
          showCancelButton: true,
        })
        .then(() => {
          this.destroyAccount();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.secure {
  padding-top: 46px;

  .secure-box {
    .title {
      color: #444;
      font-size: 16px;
      margin: 10px;
    }
    padding: 10px;
    background-color: #fff;
    margin: 0 10px;
    position: relative;
    top: -20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .exit {
    padding: 10px;
    margin: 60px 10px 0;
    background-color: #0c34ba;
    height: 25px;
    border-radius: 30px;
    text-align: center;
    line-height: 25px;
    color: #fff;
  }
}
</style>