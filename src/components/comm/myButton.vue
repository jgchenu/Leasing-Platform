<template>
  <div class="myButton">
      <slot></slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variable";
.myButton{
    width: 300px;
    height: 80px;
    border: none;
    outline: none;
    text-align: center;
    font-size: 40px;
    border-radius: 22px;
    line-height: 80px;
    background-color: $lightBlue;
    color: #ffffff;
}
</style>


