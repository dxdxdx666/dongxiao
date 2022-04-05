<template>
  <div class="account">
    <Navi title="个人资料" :fixed="true" />
    <div>
      <Bg />
      <div class="account-box">
        <div class="account-item">
          <div class="left">头像</div>

          <div class="img">
            <div class="upload-box">
              <van-uploader :after-read="updateAvatar">
                <img class="auto-img" :src="userInfo.userImg" alt="" />
              </van-uploader>
            </div>
          </div>
        </div>

        <div class="account-item">
          <div class="left">用户id</div>
          <div class="right">{{ userInfo.userId }}</div>
        </div>

        <div class="account-item">
          <div class="left">昵称</div>
          <div class="right">
            <van-cell @click="showPopup">{{ userInfo.nickName }}</van-cell>
            <van-popup
              v-model="show"
              position="bottom"
              :style="{ height: '60%' }"
              closeable
            >
              <div class="title">修改昵称</div>
              <div class="inp-box">
                <van-form validate-first>
                  <van-field
                    v-model="userInfo.nickName"
                    name="pattern"
                    autocomplete="off"
                    :type="'text'"
                    placeholder="输入昵称"
                    :rules="[{ pattern, message: '请输入正确内容' }]"
                  />
                  <div style="margin: 100px 20px">
                    <van-button
                      round
                      block
                      type="info"
                      native-type="submit"
                      color="#0C34BA"
                      @click="updateNickName"
                      >提交</van-button
                    >
                  </div>
                </van-form>
              </div>
            </van-popup>
          </div>
        </div>

        <div class="account-item">
          <div class="left">简介</div>
          <div class="right">
            <van-cell  @click="showP">
              {{
                userInfo.desc ? userInfo.desc : "这家伙很懒，什么也没有留下！"
              }}
            </van-cell>
            <van-popup
              v-model="showp"
              position="bottom"
              :style="{ height: '60%' }"
              closeable
            >
              
              <div class="title">修改简介</div>
              <div class="inp-box">
                <van-form validate-first>
                  <van-field
                    v-model="userInfo.desc"
                    name="pattern1"
                    autocomplete="off"
                    :type="'text'"
                    placeholder="输入简介"
                    :rules="[{ pattern, message: '请输入正确内容' }]"
                  />
                  <div style="margin: 100px 20px">
                    <van-button
                      round
                      block
                      type="info"
                      native-type="submit"
                      color="#0C34BA"
                      @click="updateDesc"
                      >提交</van-button
                    >
                  </div>
                </van-form>
              </div>
            
            </van-popup>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import Bg from "../components/Bg.vue";
export default {
  name: "Account",
  components: {
    Navi,
    Bg,
  },
  data() {
    return {
      show: false,
      showp: false,
      pattern: /\w|\D{1,10}$/,
      pattern1: /\w|\D{1,20}$/,
      //用户数据
      userInfo: {
        desc: "",
        nickName: "",
        useId: "",
        userImg: "",
        phone: "",
      },
    };
  },
  created() {
    this.getMyData();
  },
  methods: {
    //获取我的数据
    getMyData() {
      this.axios({
        method: "get",
        url: "/findAccountInfo",
      })
        .then((result) => {
          if (result.data.code === "B001") {
            // console.log(result);
            this.userInfo = result.data.result[0];
          }
        })
        .catch((err) => {});
    },

    //修改头像
    updateAvatar(file) {
      let imgType = file.file.type.split(/\//)[1];

      let serverBase64Img = file.content.replace(
        /data:image\/[A-Za-z]+;base64,/,
        ""
      );

      this.axios({
        method: "post",
        url: "/updateAvatar",
        data: {
          imgType,
          serverBase64Img,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            //token无效, 没有登录
            this.$router.push({ name: "Login" });
            return;
          }

          if (result.data.code === "H001" && result.data.result[0] === 1) {
            //上传背景图片成功
            this.userInfo.userImg = result.data.userImg;
          }
        })
        .catch((err) => {});
    },

    showPopup() {
      this.show = true;
    },

    showP() {
      this.showp = true;
    },

    //修改昵称
    updateNickName() {
      this.axios({
        method: "post",
        url: "/updateNickName",
        data: {
          ...this.userInfo,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);

          if (result.data.code === "C001") {
            this.show = false;
          }

          if (result.data.code === 700) {
            this.$router.push({ name: "Login" });
            return;
          }
        })
        .catch((err) => {});
    },

    //修改简介
    updateDesc() {
      this.axios({
        method: "post",
        url: "/updateDesc",
        data: {
          ...this.userInfo,
        },
      })
        .then((result) => {
          console.log(result);
          this.$toast(result.data.msg);

          if (result.data.code === "D001") {
            this.showp = false;
          }

          if (result.data.code === 700) {
            this.$router.push({ name: "Login" });
            return;
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
.account {
  padding-top: 46px;
  padding-bottom: 30px;

  .account-box {
    .title {
      margin: 20px;
      font-size: 16px;
      color: #444;
    }
    padding: 10px;
    background-color: #fff;
    margin: 0 10px;
    position: relative;
    top: -20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .account-item {
      padding: 5px 0;
      font-size: 14px;
      color: #444;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      border-bottom: 1px solid #f5f5f5;
      /deep/ .van-cell {
        padding: 0;
      }
      /deep/ .van-field__control {
        padding: 5px 12px;
      }
      &:last-child {
        border-bottom: none;
      }
      .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
  }
}
</style>