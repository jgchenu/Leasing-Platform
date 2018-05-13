<template>
<mt-loadmore :top-method="loadTop" ref="loadmore" class="mt-loadmore" :auto-fill="false" :topDistance="80"  :bottom-all-loaded="false">    
  <div class="wish-wall"> 
      <banner>愿望墙</banner>
      <div class="margin--top"></div>
      <div class="wishes" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
          <template v-for="(wish,index) in wishes" >
             <notes :key="wish.id" @click.native="goDetail(wish)">{{wish.name}}</notes>
          <div class="line" :key="wish.id" v-if="(index+1)%20==0"></div>
      </template>
      </div>
      <p class="no-resourse">{{noResourse}}</p>
      
       <!-- <mt-spinner color="#26a2ff" type="fading-circle" v-show="loadButton" class="loadButton" :size="60"></mt-spinner> -->
    <myButton class="sub-wish" @click.native="goRelease"><i class="iconfont icon-msnui-add-line"></i></myButton>
  </div>
  </mt-loadmore>
</template>

<script>
import { Loadmore, InfiniteScroll, Lazyload } from "mint-ui";
import banner from "@/components/comm/banner.vue";
import notes from "@/components/comm/notes.vue";
import myButton from "@/components/comm/myButton.vue";
export default {
  mounted() {
    this.refresh();
  },
  data() {
    return {
      wishes: [],
      noResourse: ""
    };
  },
  components: {
    banner,
    notes,
    Loadmore,
    myButton
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      // this.refresh();
      window.location.reload();
    },
    loadMore() {
      console.log("loading more");
      this.loading = true;
      if (!this.nextUrl) {
        this.noResourse = "已经到底了！";
        this.loading = false;
        return;
      } else {
        this.$axios({
          method: "get",
          url: this.nextUrl
        })
          .then(res => {
            console.log("more", res);
            this.nextUrl = res.data.retdata.page.next;
            this.noResourse = "";
            res.data.retdata.wishes.forEach(el => {
              this.wishes.push(el);
            });
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
      setTimeout(() => {
        this.loadButton = false;
      }, 1000);
    },
    goDetail(item) {
      this.$router.push({ path: "/wishDetail", query: { wid: item.wid } });
    },
    goRelease() {
      this.$router.push({ path: "/releaseWish" });
    },
    refresh() {
      this.$axios({
        method: "get",
        url: "/zzx/api/wish"
      })
        .then(res => {
          console.log("wishes", res);
          if (res.data.retdata.wishes.length == 0) {
            this.noResourse = "暂无愿望,请稍后再试";
            console.log("暂无资源");
          } else {
            this.noResourse = "";
          }
          this.wishes = res.data.retdata.wishes;
          this.nextUrl = res.data.retdata.page.wishes;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variable";
.wish-wall {
  width: 100%;
  overflow: hidden;
  // .mint-loadmore {
  //   width: 100%;
  //   overflow: auto;
  //   height: 100%;
  //   margin-top: 100px;
  // }
  .banner {
    position: fixed;
  }
  .margin--top{
    margin-top: 100px;
  }
  //底部提示
  .no-resourse {
    text-align: center;
    color: #cccccc;
    font-size: 30px;
    padding: 20px 0;
  }
  //许愿
  .sub-wish {
    position: fixed;
    bottom: 100px;
    right: 40px;
    color: #ffffff;
    width: 100px;
    height: 100px;
    line-height: 100px;
    border-radius: 50%;
    background-color: $lightBlue;
    opacity: 0.8;
    box-shadow: 0 0 6px #000000;
    .icon-msnui-add-line {
      font-size: 40px;
    }
  }
  .wishes {
    margin: 20px 0 0 20px;
    .notes {
      margin: 20px 20px;
    }
    .line {
      width: 100%;
      height: 2px;
      background-color: #eeeeee;
      margin: 30px 0;
    }
  }
}
</style>

