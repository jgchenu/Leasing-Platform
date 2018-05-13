<template>
  <div class="orderList" @click="goDetail">
      <div class="orderImg">
          <img v-lazy="thing.smallimg_url||'http://zzx-1252763483.cosgz.myqcloud.com/img/bLogo.jpg'" alt="缩略图">
      </div>
      <div class="orderMessage">
          <p class="line-first"><span class="name">{{thing.name}}</span><myButton class="remind" v-if="isLoan&&thing.isRented===1" @click.native="remind">提醒归还</myButton></p>
          <p class="line-second"><span class="subTime">{{thing.publish_time}}</span><span class="status">{{status}}</span></p>
      </div>
  </div>
</template>

<script>
import myButton from "@/components/comm/myButton";
import { MessageBox } from "mint-ui";
export default {
  props: {
    isLoan: {
      type: Boolean,
      default: false
    },
    thing: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  components: {
    myButton
  },
  methods: {
    goDetail() {
      if (this.thing.wid) {
        this.$router.push({
          path: "/wishDetail",
          query: { wid: this.thing.wid }
        });
      } else if (this.thing.tid) {
        this.$router.push({
          path: "/goodDetail",
          query: { tid: this.thing.tid }
        });
      }
    },
    remind() {
      let tid = this.thing.tid;
      this.$axios({
        url: `/zzx/api/thing/${tid}/remind`,
        method: "post"
      })
        .then(res => {
          if (res.data.retcode === 20040314 || res.data.retcode === 20050003) {
            MessageBox.alert(res.data.retmsg);
          } else if (res.data.retcode === 200200) {
            MessageBox.alert("提醒成功，已经短信通知对方");
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  computed: {
    status() {
      if (this.thing.isRented === 0) {
        return "未租用";
      } else if (this.thing.isRented === 1) {
        return "已租用";
      } else if (this.thing.isGot === 1) {
        return "已实现";
      } else if (this.thing.isGot === 0) {
        return "未实现";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.orderList {
  margin: 20px auto;
  width: 700px;
  height: 200px;
  border: 1px solid $lightBlue;
  border-radius: 20px;
  padding-right: 20px;
  .orderImg {
    float: left;
    height: 200px;
    width: 200px;
    img {
      height: 180px;
      width: 180px;
      margin: 10px 10px;
      border-radius: 10px;
    }
  }
  .orderMessage {
    float: right;
    height: 200px;
    width: 500px;
    .line-first {
      height: 100px;
      line-height: 100px;
      .name {
        font-size: 40px;
        margin-left: 30px;
      }
      .remind {
        display: inline-block;
        width: 130px;
        height: 60px;
        font-size: 24px;
        line-height: 60px;
        margin-top: 20px;
        float: right;
      }
    }
    .line-second {
      height: 100px;
      line-height: 120px;
      .subTime {
        font-size: 30px;
        margin-left: 30px;
      }
      .status {
        font-size: 30px;
        float: right;
        position: relative;
        right: 36px;
      }
    }
  }
}
</style>


