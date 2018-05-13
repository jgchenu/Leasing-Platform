<template>
  <div class="mywish">
       <orderList v-for="thing in things" :key="thing.id" :thing="thing"></orderList>   
  </div>
</template>

<script>
import orderList from "@/components/order/orderList";
export default {
  mounted() {
    console.log("myrent");
    this.$axios({
      method: "GET",
      url: "/zzx/api/wish/mine/"
    }).then(res => {
      console.log(res);
      this.things = res.data.retdata.wishes;
    });
  },
  data() {
    return {
      isLoan: true,
      things: []
    };
  },
  components: {
    orderList
  }
};
</script>

<style lang="scss" scoped>
.mywish{
  width: 100%;
  overflow: scroll;
}
</style>
