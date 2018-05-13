<template>
  <div class="forget">
      <banner>密码找回</banner>
      <p class="forgetName"><label>姓名:</label><input type="text" v-model="name" placeholder="输入姓名"></p>
      <p class="forgetNum"><label>学号:</label><input type="text" v-model.number="stuId" placeholder="输入学号"></p>
      <p class="forgetPhone"><label>手机:</label><input type="text" v-model.number="phone" placeholder="输入手机号"></p>
      <p class="forgetVerCode"><label>验证码:</label><input type="text" v-model.number="verCode" placeholder="验证码"><button @click="sendVerCode" :disabled="noSend">{{tip}}</button></p>
      <myButton class="forgetButton" @click.native="toResetPass">下一步</myButton>
      <img class="stock"  src="http://zzx-1252763483.cosgz.myqcloud.com/img/bg2.jpg">
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import myButton from "@/components/comm/myButton";
import { MessageBox, Indicator } from "mint-ui";
import { Base64 } from "js-base64";
export default {
  data() {
    return {
      tip: "发送验证码",
      noSend: false,
      name: "",
      stuId: "",
      phone: "",
      verCode: "",
      sign: ""
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    toResetPass() {
      this.next();
    },
    sendVerCode() {
      new Promise((resolve, reject) => {
        if (this.name.length > 8 || this.name.length < 1) {
          reject("请输入1到8位的姓名");
        } else if (!/^\d{9,16}$/.test(this.stuId)) {
          reject("请输入9-16位的合法学号");
        } else if (!/^1[345789]\d{9}$/.test(this.phone)) {
          reject("请输入合法的手机号");
        } else {
          this.calTime();
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            url: "/zzx/api/user/forget",
            method: "post",
            data: {
              account: Base64.encode(Base64.encode(this.phone)),
              name: Base64.encode(Base64.encode(this.name)),
              stuNum: Base64.encode(Base64.encode(this.stuId))
            }
          })
            .then(res => {
              if (res.data.retcode === 200200) {
                sessionStorage.setItem("sign", res.data.retdata.sign);
                this.sign = res.data.retdata.sign;
                this.$axios({
                  url: "/zzx/api/user/forget/sms",
                  method: "post",
                  data: {
                    sign: Base64.encode(Base64.encode(this.sign))
                  }
                }).then(res => {
                  if (res.data.retcode === 200200) {
                    MessageBox.alert("短信发送成功");
                  } else if (
                    res.data.retcode === 20050002 ||
                    res.data.retcode === 20040404 ||
                    res.data.retcode === 20040316
                  ) {
                    MessageBox.alert(res.data.retmsg);
                  }
                });
              } else if (
                res.data.retcode === 20050002 ||
                res.data.retcode === 20040404 ||
                res.data.retcode === 20040316
              ) {
                MessageBox.alert(res.data.retmsg);
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
    },
    next() {
      new Promise((resolve, reject) => {
        if (this.name.length > 8 || this.name.length < 1) {
          reject("请输入1到8位的姓名");
        } else if (!/^\d{9,16}$/.test(this.stuId)) {
          reject("请输入9-16位的合法学号");
        } else if (!/^1[345789]\d{9}$/.test(this.phone)) {
          reject("请输入合法的手机号");
        } else if (!/^\d{4}$/.test(this.verCode)) {
          reject("请输入4位数字验证码");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            url: "/zzx/api/user/code",
            method: "post",
            data: {
              sign: Base64.encode(
                Base64.encode(sessionStorage.getItem("sign"))
              ),
              code: Base64.encode(Base64.encode(this.verCode))
            }
          })
            .then(res => {
              if (res.data.retcode === 20040307) {
                MessageBox.alert(res.data.retmsg);
              } else if (res.data.retcode === 200200) {
                sessionStorage.setItem("ticket", res.data.retdata.ticket);
                MessageBox.alert("验证通过").then(() => {
                  this.$router.push({ path: "/resetPass" });
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
    },
    calTime() {
      this.noSend = true;
      let i = 100;
      let timer = setInterval(() => {
        this.tip = i + "秒";
        i--;
        if (i === 0) {
          clearInterval(timer);
          this.noSend = false;
          this.tip = "重新发送验证码";
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.forget {
  overflow: hidden;
  width: 100%;
  .banner {
    position: normal;
  }
  p {
    margin-top: 20px;
    height: 100px;
    line-height: 100px;
    text-indent: 150px;
    label {
      color: #ffffff;
      font-size: 30px;
    }
    input {
      margin-left: 20px;
      border: none;
      border-bottom: 3px solid #ffffff;
      border-radius: 0;
      outline: none;
      font-size: 30px;
      color: #ffffff;
      background-color: transparent;
    }
  }
  .forgetName {
    margin-top: 380px;
    input {
      width: 200px;
    }
  }
  .forgetVerCode {
    input {
      width: 120px;
    }
    button {
      margin-left: 20px;
      width: auto;
      height: 60px;
      line-height: 60px;
      background-color: rgb(255, 204, 51);
      outline: none;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 20px;
    }
    button:disabled {
      background-color: #aaaaaa;
    }
  }
  .forgetButton {
    width: 200px;
    margin: 100px auto;
    background-color: rgb(255, 204, 51);
    border-radius: 40px;
  }
  .stock {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: 1;
  }
}
</style>
