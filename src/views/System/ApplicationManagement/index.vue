<template>
  <div class="application-management">
    <div v-show="showFlag === ShowFlagType.LIST">
      <div class="search-form-wrap">
        <el-form
          :inline="true"
          size="mini"
          :model="searchFormModel"
          class="search-form"
        >
          <el-form-item label="应用标识">
            <el-input
              v-model="searchFormModel.ClientId"
              placeholder="请输入关键字搜索"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="doSearch"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="function-btns">
        <div class="wrap">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-plus"
            @click="doEdit(false,'新增')"
          >新增</el-button>
        </div>
      </div>
      <div class="data-table">
        <el-table
          :data="tableData"
          border
          size="mini"
          style="width: 100%"
        >
          <el-table-column
            prop="Id"
            label="id"
            min-width="60"
          > </el-table-column>
          <el-table-column
            prop="Code"
            label="编码"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="Name"
            label="名称"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            label="回调地址"
            min-width="200"
          >
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="(item, index) in scope.row.RedirectUris"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            label="刷新令牌过期规则"
            min-width="120"
          >
            <template slot-scope="scope">
              <p>{{parseInt(scope.row.RefreshTokenExpiration) === 1 ? '过期':'不过期'}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="AccessTokenLifetime"
            label="accessToken 过期时间(秒)"
            min-width="170"
          >
          </el-table-column>
          <el-table-column
            prop="AbsoluteRefreshTokenLifetime"
            label="refreshToken 过期时间(秒)"
            min-width="170"
          >
          </el-table-column>
          <el-table-column
            label="允许授权的方式"
            min-width="200"
          >
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="(item, index) in scope.row.AllowedGrantTypes"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            label="允许授权的scope"
            min-width="150"
          >
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="(item, index) in scope.row.AllowedScopes"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            label="允许跨域的origins"
            min-width="200"
          >
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="(item, index) in scope.row.AllowedCorsOrigins"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
            <!-- <template slot-scope="scope"> -->
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
              >查看</el-button>
              <el-button
                type="text"
                size="mini"
                @click="doEdit(scope.row, '编辑')"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :hide-on-single-page="true"
          @size-change="() => {}"
          @current-change="() => {}"
          :current-page="1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        >
        </el-pagination>
      </div>
    </div>
    <addOrEdit
      v-bind="{editForm,addOrEditFormTitle}"
      v-show="showFlag === ShowFlagType.EDIT"
      @close="()=>{showFlag=ShowFlagType.LIST}"
      ref="addOrEdit"
    ></addOrEdit>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import addOrEdit from "./addOrEdit.vue";
import service from "@/request/http";
enum ShowFlagType {
  LIST = 1,
  EDIT
}
@Component({
  name: "applicationManagement",
  components: { addOrEdit }
})
export default class ApplicationManagement extends Vue {
  // data()
  private ShowFlagType = ShowFlagType; // 页面切换时的枚举类型
  private showFlag = ShowFlagType.LIST; // 页面切换的标识
  private editForm = {
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
  };
  private addOrEditFormTitle: string = "编辑"; // 弹窗页的title
  private searchFormModel = {
    // 搜索表单数据模型
    ClientId: ""
  };
  private tableData = []; // 表格列表数据

  // methods
  private doSearch() {}
  private showAddr(RedirectUris: string[]) {}
  private doEdit(row: any, title: string = "编辑") {
    this.showFlag = ShowFlagType.EDIT;
    this.addOrEditFormTitle = title;
    row && (this.editForm = row);
  }

  // mounted
  mounted() {
    service.get("http://192.168.3.9:5001/api/v1/Apps").then(response => {
      if (response.data.Code === 200) {
        this.tableData = response.data.Result;
      }
    });
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding-left: 8px;
}
.function-btns {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
