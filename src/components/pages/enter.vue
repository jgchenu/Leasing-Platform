<template>
  <div class="enter">
      <header>租租侠</header>
      <keep-alive>
      <transition name="fade" mode="out-in"><router-view/></transition>
      </keep-alive>
      <div class="menu-wrap">
      <ul class="main-menu" id="menu">
             <router-link to="/enter/main" tag="li" replace>
              <i class="icon-shouye iconfont"></i><br>首页
              </router-link>
              <router-link to="/enter/order/myloan" tag="li" replace>
              <i class="icon-order iconfont"></i><br>订单
              </router-link>
              <router-link to="/enter/notice" tag="li" replace>
              <i class="icon-tongzhi iconfont"></i><br>通知
              </router-link>
              <router-link to="/enter/me" tag="li" replace>
              <i class="icon-wo iconfont"></i><br>我
              </router-link>
      </ul>
      </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // this.setCookie(
    //   "token",
    //   "MDAwMDAwMDAwMH6I1GaEpYybiYmvoZG3uGeMpoiahKut0o5oeZWOpp7Oi3y7npCPd2F9iapphtzWr3-jc6aEhajfgaB5lYDMd5d_eNWBj49mpH2cyJ-Fp6Rsf413Z4R1qNiapIqYmLqa04qGnnM",30
    // );
  },
  data() {
    return {
      data: {
        isHide: true
      }
    };
  },
  components: {},
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    setCookie(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + "; " + expires + ";path=/";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.enter {
  padding: 0;
  margin: 0;
  .router-link-active {
    color: $lightBlue !important;
  }
  header {
    width: 100%;
    height: 100px;
    background-color: $lightBlue;
    font-weight: bolder;
    text-align: center;
    font-size: 38px;
    line-height: 100px;
    color: #ffffff;
  }
  .menu-wrap {
    width: 100%;
    position: fixed;
    bottom: -6px;
    padding: 0;
    margin: 0;
    background-color: #ffffff;
    .main-menu {
      background-color: #ffffff;
      border-top: 1px solid #dddddd;
      width: 100%;
      position: absolute;
      height: 120px;
      bottom: 0;
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      li {
        text-align: center;
        flex-grow: 1;
        color: #aaaaaa;
        background-color: #ffffff;
        .iconfont {
          font-size: 60px;
        }
        span {
          font-size: 12px;
          text-align: center;
        }
      }
      li.selected {
        color: $lightBlue;
      }
    }
  }
}
</style>