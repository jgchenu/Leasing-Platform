<template>
  <div class="infoEdit">
      <banner>信息完善</banner>

      <div class="infoMessage">
        <!-- <p><span class="name">姓名: </span><input type="text"></p>
        <p><span class="phone">电话: </span><input type="number"></p> -->
        <p><span class="college">学院: </span><input type="text" v-model="college"></p>
        <p><span class="card">卡号: </span><input type="number" v-model.number="card"></p>
        <p><span class="wechat">微信: </span><input type="text" v-model="wx	"></p>
        <p><span class="place">校区: </span>          
        <select v-model="address">
            <option>后海校区</option>
            <option>西丽校区</option>
            <option>西丽/后海校区均可</option>
            <option>其他</option>
          </select>
          </p>
        
        <p><span class="sex">性别: </span>
        <select v-model="sex">
            <option>男</option>
            <option>女</option>
          </select>
          </p>
      </div>
      <myButton @click.native="save">保存</myButton>
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import myButton from "@/components/comm/myButton";
import { MessageBox } from "mint-ui";
import { Base64 } from "js-base64";
export default {
  mounted() {

  },
  data() {
    return {
      address: "后海校区",
      sex: "男",
      college: "",
      wx: "",
      card: ""
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    toEdit() {
      console.log(1);
    },
    save() {
      new Promise((resolve, reject) => {
        if (this.college.length > 12 || this.college.length < 1) {
          reject("请输入1到12位的学院名");
        } else if (!/^\d{1,10}$/.test(this.card)) {
          reject("请输入1-10位的合法卡号");
        } else if (!/^[\w_-]{6,20}$/.test(this.wx)) {
          reject("请输入正确的微信号(6-20位的数字字母下划线减号)");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            method: "post",
            url: "/zzx/api/user",
            data: {
              college: Base64.encode(Base64.encode(this.college)),
              address: Base64.encode(Base64.encode(this.address)),
              card: Base64.encode(Base64.encode(this.card)),
              sex: Base64.encode(Base64.encode(this.sex == "男" ? 1 : 0)),
              wx: Base64.encode(Base64.encode(this.wx))
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.retcode === 200200) {
                MessageBox.alert("完善成功，点击跳转").then(() => {
                  this.$router.replace({ path: "/info" });
                });
              } else if (res.data.retcode === 20040312) {
                MessageBox.alert(res.data.retmsg).then(() => {
                  this.$router.go(-1);
                });
              }
            })
            .catch(err => {
              console.log(err.response);
            });
        },
        tip => {
          MessageBox.alert(tip);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.infoEdit {
  .banner {
    position: relative;
  }
  .icon-bianji {
    position: absolute;
    right: 60px;
    top: 130px;
    font-size: 40px;
  }
  .infoMessage {
    margin-top: 100px;
    text-indent: 100px;
    font-size: 40px;
    p {
      height: 100px;
      line-height: 100px;
      color: #000;
      span {
        height: 100px;
        color: $lightBlue;
        font-weight: bold;
        line-height: 100px;
      }
      input {
        font-size: 36px;
        color: #000;
        border: none;
        border-bottom: 2px solid $lightBlue;
        border-radius: 0;
        outline: none;
      }

      select {
        color: #000000;
        display: inline-block;
        width: auto;
        height: 50px;
        font-size: 30px;
        border: 1px solid #dddddd;
        outline: none;
        background-color: #fff;
        option {
          width: 100px;
          display: inline-block;
          background-color: #fff;
        }
      }
    }
  }
  .myButton {
    display: block;
    margin: 100px auto;
  }
}
</style>
