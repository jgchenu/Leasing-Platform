<template>
  <div class="notice">
      <noticeList :noticeType="noticeTypes.loan" :recent="recentLoan"></noticeList>
      <noticeList :noticeType="noticeTypes.rent" :recent="recentRent"></noticeList>
      <noticeList :noticeType="noticeTypes.wish" :recent="recentWish"></noticeList>
  </div>
</template>

<script>
import noticeList from "@/components/notice/noticeList";
import rentVue from "../pages/rent.vue";

export default {
  mounted() {
    this.$axios({
      method: "get",
      url: "/zzx/api/notice/lastest"
    })
      .then(res => {
        console.log(res.data.retdata);
        this.recentLoan = res.data.retdata.thingNotice? res.data.retdata.thingNotice.str:undefined;
        this.recentRent = res.data.retdata.rentingNotice? res.data.retdata.rentingNotice.str:undefined;
        this.recentWish=res.data.retdata.wishNotice? res.data.retdata.wishNotice.str:undefined;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      noticeTypes: {
        loan: "出租",
        rent: "租用",
        wish: "愿望"
      },
      recentLoan: "",
      recentRent: "",
      recentWish: ""
    };
  },
  components: {
    noticeList
  }
};
</script>

<style>

</style>
