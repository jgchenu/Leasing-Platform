<template>
  <div class="myloan">
      <orderList :isLoan="true" v-for="thing in things" :key="thing.id" :thing="thing"></orderList>      
  </div>
</template>

<script>
import orderList from "@/components/order/orderList";
export default {
  mounted() {
    console.log("myloan");
    this.$axios({
      method: "GET",
      url: "/zzx/api/thing/mine/"
    }).then(res => {
      console.log(res);
      this.things=res.data.retdata.things;
    });
  },
  data() {
    return {
      things: []
    };
  },
  components: {
    orderList
  }
};
</script>

<style>

</style>
