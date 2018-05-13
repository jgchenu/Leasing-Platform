<template>
  <div class="user">
      <banner>用户</banner>

      <div class="inputs">
          <div class="phone">
              <label>手机: </label>
              <input type="number" placeholder="请输入手机" v-model.number="phone">
          </div>
          <div class="password">
              <label for="passwordInput">密码: </label>
              <input type="password" id="passwordInput" placeholder="请输入密码" v-model="password">
          </div>
          <p class="others"><span class="registered" @click="registered">注册</span><span class="forget" @click="forget">忘记密码</span></p>
      </div>
      <myButton @click.native="login">登录</myButton>
      <img class="stock" src="http://zzx-1252763483.cosgz.myqcloud.com/img/bg1.jpg">

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
      phone: "",
      password: ""
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    registered() {
      this.$router.push({ path: "/registered" });
    },
    forget() {
      this.$router.push({ path: "/forget" });
    },
    login() {
      new Promise((resolve, reject) => {
        if (!/^1[345789]\d{9}$/.test(this.phone)) {
          reject("请输入11位合法手机号码");
        } else if (!/^\w{6,16}$/.test(this.password)) {
          reject("请输入6至16位数字字母组成的密码");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            method: "post",
            url: "/zzx/api/token",
            data: {
              account: Base64.encode(Base64.encode(this.phone)),
              pw: Base64.encode(Base64.encode(this.password))
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.retcode === 200200) {
                MessageBox.alert("登录成功，点击跳转").then(() => {
                  this.$router.replace({ path: "/enter/main" });
                });
              } else if (res.data.retcode === 20040101) {
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
.user {
  overflow: hidden;
  width: 100%;
  .banner {
    position: normal;
  }
  .inputs {
    width: 530px;
    margin: 550px auto 0 auto;
    .phone {
      line-height: 50px;
      label {
        font-size: 36px;
        color: #ffffff;
      }
      input {
        width:400px;
        height: 50px;
        border: none;
        outline: none;
        float: right;
        // border-bottom: 2px solid #fff;
        border-radius: 10px;
        font-size: 30px;
        line-height: 50px;
        color: rgb(120, 120, 120);
        background-color: #fff;
      }
    }
    .password {
      line-height: 50px;
      margin-top: 40px;
      label {
        font-size: 36px;
        color: #ffffff;
      }
      input {
        float: right;
        border: none;
        outline: none;
         width:400px;
        // border-bottom: 2px solid #fff;
        border-radius: 10px;
        font-size: 30px;
        line-height: 50px;
        color: rgb(120, 120, 120);
        background-color: #ffffff;
      }
    }
    .others {
      margin-top: 30px;
      font-size: 30px;
      color: #fff;
      .registered {
        float: left;
      }
      .forget {
        float: right;
      }
    }
  }
  .myButton {
    width: 200px;
    margin: 200px auto 0 auto;
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
