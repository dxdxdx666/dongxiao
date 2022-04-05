<template>
  <div class="my">

    <div class="my-bg" :style="{backgroundImage: `url(${userInfo.userBg})`}">
      <div class="uploader-box">
        <van-uploader :after-read="upload" />
      </div>
    </div>

    <div class="my-box">
      <div class="my-info">
        <div class="my-img">
          <img class="auto-img" :src="userInfo.userImg" alt="" />
        </div>
        <div class="user-info">
          <div class="user-name one-text">{{userInfo.nickName}}</div>
          <div class="desc one-text">{{userInfo.desc ? userInfo.desc : '这家伙很懒，什么也没有留下！'}}</div>
        </div>
      </div>

      <div class="cell-list">

        <div class="cell-list-item" v-for="(item, index) in cellListData" :key="index" @click="goPage(item.routeName)">
         <van-cell :title="item.title" is-link />
        </div>


      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'My',
    data() {
      return {
        cellListData: [
          {
            title: '个人资料',
            routeName: 'Account'
          },
          {
            title: '我的订单',
            routeName: 'Order'
          },
          {
            title: '我的收藏',
            routeName: 'Like'
          },
          {
            title: '地址管理',
            routeName: 'MyAddress'
          },
          {
            title: '安全中心',
            routeName: 'Secure'
          }
        ],

        //用户数据
        userInfo: {
          desc: '',
          nickName: '',
          userBg: '',
          userImg: ''
        }
      };
    },

    created() {
      this.getMyData();
    },

    methods: {
      //获取我的数据
      getMyData() {
        this.axios({
          method: 'get',
          url: '/findMy'
        }).then(result => {
          

           if (result.data.code === 700) {
            this.$toast(result.data.msg);
            //token无效, 没有登录
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 'A001') {
            this.userInfo = result.data.result[0];
          }
          
        }).catch(err => {
         
          
        })
      },

      //上传背景图
      upload(file) {
        

        let imgType = file.file.type.split(/\//)[1];

        let serverBase64Img = file.content.replace(/data:image\/[A-Za-z]+;base64,/, '');

        this.axios({
          method: 'post',
          url: '/updateUserBg',
          data: {
            imgType,
            serverBase64Img
          }
        }).then(result => {
          

          this.$toast(result.data.msg);

           if (result.data.code === 700) {
            
            //token无效, 没有登录
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 'I001' && result.data.result[0] === 1) {
            //上传背景图片成功
            this.userInfo.userBg = result.data.userBg;
          }
          
        }).catch(err => {
         
          
        })

      },

      //跳转页面
      goPage(name){
        this.$router.push({name});
      }
    }
  }
</script>

<style lang="less" scoped>
  .my{
    .cell-list-item{
      border-bottom: 1px solid #f0f0f0;
      &:last-child{
        border-bottom: none;
      }
    }
    .cell-list{
      margin-top: 50px;
    }
    .user-name{
      font-weight: bold;
      color: #0C34BA;
    }
    .desc{
      margin-top: 10px;
      color: #666;
    }
    .user-info{
      font-size: 14px;
      margin-left: 20px;
    }
    .my-img{
      width: 50px;
      height: 50px;
      background-color: #ddd;
      border-radius: 50%;
      box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, .3);
      overflow: hidden;
    }
    .my-info{
      display: flex;
      align-items: center;
    }
    .my-bg{
      height: 140px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
       background-color: #e8e8e8;
       position: relative;
    }

    .uploader-box{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      /deep/ .van-uploader{
        width: 100%;
        height: 100%;
      }
      /deep/ .van-uploader__wrapper{
        width: 100%;
        height: 100%;
      } 
      /deep/ .van-uploader__upload{
        margin: 0;
        width: 100%;
        height: 100%;
      }
    }

    .my-box{
      padding: 10px;
      margin: 0 10px;
      position: relative;
      top: -35px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-image: linear-gradient(to bottom, rgba(255, 255, 255, .5) 0px, rgba(255, 255, 255, .5) 35px, rgba(255, 255, 255, 1) 35px);
    }
  }
  
</style>