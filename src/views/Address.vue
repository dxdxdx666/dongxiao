<template>
  <div class="address">
    <Navi :fixed="true" :title="aid ? '编辑地址' : '新增地址'" />
    <div>
      <van-address-edit
        :area-list="areaList"
        :show-postal="showPostal"
        :show-delete="!!aid"
        show-set-default
        :area-columns-placeholder="['选择省', '选择市', '选择区/县']"
        :address-info="addressInfo"
        @save="save"
        @delete="deleteAddress"
      />
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import { areaList } from '@vant/area-data';
  export default {
    name: 'Address',
    components: {
      Navi
    },
    data() {
      return {
        areaList,
        showPostal: true,

        //地址的aid, 编辑地址需要使用
        aid: '',

        //地址数据
        addressInfo: {}
      }
    },

    created() {
      //获取查询参数aid
      this.aid = this.$route.query.aid;
      if (this.aid) {
        this.getAddressByAid();
      }
    },

    methods: {

      //新增地址
      addAddress(content) {
        let addressInfo = {...content}
        addressInfo.isDefault = Number(addressInfo.isDefault);
        delete addressInfo.country;
        // 
        this.axios({
          method: 'post',
          url: '/addAddress',
          data: addressInfo
        }).then(result => {
          

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 9000) {
           setTimeout(() => {
              this.$router.go(-1);
            }, 1000)
          }

        }).catch(err => {
         
          
        })
      },

      //编辑地址
      editAddress(content) {
        let addressInfo = {
          ...content, 
          aid: this.aid
        }

        delete addressInfo.country;

        //检测用户是否修改的地址数据
        let isModify = false;
        for (let key in addressInfo) {
          if (addressInfo[key] !== this.addressInfo[key]) {
            isModify = true;
            
          }
        }

        if (!isModify) {
          this.$toast('尚未修改地址');
          return;
        }

        addressInfo.isDefault = Number(addressInfo.isDefault);
      
        this.axios({
          method: 'post',
          url: '/editAddress',
          data: addressInfo
        }).then(result => {
          

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 30000) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000)
          }

        }).catch(err => {
         
          
        })
      },

      //保存地址
      save(content) {
        if (this.aid) {
          //编辑地址
          this.editAddress(content);
        } else {
          //新增地址
          this.addAddress(content);
        }

      },

      //根据aid获取地址数据
      getAddressByAid() {
        this.axios({
          method: 'get',
          url: '/findAddressByAid',
          params: {
            aid: this.aid
          }
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 40000) {
            let data = result.data.result[0];
            data.isDefault = Boolean(data.isDefault);
            this.addressInfo = data;
          }

        }).catch(err => {
         
          
        })
      },

      //删除地址
      deleteAddress() {
        this.axios({
          method: 'post',
          url: '/deleteAddress',
          data: {
            aid: this.aid
          }
        }).then(result => {
          

          this.$toast(result.data.msg);

          if (result.data.code === 700) {
            
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 10000) {
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000)
            
          }

        }).catch(err => {
         
          
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .address{
    padding-top: 46px;

    /deep/ .van-switch--on{
      background-color: #0C34BA;
    }

    /deep/ .van-button--danger{
       background-color: #0C34BA;
       border-color: #0C34BA;
    }
  }
</style>