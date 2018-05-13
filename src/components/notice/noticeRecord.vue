<template>
  <div class="noticeRecord">
    
    <span class="name">{{notice.str}}</span><span class="date">{{notice.time}}</span>
    <!-- <span class="name">小明 </span><span class="action">租用了</span><span class="thing"> 台灯</span><span class="date">2018-12-11</span> -->
  </div>
</template>

<script>
export default {
  props:{
    notice:{
      type:Object,
      default:{}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.noticeRecord {
  height: 100px;
  width: 680px;
  margin: 10px auto;
  border: 1px solid $lightBlue;
  font-size: 24px;
  line-height: 100px;
  position: relative;
  border-radius: 2px;
  text-indent: 20px;
  overflow: hidden;
  .date {
    font-size: 22px;
    color: $lightBlue;
    position: absolute;
    right: 10px;
    top: 40px;
  }
}
</style>
