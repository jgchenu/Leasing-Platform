<template>
  <div class="wishRelease">
      <banner>我要许愿</banner>
      <div class="form"> 
        <div class="wish-name">
          <label>愿望:</label><input type="text" v-model="wishName">
        </div>
          <div class="wish-price">
          <label>报价:</label><input type="text" v-model="wishPrice">
        </div>
        <div class="wish-place">
          <label>校区:</label>          
          <select name="types" class="types" v-model="wishPlace">
            <option value="后海校区">后海校区</option>
            <option value="西丽校区">西丽校区</option>
            <option value="西丽/后海校区均可">西丽/后海校区均可</option>
            <option value="其他">其他</option>
          </select>
        </div>
          <div class="wish-desc">
          <textarea name="describe" id="describe" cols="40" rows="6" placeholder="其他描述，例如期限" v-model="wishDesc"></textarea>
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
      <my-button class="submit"   @click.native="release">发布</my-button>
</div>
</template>

<script>
import banner from "@/components/comm/banner.vue";
import myButton from "@/components/comm/myButton.vue";
import { MessageBox } from "mint-ui";
export default {
  mounted() {
    if (!this.getCookie("token")) {
      MessageBox.confirm("你还没有登录，需要登录后才能发布，点击跳转")
        .then(() => {
          this.$router.push({ path: "/user" });
        })
        .catch(() => {
          MessageBox.alert("你取消了登录");
        });
    } else if (this.getCookie("token")) {
      this.$axios({
        method: "get",
        url: "/zzx/api/user"
      })
        .then(res => {
          if (res.data.retdata.userInfo.hasAll == 0) {
            MessageBox.alert("你还没有完善信息，需要完善个人信息才能发布").then(
              () => {
                this.$router.replace({ path: "/infoEdit" });
              }
            );
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  data() {
    return {
      wishName: "",
      wishPrice: "",
      wishDesc: "",
      wishPlace: "后海校区"
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    release() {
      new Promise((resolve, reject) => {
        if (this.wishName.length >= 9 || !this.wishName) {
          this.wishName
            ? reject("愿望的字段长度不能超过8个哦")
            : reject("请填写愿望名称");
        } else if (/^[ \n]+$/.test(this.wishName)) {
          reject("请不要输入非法空白/换行字符");
        } else if (!this.wishPrice) {
          reject("请填写报价哦");
        } else if (this.wishPrice.length >= 9) {
          reject("报价的字段长度不能超过8个哦");
        } else if (this.wishDesc.length >= 150 || !this.wishDesc) {
          this.desc ? reject("详细描述在150字以内") : reject("请填写详细描述");
        } else if (/^[ \n]+$/.test(this.wishDesc)) {
          reject("请不要输入非法空白/换行字符");
        } else {
          MessageBox.confirm(
            `<p style="overflow:scroll">我已确认信息无误，并同意<a style='color:#000;font-size:12px;text-align:left' onclick="this.innerHTML=document.getElementById('rules').innerHTML">《租租侠条款》</a></p>`
          ).then(
            sure => {
              resolve();
            },
            cancel => {
              reject("取消发布");
            }
          );
        }
      }).then(
        () => {
          this.$axios({
            method: "post",
            url: "/zzx/api/wish",
            data: {
              name: this.wishName,
              instruction: this.wishDesc,
              eval: this.wishPrice,
              address: this.wishPlace
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.retcode === 20040308) {
                MessageBox.alert(res.data.retmsg);
              } else if (res.data.retcode === 200200) {
                MessageBox.alert("发布成功").then(() => {
                  this.$router.replace({ path: "/wishWall" });
                });
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        },
        fail => {
          MessageBox("提示", fail);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.wishRelease {
  padding-bottom: 40px;
  .banner {
    position: relative;
  }
  .submit {
    width: 200px;
    height: 80px;
    margin: 10px auto;
  }
  .form {
    margin-top: 10px;
    //物品名称，物品押金,租用日期
    .wish-name,
    .wish-price,
    .wish-rent,
    .wish-date,
    .wish-place,
    .wish-img {
      height: 50px;
      border: none;
      font-size: 30px;
      color: $lightBlue;
      line-height: 60px;
      padding-left: 40px;
      margin-top: 40px;
      font-weight: bolder;
      input {
        margin-left: 20px;
        width: 300px;
        border: 0;
        border-radius: 0;
        outline: none;
        font-size: 30px;
        border-bottom: 1px solid $lightBlue;
        -webkit-appearance: normal;
      }
    }

    //物品描述
    .wish-desc {
      padding-left: 20px;
      margin-top: 40px;
      textarea {
        outline: none;
        border: 1px solid $lightBlue;
        border-radius: 18px;
        font-size: 30px;
        margin-left: 20px;
        width: 660px;
        -webkit-appearance: none;
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
    .wish-place {
      select {
        border: 1px solid #aaaaaa;
        background-color: #ffffff;
        color: #aaaaaa;
        height: 50px;
      }
      option {
        background-color: #ffffff;
        color: #aaaaaa;
      }
    }
  }
}
</style>



