<template>
  <div class="main">
    <div class="search"><input type="text" class="search-input"  @keyup.enter="search" v-model="searchVal" placeholder="请输入想租借的物品" @focus="search" @click="search"><i class="iconfont icon-search" @click="search"></i></div>
    <mt-swipe class="my-swipe" >
      <mt-swipe-item class="slide1" v-for="img in imgs" :key="img.id">
        <a :href="img.target_url" width="100%" height="100%">
          <img :src="img.img_url" width="100%" height="100%">
        </a></mt-swipe-item>
      </mt-swipe>
      <router-link to="/loan" tag="div" class="main-button" >
      <my-button>我要出租</my-button>
      </router-link>
      <router-link to="/rent" tag="div" class="main-button" >
      <my-button >我要租借</my-button>
      </router-link>
       <router-link to="/wishWall" tag="div" class="main-button" >
      <my-button >愿望墙</my-button>
      </router-link>
  </div>
</template>

<script>
import { Swipe, SwipeItem, MessageBox } from "mint-ui";
import myButton from "@/components/comm/myButton.vue";
export default {
  data() {
    return {
      imgs: [],
      searchVal: ""
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/zzx/api/img/sliders"
    })
      .then(res => {
        console.log("slides", res.data);
        this.imgs = res.data.retdata.sliders;
      })
      .catch(err => {
        console.log(err);
      });

  },
  components: {
    Swipe,
    SwipeItem,
    myButton
  },
  methods: {
    search() {
      this.$router.push({
        path: "/rent"
      });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/variable";

.main {
  .search {
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding: 0;
    margin: 0;
    position: relative;
    .search-input {
      margin-left: 10px;
      height: 50px;
      width: 700px;
      line-height: 50px;
      border-radius: 60px;
      border-color: $lightBlue;
      text-indent: 20px;
      font-size: 30px;
      -webkit-appearance: none;
      outline: none;
      border: 1px solid $lightBlue;
    }
    .icon-search {
      position: absolute;
      font-size: 40px;
      right: 46px;
    }
  }
  .my-swipe {
    height: 380px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 70px;
    border-bottom: 4px solid #cce9f5;
    border-top: 4px solid #cce9f5;
  }
  .slide1 {
    background-color: $lightBlue;
    color: #fff;
  }
  .main-button {
    margin: 50px auto;
    width: 300px;
  }
}
</style>
