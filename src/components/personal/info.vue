<template>
  <div class="info">
      <banner>个人信息</banner>
      <i class="iconfont icon-bianji" @click="toEdit"></i>
      <div class="infoMessage">
        <p><span class="name">姓名: </span>{{userInfo.name}}</p>
        <p><span class="card">学号: </span>{{userInfo.stuNum}}</p>
        <p><span class="phone">电话: </span>{{userInfo.account}}</p>
        <p><span class="college">学院: </span>{{userInfo.college}}</p>
        <p><span class="wechat">微信: </span>{{userInfo.wx}}</p>
        <p><span class="place">校区: </span>{{userInfo.address}}</p>
        <p><span class="card">卡号: </span>{{userInfo.card}}</p>
        <p><span class="card">性别: </span>{{getSex}}</p>
      </div>
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
export default {
  mounted() {
    this.$axios({
      url: "/zzx/api/user",
      methods: "get"
    })
      .then(res => {
        this.userInfo = res.data.retdata.userInfo;
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  data() {
    return {
      userInfo: {}
    };
  },
  components: {
    banner
  },
  methods: {
    toEdit() {
      if (this.userInfo.hasAll === 0) {
        this.$router.push({ path: "/infoEdit" });
      } else if (this.userInfo.hasAll === 1) {
        this.$router.push({ path: "/editMessage" });
      }
    }
  },
  computed: {
    getSex() {
      if (this.userInfo.sex == 1) {
        return "男";
      } else if (this.userInfo.sex == 0) {
        return "女";
      } else {
        return "未知";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.info {
  .banner {
    position: relative;
  }
  .icon-bianji {
    position: absolute;
    right: 60px;
    top: 130px;
    font-size: 40px;
  }
  .infoMessage {
    margin-top: 100px;
    text-indent: 100px;
    font-size: 40px;
    p {
      height: 100px;
      line-height: 100px;
      color: #000;
      span {
        color: $lightBlue;
        font-weight: bold;
      }
    }
  }
}
</style>
