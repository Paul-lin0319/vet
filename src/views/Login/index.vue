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
          </el-form-item>
        </el-form>
        <div class="login-form-bottom">
          <el-button
            @click="
              () => {
                verificationCodeShow = true;
              }
            "
            >登录</el-button
          >
        </div>
      </el-card>
    </div>
    <el-dialog title="验证" :visible.sync="verificationCodeShow" width="350px">
      <SliderVerificationCode
        @success="doLogin"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="verificationCodeText"
      ></SliderVerificationCode>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SliderVerificationCode from '@/components/SliderVerificationCode/slide-verify.vue';

@Component({
  name: 'login',
  components: {
    SliderVerificationCode
  }
})
export default class login extends Vue {
  private labelPosition: string = 'right';
  private loginFormModel = {
    account: '',
    password: '',
    verification: ''
  };
  private verificationCodeShow: boolean = false;
  private verificationCodeText: string = '请滑动滑块校验';
  private verificationCodeImgs: [] = [];
  private loginFormRules = {};
  private onCaptcha() {}
  private doLogin() {
    localStorage.setItem('userId', '1');
    this.$router.push('/home');
  }
  private onFail() {
    this.verificationCodeText = '请重新滑动滑块校验';
  }
  private onRefresh() {
    this.verificationCodeText = '请滑动滑块校验';
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
    position: relative;
  }
}
</style>
