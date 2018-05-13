<template>
  <div class="orderDetail">
      <banner>{{noticeType}}通知</banner>
      <noticeRecord v-for="notice in notices" :key="notice.id" :notice="notice"></noticeRecord>
  </div>
</template>

<script>
import banner from "@/components/comm/banner.vue";
import noticeRecord from "@/components/notice/noticeRecord";
export default {
  mounted() {
    this.noticeType = this.$route.query.noticeType;
    this.getList(this.noticeType);
  },
  data() {
    return {
      noticeType: "",
      notices: []
    };
  },
  components: {
    banner,
    noticeRecord
  },
  methods: {
    getList(type) {
      if (type == "愿望") {
        this.$axios({
          method: "GET",
          url: "/zzx/api/notice/wish"
        }).then(res => {
          console.log(res);
          this.notices = res.data.retdata.notices;
        });
      } else if (type == "出租") {
        this.$axios({
          method: "GET",
          url: "/zzx/api/notice/thing"
        }).then(res => {
          console.log(res);
          this.notices = res.data.retdata.notices;
        });
      } else if (type == "租用") {
        this.$axios({
          method: "GET",
          url: "/zzx/api/notice/renting"
        }).then(res => {
          console.log(res);
          this.notices = res.data.retdata.notices;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.orderDetail {
  .banner {
    position: relative;
  }
  padding-bottom: 40px;
}
</style>
