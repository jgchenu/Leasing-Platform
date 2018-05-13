<template>
  <div class="goodDetail">
    <banner>物品详情</banner>
    <img v-lazy="goodDetail.img_url||'http://wx.mrrent.cn/assets/zuzuxia/load.GIF'" :alt="goodDetail.name" class="goodImg">
        <div class="form"> 
        <div class="good-name">
          <label>物品名称:</label><span>{{goodDetail.name}}</span>
        </div>
          <div class="good-desc">
         <p>{{goodDetail.instruction}}</p>
        </div>
          <div class="good-deposit">
          <label>押金:</label><span>{{goodDetail.deposit}}元</span>
        </div>
          <div class="good-rent">
          <label>租金:</label><span>{{goodDetail.rental}}</span>
        </div>
        <div class="good-place">
          <label>校区:</label>
         <span>{{goodDetail.address}}</span>
        </div>
          <div class="good-date">
          <label>可租用日期:</label>
           <!-- <br/>          -->
          <span>{{goodDetail.tenancy_begin}} ~ {{goodDetail.tenancy_end}}</span>
          <!-- <input type="date" :disabled="isEdit" v-model="goodDetail.tenancy"> -->
        </div>
        </div>

           <p id="rules" style="display:none;">
        《租租侠条例》<br/>
        温馨提示：<br/>
        1.	请选择白天人多的地方进行交易,例如:北图南图等; <br/>
        2.	请注意核对对方的校园卡号;<br/>
        3.	请您爱护租借或者出租的物品，不要随意转借给他人。<br/>
        接下来请阅读租租侠平台免责声明条例的主要信息：<br/>
        1.	您使用租租侠平台服务，即视为您与租租侠平台缔结本协议，本协议即对您产生约束。<br/>
        2.	租租侠对用户及任何第三方不承担任何责任，用户使用租租侠网络服务而产生的一切后果有其本人承担。<br/>
        3.	用户须独立承担由于使用网络服务产生的风险。 <br/>
        4.	租租侠不保证为向用户提供便利而设置的外部链接的准确性和完整性，对于该等外部链接指向的不由租租侠实际控制的任何网页上的内容不承担任何责任。<br/>
        5.	对于因不可抗力或租租侠不能控制的原因造成的网络服务中断或其它缺陷，租租侠不承担任何责任。<br/>
        6.	租租侠对于任何自本网站而获得的他人的信息、内容或者广告宣传等任何资讯不保证真实、准确和完整性，用户须自行甄别真伪和谨慎预防风险。<br/>
        7.	用户同意后，对于租租侠向用户提供或附赠的服务和产品的质量缺陷本身及其引发的任何损失、用户资料遭到未授权的使用或修改以及其他与租租侠网站相关的事宜，租租侠无需承担任何责任。<br/>
        8.	租租侠对租赁商进行资质审核，但不保证租赁商线上产品内容的与线下产品完全一致，租户与租赁商线下交易发生任何损失，租租侠网络平台无需负责。<br/>
        9.	用户或其他媒体不得对本平台内容进行转载、修改、传播、制作衍生作品或者商业使用。<br/>
        10.	用户应妥善保管账户及密码信息，如用户将密码告知他人或与他人共享同一ID，从而导致任何资料泄露、积分丢失等任何损失，由用户自行承担。<br/>
        11.	对于任何用户通讯或个人化设定之失效、删除、传递错误、未予储存或其他任何问题，租租侠平台均不承担任何责任。<br/>
        12.	租赁物品时，若转借给第三方，造成的一切后果，平台一律不承担。<br/>
        13.	本平台有权在任何时候，修改或暂停、终止本平台全部或部分服务，对此用户可以理解和接受。<br/>
      </p>   
    <myButton class="sureBorrow" v-if="goodDetail.isOwner!=1&&goodDetail.isRenter!==1" @click.native="getMessage">确认租入</myButton>
    <myButton class="getMess" v-if="goodDetail.isOwner==1&&goodDetail.isRented===1||goodDetail.isRenter===1" @click.native="getOrderMessage">获取联系方式</myButton>
    <myButton class="addFavo" v-if="goodDetail.isOwner!=1&&goodDetail.isCollected!=1" @click.native="addCollect">加入收藏</myButton>
    <myButton class="addFavo" v-if="goodDetail.isOwner!=1&&goodDetail.isCollected==1">已经收藏</myButton>
    <myButton class="sureEdit" v-if="goodDetail.isOwner==1&&goodDetail.isRented==0" @click.native="toEdit">编辑修改</myButton>
    <myButton class="underShelf" v-if="goodDetail.isOwner==1&&goodDetail.isRented==0" @click.native="underShelf">确认下架</myButton>
    <myButton class="sureBack" v-if="goodDetail.isOwner==1&&goodDetail.isRented===1" @click.native="sureBack">确认归还</myButton>
  </div>
</template>

<script>
import banner from "@/components/comm/banner.vue";
import myButton from "@/components/comm/myButton.vue";
import { MessageBox } from "mint-ui";
export default {
  mounted() {
    document.body.scrollTop = 0;
    console.log(this.$route.query.tid);
    this.refresh();
  },
  data() {
    return {
      goodDetail: {}
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    getMessage() {
      let tid = this.$route.query.tid;
      MessageBox.confirm(
        `<p style="overflow:scroll">我已确认信息无误，并同意<a style='color:#000;font-size:12px;text-align:left' onclick="this.innerHTML=document.getElementById('rules').innerHTML">《租租侠条款》</a></p>`
      )
        .then(() => {
          this.$router.push({
            path: "/getMessage",
            query: { tid: tid, isOrder: 0 }
          });
        })
        .catch(() => {
          MessageBox.alert("你取消了租用");
        });
    },
    toEdit() {
      let tid = this.$route.query.tid;
      this.$router.push({ path: "/editGood", query: { tid: tid } });
    },
    underShelf() {
      MessageBox.confirm("下架后您的物品将不予显示，是否确认下架？").then(
        sure => {
          let tid = this.$route.query.tid;
          this.$axios({
            method: "post",
            url: `/zzx/api/thing/${tid}/del`
          })
            .then(res => {
              if (res.data.retcode === 200200) {
                MessageBox.alert("下架成功").then(() => {
                  this.$router.replace({ path: "/rent" });
                  window.location.reload();
                });
              } else if (res.data.retcode === 20040308) {
                MessageBox(res.data.retmsg);
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        },
        cancel => {
          MessageBox("提示", "你取消了下架");
        }
      );
    },
    addCollect() {
      new Promise(resolve => {
        let tid = this.$route.query.tid;
        resolve(tid);
      }).then(tid => {
        this.$axios({
          method: "post",
          url: `/zzx/api/thing/${tid}/fav`
        }).then(res => {
          console.log(res);
          if (res.data.retcode === 200200) {
            MessageBox("提示", "收藏成功").then(() => {
             this.refresh();
            });
          } else if (res.data.retcode === 20040308) {
            MessageBox(
              "提示",
              "您需要先完善用户信息才可以继续操作哦~ 如有疑问，请微信联系租租侠小助手(Mr-rent)"
            );
          }
        });
      });
    },
    getOrderMessage() {
      let tid = this.$route.query.tid;
      this.$router.push({
        path: "/getMessage",
        query: { tid: tid, isOrder: 1 }
      });
    },
    sureBack() {
      let tid = this.$route.query.tid;
      MessageBox.confirm("是否确认已经归还?").then(
        () => {
          this.$axios({
            url: `/zzx/api/thing/${tid}/return`,
            method: "post"
          })
            .then(res => {
              if (
                res.data.retcode === 20040314 ||
                res.data.retcode === 20050003
              ) {
                MessageBox.alert(res.data.retmsg);
              } else if (res.data.retcode === 200200) {
                MessageBox.alert("归还成功").then(() => {
                  this.$router.go(-1);
                });
              }
            })
            .catch(err => {});
        },
        () => {
          MessageBox.alert("取消了归还");
        }
      );
    },
    refresh() {
      let tid = this.$route.query.tid;
      this.$axios({
        method: "get",
        url: `/zzx/api/thing/${tid}`
      })
        .then(res => {
          console.log("detail", res);
          this.goodDetail = res.data.retdata.thingDetail;
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  computed: {
    isEdit() {
      return this.goodDetail.isOwner != 1;
    }
  },
  destroyed() {
    document.body.scrollTop = sessionStorage.getItem("goodScroll");
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.goodDetail {
  padding-top: 100px;
  padding-bottom: 40px;
  overflow: hidden;
  .banner {
    position: fixed;
    z-index: 10;
    top: 0;
  }
  .sureBorrow,
  .addFavo,
  .sureEdit,
  .underShelf,
  .getMess,
  .sureBack {
    display: inline-block;
    width: 240px;
    margin: 60px 0 60px 80px;
    font-size: 36px;
  }
  // .getMess{
  //   display: block;
  //   margin: 60px auto;
  // }
  .goodImg {
    display: block;
    margin: 10px auto 0 auto;
    width: 670px;
    height: 670px;
    border-radius: 12px;
  }
  img[lazy="loading"] {
    width: 100%;
    height: 670px;
    margin: auto;
    background: url("http://wx.mrrent.cn/assets/zuzuxia/load.GIF")
      no-repeat;
    background-position: center center;
    background-size: 200px;
  }
  .form {
    margin-top: 10px;
    //物品名称，物品押金,租用日期
    .good-name,
    .good-deposit,
    .good-rent,
    .good-date,
    .good-place,
    .good-img {
      height: 50px;
      border: none;
      font-size: 30px;
      color: $lightBlue;
      line-height: 60px;
      padding-left: 40px;
      margin-top: 30px;
      font-weight: bolder;
      span {
        color: #000000;
        font-weight: normal;
        margin-left: 20px;
      }
    }

    //物品描述
    .good-desc {
      padding-left: 20px;
      margin-top: 40px;
      p {
        width: 680px;
        font-size: 30px;
        margin: 0 auto;
        color: #aaaaaa;
      }
    }
    //物品押金，物品租金
    .good-deposit,
    .good-rent,
    .good-place {
      margin-top: 30px;
      select:disabled {
        background-color: #ffffff;
      }
      input {
        width: 120px;
        &:disabled {
          background-color: #ffffff;
        }
      }
    }
    .good-date {
      input {
        margin: 0 10px;
        color: #aaaaaa;
        display: inline-block;
        width: 280px;
        height: 40px;
        font-size: 30px;
        border: 1px solid #dddddd;
        outline: none;
        font-weight: bolder;
        option {
          display: inline-block;
          background-color: #fff;
        }
      }
      input:disabled {
        color: #000;
      }
    }
  }
}
</style>

