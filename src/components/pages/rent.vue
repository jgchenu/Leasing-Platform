<template>
      <mt-loadmore :top-method="loadTop" ref="loadmore" class="mt-loadmore" :autoFill="false" :topDistance="40"  :bottom-all-loaded="false" >
      
      <div class="rent">    

      <banner>我要租借</banner>

      <div class="search">
          <input type="text" class="search-input" placeholder="请输入搜索的物品" @keyup.enter="search" v-model="searchVal" v-focus>
          <i class="iconfont icon-search" @click="search"></i>
      </div>
     
      <ul class="types">
          <li v-for="(item,index) in types" :key="item.id" :class="{selected:item.selected}" @click="choseType(index)">{{item.type}}</li>
      </ul>
     
       
      <div class="goods" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="400" infinite-scroll-immediate-check="false">

          <div class="good" v-for="item in goods" :key="item.id" @click="goDetail(item)">
              <img v-lazy="item.smallimg_url" :alt="item.name" class="good-img" lazy="loading">
              <p class="good-title">{{item.name}}</p>          
          </div>
         
      </div>
       <p class="no-resourse">{{noResourse}}</p>
       

  </div>
   </mt-loadmore>
</template>

<script>
import {
  Loadmore,
  InfiniteScroll,
  Indicator,
  Lazyload,
  MessageBox
} from "mint-ui";
import banner from "@/components/comm/banner.vue";
import myButton from "@/components/comm/myButton.vue";
export default {
  mounted() {
    this.types[0].selected = true;
    this.choseType(0);
  },
  data() {
    return {
      types: [
        { type: "体育器材", selected: false },
        { type: "正装", selected: false },
        { type: "书籍", selected: false },
        { type: "技能", selected: false },
        { type: "其他", selected: false }
      ],
      goods: [],
      selected: false,
      allLoaded: false,
      searchVal: "",
      noResourse: "",
      nextUrl: "",
      loading: false,
      isAt: true
    };
  },
  components: {
    banner,
    Loadmore,
    myButton
  },
  // watch: {
  //   $route: "changeLoading"
  // },
  methods: {
    changeLoading() {
      this.loading = !this.loading;
    },
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
      // window.location.reload();
      let index;
      this.types.forEach((el, num) => {
        if (el.selected) index = num;
      });
      this.choseType(index);
    },
    choseType(index) {
      this.types.forEach((el, num) => {
        num == index ? (el.selected = true) : (el.selected = false);
      });
      this.$axios({
        method: "get",
        url: "/zzx/api/thing",
        params: { zone: encodeURI(this.types[index].type) }
      })
        .then(res => {
          console.log("search", res);
          if (res.data.retdata.things.length == 0) {
            this.noResourse = "暂无此类物品，请换个类别试试！";
          } else if (!res.data.retdata.page.next) {
            this.noResourse = "已经到底了";
          } else {
            this.noResourse = "";
          }
          this.goods = res.data.retdata.things;
          this.nextUrl = res.data.retdata.page.next;
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMore() {
      if (!this.isAt) return;
      console.log("more", this.nextUrl);
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
            res.data.retdata.things.forEach(el => {
              this.goods.push(el);
              console.log(el);
            });
            this.loading = false;
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    },
    goDetail(item) {
      this.$router.push({ path: "/goodDetail", query: { tid: item.tid } });
      sessionStorage.setItem("goodScroll", document.body.scrollTop);
    },
    search() {
      if (!this.searchVal) {
        MessageBox("提示", "搜索不能为空");
        return;
      } else {
        this.types.forEach(el => {
          el.selected = false;
        });
        this.$axios({
          method: "get",
          url: "/zzx/api/thing/search",
          params: { content: encodeURI(this.searchVal) }
        })
          .then(res => {
            console.log("search", res);
            if (res.data.retdata.things.length == 0) {
              this.noResourse = "暂无此类物品，请换个词试试！";
              console.log("暂无资源");
            } else {
              this.noResourse = "";
            }
            this.goods = res.data.retdata.things;
            this.nextUrl = res.data.retdata.page.next;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    refresh() {
      window.location.reload();
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(document.body.scrollTop);
    document.body.scrollTop=0;
    // document.body.scrollTop = sessionStorage.getItem("goodScroll");
    next(vm => {
      vm.loading = false;
      vm.isAt = true;
    });
  },
  beforeRouteLeave(to, from, next) {
    this.loading = false;
    this.isAt = false;
    next();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.rent {
  // height: 100%;
  width: 100%;
  overflow: hidden;

  .banner {
    position: fixed;
  }

  //搜索提示
  .no-resourse {
    text-align: center;
    color: #cccccc;
    font-size: 30px;
    padding: 20px 0;
  }
  .refresh {
    position: fixed;
    z-index: 11111;
    bottom: 100px;
    right: 40px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    line-height: 100px;
    box-shadow: 0px 0px 10px #bbbbbb;
    .icon-icon-refresh {
      font-size: 40px;
    }
  }
  //搜索
  .search {
    margin-top: 100px;
    width: 100%;
    height: 100px;
    background-color: #cce9f5;
    line-height: 100px;
    position: relative;
    .search-input {
      margin: 0 30px;
      width: 660px;
      height: 60px;
      border: none;
      font-size: 26px;
      border-radius: 60px;
      line-height: 60px;
      padding-left: 30px;
      outline: none;
    }
    .icon-search {
      position: absolute;
      right: 40px;
      top: 0;
      color: #000000;
    }
  }
  //类别
  .types {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 0;
    li {
      text-align: center;
      flex-grow: 1;
      color: #aaaaaa;
      padding-bottom: 20px;
    }
    .selected {
      color: $lightBlue;
      border-bottom: 1px solid $lightBlue;
    }
  }
  //商品
  .goods {
    background-color: #eeeeee;
    width: 100%;
    overflow: hidden;
    .good {
      overflow: hidden;
      display: inline-block;
      width: 230px;
      height: 240px;
      background-color: #ffffff;
      margin: 10px;
      border-radius: 10px;
      text-align: center;

      .good-img {
        width: 100%;
        height: 200px;
        border-radius: 10px 10px 0 0;
      }
      img[lazy="loading"] {
        width: 100%;
        height: 200px;
        margin: auto;
        background: url("http://wx.mrrent.cn/assets/zuzuxia/load.GIF")
          no-repeat;
        background-position: center center;
        background-size: 150px;
      }
      .good-title {
        text-align: center;
        display: block;
        line-height: 40px;
      }
    }
  }
}
</style>
