<template>
  <div class="me">
    <!-- me -->
      <div class="meList" @click="toInfo">个人信息<i class="iconfont icon-youbianjiantoujiaoduxiao"></i></div>
      <div class="meList" @click="toSuggest">建议反馈<i class="iconfont icon-youbianjiantoujiaoduxiao"></i></div>
      <div class="meList" @click="toOrdinance">使用条例<i class="iconfont icon-youbianjiantoujiaoduxiao"></i></div>
      <div class="meList" @click="toCollection">我的收藏<i class="iconfont icon-youbianjiantoujiaoduxiao"></i></div>
      <div class="meList signOut" @click="signOut">{{isLogin}}</div>
      <!-- <div class="logo">
        <img src="http://chenjianguang.com/assets/zuzuxia/logo.jpg" alt="logo">
      </div> -->
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import { MessageBox } from "mint-ui";
export default {
  mounted() {
    if (!this.getCookie("token")) {
      MessageBox.confirm("你还没有登录，点击跳转").then(
        () => {
          this.$router.push({ path: "/user" });
        },
        () => {
          MessageBox.alert("你取消了登录");
        }
      );
    }
  },
  data() {
    return {};
  },
  components: {
    banner
  },
  methods: {
    toInfo() {
      this.$router.push({ path: "/info" });
    },
    toSuggest() {
      // this.$router.push({ path: "/suggest" });
      window.location.href="http://cn.mikecrm.com/eV38Kd";
    },
    toOrdinance() {
      window.location.href = "http://mp.weixin.qq.com/s/VCToDaBCPYaxHxjSSXlAjg";
    },
    toCollection() {
      this.$router.push({ path: "/collection" });
    },
    signOut() {
      this.delCookie('token');
      this.$router.push({ path: "/user" });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path=/";
    }
  },
  computed: {
    isLogin() {
      if (this.getCookie("token")) {
        return "退出";
      } else {
        return "登录";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";

.me {
  width: 100%;
  .meList {
    width: 100%;
    height: 100px;
    background-color: #ffffff;
    text-align: left;
    font-size: 34px;
    line-height: 100px;
    color: #000;
    border: 2px solid #ffffff;
    text-indent: 20px;
    border-bottom: 1px solid #dddddd;
    img {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin: 10px 0;
      float: left;
    }
    i.iconfont {
      float: right;
      margin-right: 20px;
      color: #cccccc;
    }
  }
  .signOut {
    border-top: 1px solid #cccccc;
    margin-top: 40px;
    text-align: center;
    text-indent: 0;
  }
  .logo {
    width: 400px;
    height: 300px;
    margin: 20px auto;
    border-radius: 10px;
    img {
      width: 400px;
      height: 300px;
      border-radius: 10px;
    }
  }
}
</style>
