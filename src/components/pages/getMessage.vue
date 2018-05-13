<template>
  <div class="getMessage">
    <banner>联系信息</banner>
    <div class="messages">
        <p><i class="iconfont icon-call"></i><span>电话：{{info.account}}</span></p>
         <p><i class="iconfont icon-weixin"></i><span>微信：{{info.wx}}</span></p> 
         <p><i class="iconfont icon-wo"></i><span>姓名：{{info.name}}</span></p> 
         <p><i class="iconfont icon-sexm"></i><span>性别：{{info.sex==1?"男":info.sex==0?"女":"未知"}}</span></p> 
        </div>
  </div>
</template>

<script>
import banner from "@/components/comm/banner.vue";
import myButton from "@/components/comm/myButton.vue";
import { MessageBox } from "mint-ui";
export default {
  mounted() {
    let tid = this.$route.query.tid;
    let isOrder = this.$route.query.isOrder;
    let wid = this.$route.query.wid;
    if (tid) {
      if (isOrder == 1) {
        this.$axios({
          url: `/zzx/api/thing/${tid}/contact`
        })
          .then(res => {
            console.log(res);
            if (res.data.retcode === 200200) {
              this.info = res.data.retdata.userInfo;
            }
          })
          .catch(err => {
            console.log(err.response);
            if (err.response.status === 500) {
              MessageBox("提示", err.response.data);
            }
          });
      } else if (isOrder == 0) {
        this.$axios({
          url: `/zzx/api/thing/${tid}/rent`,
          method: "post"
        })
          .then(res => {
            console.log(res);
            if (
              res.data.retcode === 20040309 ||
              res.data.retcode === 20050003 ||
              res.data.retcode === 20040317
            ) {
              MessageBox.alert(res.data.retmsg);
            } else if (res.data.retcode === 200200) {
              this.info = res.data.retdata.userInfo;
              MessageBox.alert("租用成功，已经短信通知对方");
            }
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    } else if (wid) {
      if (isOrder == 1) {
        this.$axios({
          url: `/zzx/api/wish/${wid}/contact`
        })
          .then(res => {
            console.log(res);
            if (res.data.retcode === 200200) {
              this.info = res.data.retdata.userInfo;
            }
          })
          .catch(err => {
            console.log(err.response);
          });
      } else if (isOrder == 0) {
        this.$axios({
          url: `/zzx/api/wish/${wid}/pick`,
          method: "post"
        })
          .then(res => {
            if (res.data.retcode === 20040312) {
              MessageBox.alert(res.data.retmsg).then(() => {
                this.$router.replace(-1);
              });
            } else if (res.data.retcode === 200200) {
              console.log(res);
              MessageBox.alert("领取成功，已经短信通知对方");
              this.info = res.data.retdata.userInfo;
            }
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  },
  data() {
    return {
      info: {}
    };
  },
  components: {
    banner,
    myButton
  },
  computed: {
    isEdit() {
      return this.goodDetail.isOwner != 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.getMessage {
  .banner {
    position: relative;
  }
  .messages {
    margin-top: 30px;
    p {
      margin-top: 16px;
      font-size: 40px;
      text-indent: 60px;
      .iconfont {
        font-size: 60px;
        position: relative;
        top: 6px;
      }
      .icon-weixin {
        font-size: 50px;
      }
      span {
        margin-left: 40px;
      }
    }
  }
}
</style>

