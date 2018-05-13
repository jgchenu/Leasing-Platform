<template>
  <div class="editMessage">
      <banner>微信修改</banner>
      <div class="infoMessage">
        <p><span class="wechat">微信: </span><input type="text" v-model="wx	"></p>
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
    this.$axios({
      url: "/zzx/api/user",
      methods: "get"
    })
      .then(res => {
        this.wx = res.data.retdata.userInfo.wx;
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  data() {
    return {
      wx: ""
    };
  },
  components: {
    banner,
    myButton
  },
  methods: {
    toEdit() {
      console.log(123);
    },
    save() {
      new Promise((resolve, reject) => {
        if (!/^[\w_-]{6,20}$/.test(this.wx)) {
          reject("请输入正确的微信号(6-20位的数字字母下划线减号)");
        } else {
          resolve();
        }
      }).then(
        () => {
          this.$axios({
            method: "post",
            url: "/zzx/api/user/edit",
            data: {
              wx: Base64.encode(Base64.encode(this.wx))
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.retcode === 20040308) {
                MessageBox.alert(res.data.retmsg);
              } else if (res.data.retcode === 200200) {
                MessageBox.alert("修改成功").then(() => {
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
.editMessage {
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
    margin-top: 300px;
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
    }
  }
  .myButton {
    display: block;
    margin: 200px auto 0 auto;
  }
}
</style>
