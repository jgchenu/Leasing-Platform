<template>
  <div class="notes">
      <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variable";
.notes {
  display: inline-block;
  height: 70px;
  border: none;
  outline: none;
  text-align: center;
  font-size: 26px;
  border-radius: 10px;
  line-height: 70px;
  background-color: $lightBlue;
  padding: 0 10px 0 10px;
  color: #ffffff;
  position: relative;
  background: -webkit-linear-gradient(225deg, #65b6f8 12px, $lightBlue 0);
  background: linear-gradient(225deg, #65b6f8 12px, $lightBlue 0);
}
</style>


