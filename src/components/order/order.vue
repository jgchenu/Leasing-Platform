<template>
  <div class="order">
      <ul class="order-menu">
             <router-link to="/enter/order/myloan" tag="li">
                  我出租的
              </router-link>
              <router-link to="/enter/order/myrent" tag="li">
                  我借入的
              </router-link>
              <router-link to="/enter/order/mywish" tag="li">
                  我的愿望
              </router-link>
              <!-- <router-link to="/enter/order/gotwish" tag="li">
                  领的愿望
              </router-link> -->
      </ul>
      <transition name="fade" mode="out-in"><router-view/></transition>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route.path);
    if (this.$route.path === "/enter/order") {
      this.$router.push({ path: "/enter/order/myloan" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.router-link-active {
  color: $lightBlue !important;
}
.order {
  padding-bottom: 100px;
  .order-menu {
    border-top: 1px solid #dddddd;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    li {
      height: 80px;
      text-align: center;
      flex-grow: 1;
      color: #000;
      border: 1px solid #eeeeee;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
    }
    li.selected {
      color: #aaaaaa;
    }
  }
}
</style>

