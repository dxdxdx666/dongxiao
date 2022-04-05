<template>
  <div class="my-address">
    <Navi title="地址管理" :fixed="true" />
    <div>
      <van-address-list
        :list="list"
        default-tag-text="默认"
        :switchable="false"
        @add="addAddress"
        @edit="editAddress"
      />
    </div>
    <div v-if="list.length === 0">
      <van-empty description="没有地址！" />
    </div>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  name: "MyAddress",
  components: {
    Navi,
  },
  data() {
    return {
      list: [],
    };
  },

  created() {
    this.getAddressData();
  },

  methods: {

    //获取用户的地址
    getAddressData() {
       this.axios({
          method: 'get',
          url: '/findAddress'
        }).then(result => {
          

          if (result.data.code === 700) {
            this.$toast(result.data.msg);
            this.$router.push({name: 'Login'});
            return;
          }

          if (result.data.code === 20000) {

             result.data.result.forEach(item => {
              
              item.address = `${item.province}${item.city}${item.county}${item.addressDetail}`;
              
            })
        
            this.list = result.data.result;
          }

        }).catch(err => {
         
          
        })
    },

    //新增地址
    addAddress() {
      this.$router.push({name: 'Address'});
    },
    
    //编辑地址
    editAddress(item) {
      
      this.$router.push({name: 'Address', query: {aid: item.aid}});
    }

  }
};
</script>

<style lang="less" scoped>
.my-address {
  padding-top: 46px;
  /deep/ .van-address-item .van-radio__icon--checked .van-icon {
    background-color: #0c34ba;
    border-color: #0c34ba;
  }

  /deep/ .van-tag--danger {
    background-color: #0c34ba;
  }

  /deep/ .van-button--danger {
    background-color: #0c34ba;
    border-color: #0c34ba;
  }
}
</style>