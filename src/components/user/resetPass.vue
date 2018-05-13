<template>
  <div class="reset">
      <banner>密码确认</banner>
      <p class="resetPass"><label>密码:</label><input type="password" v-model="password" placeholder="输入密码"></p>
      <p class="resetPassSure"><label>密码确认:</label><input type="password" v-model="repassword" placeholder="密码确认"></p>
      <myButton class="resetButton" @click.native="finishReset">完成修改</myButton>
            <img class="stock"  src="http://zzx-1252763483.cosgz.myqcloud.com/img/bg2.jpg">
  </div>
</template>

<script>
import banner from "@/components/comm/banner";
import myButton from "@/components/comm/myButton";
import { MessageBox, Indicator } from "mint-ui";
export default {
  data() {
    return {
      tip: "发送验证码",
      noSend: false,
      password: "",
      repassword: ""
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    finishReset() {
      new Promise((resolve, reject) => {
        if (!/^\w{6,16}$/.test(this.password)) {
          reject("请输入6至16位数字字母组成的密码");
        } else if (this.repassword !== this.password) {
          reject("两次密码输入不一致");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            url: "/zzx/api/user/reset",
            method: "post",
            data: {
              sign: Base64.encode(
                Base64.encode(sessionStorage.getItem("sign"))
              ),
              ticket: Base64.encode(
                Base64.encode(sessionStorage.getItem("ticket"))
              ),
              pw: Base64.encode(Base64.encode(this.password))
            }
          })
            .then(res => {
              if (res.data.retcode === 200200) {
                MessageBox.alert("重置成功").then(() => {
                  this.$router.replace({ path: "/user" });
                });
              } else if (res.data.retcode === 20040311) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variable";
.reset {
  overflow: hidden;
  width: 100%;
  .banner {
    position: normal;
  }

  p {
    margin-top: 30px;
    height: 100px;
    line-height: 100px;
    text-indent: 140px;
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
  .resetPass {
    margin-top: 460px;
  }
  .resetPassSure {
    label {
      margin-left: -60px;
    }
  }
  .resetButton {
    width: 200px;
    margin: 100px auto 0 auto;
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
