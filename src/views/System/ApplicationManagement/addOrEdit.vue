<template>
  <div class="add-or-edit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item><a
          class="breadcrumb-link"
          href="javascript:;"
          @click="backToList"
        >应用管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form-wrap">
      <el-form
        :label-position="'right'"
        label-width="100px"
        :model="editForm"
        size="mini"
        class="edit-form"
        ref="editForm"
      >
        <el-form-item
          label="id"
          hidden
        >
          <el-input v-model="editForm.Id"></el-input>
        </el-form-item>
        <el-form-item
          prop="Code"
          label="编码"
        >
          <el-input v-model="editForm.Code"></el-input>
        </el-form-item>
        <el-form-item
          prop="Name"
          label="名称"
        >
          <el-input v-model="editForm.Name"></el-input>
        </el-form-item>
        <el-form-item
          :label="`回调地址${index+1}`"
          v-for="(redirectUri, index) in editForm.RedirectUris"
          :key="`redirectUri${index}`"
          :prop="`RedirectUris.${index}`"
          :rules="[{
            pattern:/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/, message: '请输入正确的地址', trigger: ['blur', 'change'] 
          }]"
        >
          <el-input v-model="editForm.RedirectUris[index]"></el-input>
          <el-button
            v-if="index === 0"
            type="success"
            icon="el-icon-plus"
            @click="addInputLine(editForm.RedirectUris)"
            circle
          ></el-button>
          <el-button
            v-if="editForm.RedirectUris.length > 1"
            type="danger"
            icon="el-icon-delete"
            @click="delInputLine(editForm.RedirectUris, index)"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item
          prop="RefreshTokenExpiration"
          label="令牌过期规则"
        >
          <el-radio-group v-model="editForm.RefreshTokenExpiration">
            <el-radio :label="0">不过期</el-radio>
            <el-radio :label="1">过期</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="parseInt(editForm.RefreshTokenExpiration) === 1">
          <div>
            <el-form-item
              prop="AccessTokenLifetime"
              label="accessToken 过期时间(秒)"
            >
              <el-input v-model="editForm.AccessTokenLifetime"></el-input>
            </el-form-item>
            <el-form-item
              prop="AbsoluteRefreshTokenLifetime"
              label="refreshToken 过期时间(秒)"
            >
              <el-input v-model="editForm.AbsoluteRefreshTokenLifetime"></el-input>
            </el-form-item>
          </div>
        </template>
        <el-form-item
          prop="AllowedGrantTypes"
          label="允许授权的方式"
        >
          <el-checkbox-group v-model="editForm.AllowedGrantTypes">
            <el-checkbox :label="0">scope1</el-checkbox>
            <el-checkbox :label="1">scope2</el-checkbox>
            <el-checkbox :label="2">scope3</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          prop="AllowedScopes"
          label="允许授权的scope"
        >
          <el-checkbox-group v-model="editForm.AllowedScopes">
            <el-checkbox :label="0">scope1</el-checkbox>
            <el-checkbox :label="1">scope2</el-checkbox>
            <el-checkbox :label="2">scope3</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          :label="`允许跨域的origins ${index+1}`"
          v-for="(allowedCorsOrigins, index) in editForm.AllowedCorsOrigins"
          :prop="`AllowedCorsOrigins.${index}`"
          :rules="[{
            pattern:/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/, message: '请输入正确的地址', trigger: ['blur', 'change'] 
          }]"
          :key="`allowedCorsOrigins${index}`"
        >
          <el-input v-model="editForm.AllowedCorsOrigins[index]"></el-input>
          <el-button
            v-if="index === 0"
            type="success"
            icon="el-icon-plus"
            @click="addInputLine(editForm.AllowedCorsOrigins)"
            circle
          ></el-button>
          <el-button
            v-if="editForm.AllowedCorsOrigins.length > 1"
            type="danger"
            icon="el-icon-delete"
            @click="delInputLine(editForm.AllowedCorsOrigins, index)"
            circle
          ></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button @click="backToList()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import service from "@/request/http";
@Component
export default class ApplicationManagement extends Vue {
  // prop
  @Prop({
    type: Object,
    default: {
      Id: "", // id
      Code: "", // 编码
      Name: "", // 名称
      RedirectUris: [""], // 回调地址
      RefreshTokenExpiration: 0, // 刷新令牌过期规则
      AccessTokenLifetime: 0, // accessToken 过期时间(秒)
      AbsoluteRefreshTokenLifetime: 0, // refreshToken 过期时间(秒)
      AllowedGrantTypes: [], // 允许授权的方式
      AllowedScopes: [], // 允许授权的scope
      AllowedCorsOrigins: [""] // 允许跨域的origins
    }
  })
  private editForm!: object;
  @Prop({
    type: String,
    default: "编辑"
  })
  private title!: string;

  // method
  private addInputLine(list: string[]) {
    list.push("");
  }
  private delInputLine(list: string[], idx: number) {
    list.splice(idx, 1);
  }
  public resetFrom() {
    (this.$refs.editForm as any).resetFields();
    (this.editForm as any).RedirectUris = [""];
    (this.editForm as any).AllowedCorsOrigins = [""];
  }
  private backToList() {
    this.$confirm("表单操作未保存,是否确定离开?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.close();
      })
      .catch(() => {});
  }
  private close() {
    this.resetFrom();
    this.$emit("close");
  }
}
</script>

<style lang="scss" scoped>
.add-or-edit {
  .breadcrumb-link {
    cursor: pointer;
  }
  .edit-form {
    margin-top: 20px;
    .el-input {
      margin-right: 10px;
      width: 270px;
    }
  }
}
</style>