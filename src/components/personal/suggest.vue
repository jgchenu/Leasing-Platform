<template>
  <div class="suggest">
      <banner>建议反馈</banner>
      <div class="suggestMemssage">
       <textarea name="suggestion" id="suggestion" cols="30" rows="10"></textarea>
       <div class="Triangle"></div>
        <myButton>提交</myButton>
      </div>
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import myButton from "@/components/comm/myButton.vue";
export default {
  data() {
    return {};
  },
  components: {
    banner,
    myButton
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.suggest {
  width: 100%;
  height: 100%;

  .banner {
    position: relative;
  }
  .suggestMemssage {
    width: 600px;
    margin: 160px auto 0 auto;
    height: 400px;
    #suggestion {
      width: 600px;
      height: 400px;
      border: 1px solid $lightBlue;
      border-radius: 20px;
      font-size: 30px;
    }
    .Triangle {
      width: 0;
      height: 0;
      border: 40px solid $lightBlue;
      border-color: $lightBlue transparent transparent transparent;
      position: relative;
      margin: 0 auto;
    }
    .myButton{
      width: 300px;
      margin: 40px auto;
    }
  }
}
</style>
