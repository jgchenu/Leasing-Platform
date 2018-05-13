<template>
  <div class="registered">
      <banner>注册用户</banner>
      <p class="regName"><label>姓名:</label><input type="text" v-model="name" placeholder="输入姓名"></p>
      <p class="regNum"><label>学号:</label><input type="number" v-model.number="stuId" placeholder="输入学号"></p>
      <p class="regPhone"><label>手机:</label><input type="number" v-model.number="phone" placeholder="输入手机号"></p>
      <p class="regiPass"><label>密码:</label><input type="password" v-model="password" placeholder="输入密码"></p>
      <p class="regPassSure"><label>密码确认:</label><input type="password" v-model="repassword" placeholder="密码确认"></p>
      <p class="regVerCode"><label>验证码:</label><input type="number" v-model.number="verCode" placeholder="验证码"><button @click="sendVerCode" :disabled="noSend">{{tip}}</button></p>
      <myButton class="regButton" @click.native="registered">注册</myButton>
      <p class="tips">租租侠不将用户注册的所有个人信息以及注册后完善的信息用于其他用途或者出售，请各位用户放心注册</p>
            <img class="stock"  src="http://zzx-1252763483.cosgz.myqcloud.com/img/bg2.jpg">
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import myButton from "@/components/comm/myButton";
import { MessageBox, Indicator } from "mint-ui";
import { Base64 } from "js-base64";
export default {
  mounted() {},
  data() {
    return {
      tip: "发送验证码",
      noSend: false,
      name: "",
      stuId: "",
      phone: "",
      password: "",
      repassword: "",
      verCode: "",
      sign: ""
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    sendVerCode() {
      new Promise((resolve, reject) => {
        if (this.name.length > 8 || this.name.length < 1) {
          reject("请输入1到8位的姓名");
        } else if (!/^\d{9,16}$/.test(this.stuId)) {
          reject("请输入9-16位的合法学号");
        } else if (!/^1[345789]\d{9}$/.test(this.phone)) {
          reject("请输入合法的手机号");
        } else if (!/^\w{6,16}$/.test(this.password)) {
          reject("请输入6至16位数字字母组成的密码");
        } else if (this.repassword !== this.password) {
          reject("两次密码输入不一致");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.calTime();
          this.$axios({
            method: "post",
            url: "/zzx/api/user/register",
            data: {
              name: Base64.encode(Base64.encode(this.name)),
              stuNum: Base64.encode(Base64.encode(this.stuId)),
              account: Base64.encode(Base64.encode(this.phone)),
              pw: Base64.encode(Base64.encode(this.password))
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.retcode === 200200) {
                this.sign = res.data.retdata.sign;
                this.$axios({
                  method: "post",
                  url: "/zzx/api/user/register/sms",
                  data: {
                    sign: this.sign
                  }
                })
                  .then(res => {
                    if (res.data.retcode === 200200) {
                      MessageBox.alert("发送验证码成功");
                    } else if (
                      res.data.retcode === 20050002 ||
                      res.data.retcode === 20040316
                    ) {
                      MessageBox.alert(res.data.retmsg);
                    }
                  })
                  .catch(err => {
                    console.log(err.response);
                  });
              } else if (
                res.data.retcode === 20040310 ||
                res.data.retcode === 20050002
              ) {
                MessageBox.alert(res.data.retmsg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        tip => {
          MessageBox.alert(tip);
        }
      );
    },
    registered() {
      new Promise((resolve, reject) => {
        if (this.name.length > 8 || this.name.length < 1) {
          reject("请输入1到8位的姓名");
        } else if (!/^\d{9,16}$/.test(this.stuId)) {
          reject("请输入9-16位的合法学号");
        } else if (!/^1[345789]\d{9}$/.test(this.phone)) {
          reject("请输入合法的手机号");
        } else if (!/^\w{6,16}$/.test(this.password)) {
          reject("请输入6至16位数字字母组成的密码");
        } else if (this.repassword !== this.password) {
          reject("两次密码输入不一致");
        } else if (!/^\d{4}$/.test(this.verCode)) {
          reject("请输入4位数字验证码");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            method: "post",
            url: "/zzx/api/user/activate",
            data: {
              sign: this.sign,
              code: this.verCode
            }
          })
            .then(res => {
              console.log(res);

              if (res.data.retcode === 200200) {
                MessageBox.alert("注册成功，点击跳转").then(() => {
                  this.$router.replace({ path: "/user" });
                });
              } else if (
                res.data.retcode === 20040310 ||
                res.data.retcode === 20050002 ||
                res.data.retcode === 20040307 ||
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
.registered {
  display: table;
  width: 100%;
  .banner {
    position: normal;
  }
  p {
    height: 100px;
    line-height: 100px;
    text-indent: 120px;
    label {
      color: #ffffff;
      font-size: 30px;
    }
    input {
      margin-left: 40px;
      border: none;
      border-bottom: 3px solid #ffffff;
      border-radius: 0;
      outline: none;
      font-size: 30px;
      background-color: transparent;
      color: #ffffff;
    }
  }
  .regName {
    margin-top: 330px;
    input {
      width: 240px;
    }
  }
  .regPassSure {
    label {
      margin-left: -60px;
    }
  }
  .regVerCode {
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
  .regButton {
    width: 200px;
    margin: 20px auto 0 auto;
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
  p.tips {
    text-indent: 0;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    margin-top: 14px;
  }
}
</style>
