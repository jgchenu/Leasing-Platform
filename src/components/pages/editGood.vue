<template>
  <div class="loan">
      <banner>物品修改</banner>
      <div class="form"> 
        <div class="good-name">
          <label>物品名称:</label><input type="text" v-model="goodName">
        </div>
        <div class="good-selects">
          <span>分类:</span>
          <select name="types" class="types" v-model="zone">
            <option>体育器材</option>
            <option>正装</option>
            <option>书籍</option>
            <option>技能</option>
            <option>其他</option>
          </select>
        <!-- <mt-picker :slots="types" :visibleItemCount=3 @change="onValuesChange" ></mt-picker> -->
        </div>
          <div class="good-desc">
          <textarea name="describe" id="describe" cols="30" rows="6" placeholder="对物品的详细描述/对租借者想说的话等，可以让别人更加了解你的物品，增加被租借几率哦" v-model="desc"></textarea>
        </div>
          <div class="good-deposit">
          <label>押金:</label><input type="number" v-model="deposit">元
        </div>
          <div class="good-rent">
          <label>租金:</label>
          <input type="radio" id="first" value="first" v-model="selected">
          <input type="number" :disabled="selected=='second'" v-model="rentalFirst">
          <select name="types" class="types" :disabled="selected=='second'" v-model="rentalTime">
            <option>元/天</option>
            <option>元/周</option>
            <option>元/月</option>
            <option>元/年</option>
          </select>
          <br/>
          <input type="radio" id="second" value="second" v-model="selected" >
          <input type="text" class="second-price" :disabled="selected=='first'" v-model="rentalSecond"><span>（自定义，例如一杯奶茶等）</span>
        </div>
        <div class="good-place">
          <label>校区:</label>          
          <select name="types" class="types" v-model="address">
            <option>后海校区</option>
            <option>西丽校区</option>
            <option>西丽/后海校区均可</option>
            <option>其他</option>
          </select>
        </div>
          <div class="good-date">
          <label>可租用日期:</label><input type="date" v-model="beginDate">-<input type="date" v-model="endDate">
        </div>
      </div>

        <p id="rules" style="display:none;">
       《租租侠条例》<br/>
        温馨提示：<br/>
        1.	请选择白天人多的地方进行交易,例如:北图南图等。<br/>
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
      <my-button class="submit" @click.native="sub">确认修改</my-button>
</div>
</template>

<script>
// import lrz from "../../../node_modules/lrz/dist/lrz.all.bundle";
import banner from "@/components/comm/banner.vue";
import myButton from "@/components/comm/myButton.vue";
import { MessageBox } from "mint-ui";
import cropper from "@/components/comm/cropper";
export default {
  mounted() {
    document.body.scrollTop = 0;
    let tid = this.$route.query.tid;
    this.$axios({
      method: "get",
      url: `/zzx/api/thing/${tid}`
    })
      .then(res => {
        let thing = res.data.retdata.thingDetail;
        this.goodName = thing.name;
        this.zone = thing.zone;
        this.desc = thing.instruction;
        this.deposit = thing.deposit;
        this.address = thing.address;
        this.beginDate = thing.tenancy_begin;
        this.endDate = thing.tenancy_end;
        this.rentalSecond = thing.rental;
        console.log(res);
      })
      .catch(err => {
        console.log("catch error", err.response);
      });
  },
  data() {
    return {
      goodName: "",
      zone: "体育器材",
      selected: "second",
      fileImage: "",
      desc: "",
      beginDate: "",
      endDate: "",
      deposit: "",
      popupVisible: false,
      address: "后海校区",
      rentalFirst: 0,
      rentalSecond: "",
      rentalTime: "元/周",
      rental: ""
    };
  },
  components: {
    banner,
    myButton,
    cropper
  },
  methods: {
    sub() {
      new Promise((resolve, reject) => {
        if (this.goodName.length >= 9 || !this.goodName) {
          this.goodName.length
            ? reject("物品名称的字段长度不能超过8个哦")
            : reject("请填写物品名称");
        } else if (/^[ \n]+$/.test(this.goodName)) {
          reject("请不要输入非法空白/换行字符");
        } else if (this.desc.length >= 150 || !this.desc) {
          this.desc ? reject("详细描述在150字以内") : reject("请填写详细描述");
        } else if (/^[ \n]+$/.test(this.desc)) {
          reject("请不要输入非法空白/换行字符");
        } else if (!/\d/.test(this.deposit)) {
          reject("请填写押金数字哦");
        } else if (this.deposit.length >= 9) {
          reject("押金的字段长度不能超过8个哦");
        } else if (!/\d/.test(this.rentalFirst) && this.selected == "first") {
          reject("该选项租金须填写为数字哦");
        } else if (this.selected == "second" && !this.rentalSecond) {
          reject("请填写该选项押金的文字说明");
        } else if ( (this.selected == "first" && this.rentalFirst.length >= 6) ||
          (this.rentalSecond.length >= 9 && this.selected == "second")) {
          reject("租金的字段长度不能超过8个哦");
        } else if (!this.beginDate || !this.endDate) {
          reject("请填写日期");
        } else if (
          new Date(this.endDate).getTime() < new Date(this.beginDate).getTime()
        ) {
          let temp = this.beginDate;
          this.beginDate = this.endDate;
          this.endDate = temp;
          reject("日期前后不对，已经进行调换");
        } else if (
          new Date(this.endDate).getTime() <=
          new Date().getTime() - 86400000
        ) {
          reject("结束日期不能小于当前的时间");
        } else {
          MessageBox.confirm(
            `<p style="overflow:scroll">我已确认信息无误，并同意<br/><a style='color:#000;font-size:12px;text-align:left' onclick="this.innerHTML=document.getElementById('rules').innerHTML">《租租侠条款》</a></p>`
          ).then(
            sure => {
              resolve();
            },
            cancel => {
              reject("取消修改");
            }
          );
        }
      }).then(
        success => {
          new Promise(resolve => {
            if (this.selected === "first") {
              this.rental = this.rentalFirst + this.rentalTime;
            } else {
              this.rental = this.rentalSecond;
            }
            resolve();
          }).then(() => {
            let tid = this.$route.query.tid;
            this.$axios({
              method: "POST",
              url: `/zzx/api/thing/${tid}`,
              data: {
                name: this.goodName,
                zone: this.zone,
                instruction: this.desc,
                deposit: this.deposit,
                rental: this.rental,
                address: this.address,
                tenancy_begin: this.beginDate,
                tenancy_end: this.endDate
              }
            })
              .then(res => {
                MessageBox.alert("修改成功").then(() => {
                  // let tid = this.$route.query.tid;
                  // this.$router.replace({
                  //   path: "/goodDetail",
                  //   query: { tid: tid }
                  // });
                  this.$router.go(-1);
                });
              })
              .catch(err => {
                console.log("catch error", err.response.data);
                alert(err.response.data);
              });
            // this.$router.push({ path: "/enter/main" });
          });
        },
        fail => {
          MessageBox("提示", fail);
        }
      );
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
@import "../../assets/scss/form";
.mint-popup-1 {
  height: 600px;
}
</style>



