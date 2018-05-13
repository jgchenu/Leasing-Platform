<template>
  <div class="wishDetail">
    <banner>愿望详情</banner>
        <div class="form"> 
        <div class="wish-name">
          <label>愿望:</label><span>{{wishDetail.name}}</span>
        </div>
        <div class="wish-rent">
          <label>报价:</label><span>{{wishDetail.eval}}</span>
        </div>
          <div class="wish-desc">
          <p>{{wishDetail.instruction}}</p>
        </div>
        <div class="wish-place">
          <label>校区:</label><span>{{wishDetail.address}}</span>
        </div>
        <div class="wish-date">
          <label>许愿时间:</label><span>{{wishDetail.publish_time}}</span>
        </div>
        <div class="wish-sex">
          <label>性别:</label><span>{{wishDetail.ownerSex==1?"男":wishDetail.ownerSex==0?"女":"未知"}}</span>
        </div>
        </div>
    <myButton class="getWish" v-if="wishDetail.isOwner!=1&&wishDetail.isProvider!=1" @click.native="pickWish">帮Ta实现</myButton>
    <!-- <myButton class="sureEdit" v-if="wishDetail.isOwner==1">确认修改</myButton> -->
    <myButton class="sureDel" v-if="wishDetail.isOwner===1&&wishDetail.isGot===0" @click.native="delWish">删除愿望</myButton>
    <myButton class="getOwn" v-if="wishDetail.isOwner===1&&wishDetail.isGot===1||wishDetail.isProvider===1" @click.native="getMessage">获取联系方式</myButton>
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
  </div>
</template>

<script>
import banner from "@/components/comm/banner.vue";
import myButton from "@/components/comm/myButton.vue";
import { MessageBox } from "mint-ui";
export default {
  mounted() {
    console.log(this.$route.query.wid);
    let wid = this.$route.query.wid;
    this.$axios({
      url: `/zzx/api/wish/${wid}`,
      method: "get"
    })
      .then(res => {
        console.log(res);
        if (!res.data.retdata) {
          alert(res.data.retmsg);
          this.$router.go(-1);
        } else {
          this.wishDetail = res.data.retdata.wishDetail;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      wishDetail: {}
    };
  },
  components: {
    banner,
    myButton
  },
  computed: {
    isEdit() {
      return this.wishDetail.isOrder != 1;
    }
  },
  methods: {
    getMessage() {
      let wid = this.$route.query.wid;
      this.$router.push({
        path: "/getMessage",
        query: { isOrder: 1, wid: wid }
      });
    },
    delWish() {
      MessageBox.confirm("是否确认删愿望").then(
        sure => {
          let wid = this.$route.query.wid;
          this.$axios({
            method: "post",
            url: `/zzx/api/wish/${wid}/del`
          })
            .then(res => {
              if (res.data.retcode === 200200) {
                MessageBox.alert("删除愿望成功").then(() => {
                  this.$router.replace({ path: "/wishWall" });
                });
              } else if (res.data.retcode === 20040308) {
                MessageBox(
                  "提示",
                  "您需要先完善用户信息才可以继续操作哦~ 如有疑问，请微信联系租租侠小助手(Mr-rent)"
                );
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        },
        cancel => {
          MessageBox("提示", "你取消了删除");
        }
      );
    },
    pickWish() {
      let wid = this.$route.query.wid;

      MessageBox.confirm(
        `<p style="overflow:scroll">我已确认信息无误，并同意<a style='color:#000;font-size:12px;text-align:left' onclick="this.innerHTML=document.getElementById('rules').innerHTML">《租租侠条款》</a></p>`
      )
        .then(() => {
          this.$router.push({
            path: "/getMessage",
            query: { isOrder: 0, wid: wid }
          });
        })
        .catch(() => {
          MessageBox.alert("你取消了实现");
        });

      // MessageBox.confirm("是否领取愿望？")
      //   .then(() => {
      //     this.$router.push({
      //       path: "/getMessage",
      //       query: { isOrder: 0, wid: wid }
      //     });
      //   })
      //   .catch(() => {
      //     MessageBox.alert("你取消了领取");
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.wishDetail {
  padding-bottom: 40px;
  .banner {
    position: relative;
  }
  .getWish,
  .addFavo,
  .sureEdit,
  .sureDel,
  .getOwn {
    width: 220px;
    position: absolute;
    bottom: 100px;
    right: 40px;
  }
  .getOwn {
    width: 300px;
  }
  .wishImg {
    display: block;
    margin: 20px auto 0 auto;
    width: 670px;
    height: 400px;
    border-radius: 12px;
  }
  .form {
    margin-top: 10px;
    //物品名称，物品押金,租用日期
    .wish-name,
    .wish-deposit,
    .wish-rent,
    .wish-date,
    .wish-place,
    .wish-img,
    .wish-date,
    .wish-sex {
      height: 50px;
      border: none;
      font-size: 30px;
      color: $lightBlue;
      line-height: 60px;
      padding-left: 40px;
      margin-top: 40px;
      font-weight: bolder;
      span {
        color: #000000;
        font-weight: normal;
        margin-left: 20px;
      }
    }

    //物品描述
    .wish-desc {
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
    .wish-deposit,
    .wish-rent,
    .wish-place {
      margin-top: 30px;
      input {
        width: 300px;
      }
    }
    .wish-date {
      input {
        width: 400px;
      }
    }
  }
}
</style>

