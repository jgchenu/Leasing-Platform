<template>
  <div class="myrent">
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
      url: "/zzx/api/thing/renting/"
    }).then(res => {
      console.log(res);
      this.things = res.data.retdata.things;
    });
  },
  data() {
    return {
      isLoan: true,
      things:[]
    };
  },
  components: {
    orderList
  }
};
</script>

<style>

</style>
