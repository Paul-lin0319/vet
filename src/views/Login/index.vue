<template>
  <div class="login">
    <div class="form-wrap">
      <el-card class="box-card">
        <div slot="header">
          <span>登录</span>
        </div>
        <el-form
          size="mini"
          :label-position="labelPosition"
          label-width="80px"
          :model="loginFormModel"
          :rules="loginFormRules"
          @submit.stop.prevent="() => {}"
        >
          <el-form-item label="用户名:" prop="account">
            <el-input type="text" v-model="loginFormModel.account"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              type="password"
              v-model="loginFormModel.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="verification">
            <el-input
              type="text"
              v-model="loginFormModel.verification"
            ></el-input>
            <aliyun-capcha
              appkey="aliyun 滑动验证提供的key"
              scene="场景"
              v-on:callback="onCaptcha"
            ></aliyun-capcha>
          </el-form-item>
        </el-form>
        <div class="login-form-bottom">
          <el-button @click="doLogin">登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AliyunCaptcha } from 'vue-aliyun-captcha';

@Component({
  name: 'login',
  components: {
    AliyunCaptcha
  }
})
export default class login extends Vue {
  private labelPosition = 'right';
  private loginFormModel = {
    account: '',
    password: '',
    verification: ''
  };
  private loginFormRules = {};
  onCaptcha() {}
  doLogin() {
    localStorage.setItem('userId', '1');
    this.$router.push('/home');
  }
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: #eee;
  @extend %flex-all-center;
  .form-wrap {
  }
}
</style>
