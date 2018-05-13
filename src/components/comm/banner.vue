<template>
  <div class="banner">
      <i class="iconfont icon-return" @click="goBack"></i><span class="title"><slot></slot></span>
  </div>
</template>
<script>
export default {
    methods:{
        goBack(){
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variable";
.banner {
  width: 100%;
  height: 100px;
  background-color: $lightBlue;
  font-weight: bolder;
  text-align: center;
  position: fixed;
  z-index: 3;
  border: 1px solid #ffffff;
  .icon-return {
    font-size: 50px;
    position: absolute;
    left: 5%;
    top: 20%;
    color: #ffffff;
  }
  .title {
    display: inline;
    font-size: 38px;
    line-height: 100px;
    color: #ffffff;
  }
}
</style>


