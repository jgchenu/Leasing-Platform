<template>
  <div class="collection">
      <banner>我的收藏</banner>
         <orderList :isLoan="false" v-for="thing in things" :key="thing.id" :thing="thing"></orderList>
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import orderList from "@/components/order/orderList";
export default {
  mounted() {
    console.log("collect");
    this.$axios({
      method: "GET",
      url: "/zzx/api/thing/fav/"
    }).then(res => {
      console.log(res);
      this.things = res.data.retdata.things;
    });
  },
  data() {
    return {
      things: []
    };
  },
  components: {
    banner,
    orderList
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.collection {
  position: relative;
  .banner {
    position: relative;
  }
}
</style>
