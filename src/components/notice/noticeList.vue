<template>
  <div class="noticeList" @click="goDetail">
      <div class="noticeSign">
          <myButton class="signButton">{{noticeType}}</myButton>
      </div>
      <div class="noticeMessage">
        <!-- <p class="Message"><span class="name">小明</span><span class="action">租用了</span><span class="thing">台灯</span><span class="recently">最新</span></p> -->
        <p class="Message"><span class="name">{{recent}}</span><span class="recently">最新</span></p>
      </div>

  </div>
</template>

<script>
import myButton from "@/components/comm/myButton";

export default {
  props: {
    noticeType: {
      type: String,
      default: "出租"
    },
    recent: {
      type: String,
      default: "暂无最新消息"
    }
  },
  data() {
    return {};
  },
  components: {
    myButton
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: "/noticeDetail",
        query: { noticeType: this.noticeType }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.noticeList {
  width: 700px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid $lightBlue;
  padding: 0;
  margin: 20px auto;
  overflow: hidden;
  .noticeSign {
    width: 150px;
    float: left;
    line-height: 100px;
    .signButton {
      border-radius: 8px;
      margin: 5px 5px;
      display: inline-block;
      width: 120px;
      height: 90px;
      line-height: 90px;
      font-size: 30px;
    }
  }
  .noticeMessage {
    width: 550px;
    height: 100px;
    float: right;
    .Message {
      height: 100px;
      font-size: 26px;
      line-height: 100px;
      position: relative;
      .recently {
        font-size: 20px;
        color: $lightBlue;
        position: absolute;
        right: 10px;
        top: -30px;
      }
    }
  }
}
</style>


