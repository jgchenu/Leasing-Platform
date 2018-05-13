<template>
  <div id="app">
   
      <transition name="fade" mode="out-in">
      <keep-alive> 
      <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

  </div>
</template>
<script>
import { Indicator } from "mint-ui";
export default {
  beforeCreate() {
    Indicator.open({
      text: "页面初始化...",
      spinnerType: "fading-circle"
    });
    setTimeout(() => {
      Indicator.close();
    }, 1000);
  },

  name: "app"
};
</script>
<style lang="scss">
@import "./assets/scss/base.scss";
$url: "//at.alicdn.com/t/font_516188_8ewwtcrsm3fbhuxr.css";
@import url($url);
</style>
<style lang="scss" scoped>
@import "./assets/scss/variable";
#app {
}
</style>


