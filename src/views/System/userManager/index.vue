<template>
  <div class="user-manager">
    <div class="search-form-wrap">
      <el-form
        :inline="true"
        size="mini"
        :model="searchFormModel"
        class="search-form"
      >
        <el-form-item label="账号">
          <el-input
            v-model="searchFormModel.user"
            placeholder="请输入关键字搜索"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
            v-model="searchFormModel.role"
            placeholder="请选择角色"
          >
            <el-option
              v-for="(item, index) in searchFormRoleOpt"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="doSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
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
        > </el-table-column>
        <el-table-column
          prop="UserName"
          label="用户名"
        > </el-table-column>
        <el-table-column
          prop="LoginName"
          label="登录名"
        > </el-table-column>
        <el-table-column label="手机号"> </el-table-column>
        <el-table-column label="邮箱"> </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <!-- <template slot-scope="scope"> -->
          <template>
            <el-button
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="getDataByPage"
        :current-page="pagination.PageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.TotalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { ISearchFormModel } from "./UserManagerDeclare";
import service from "@/request/http";
@Component({
  name: "userManager"
})
export default class userManager extends Vue {
  // data()
  private searchFormModel: ISearchFormModel = {
    user: "",
    role: ""
  };
  private searchFormRoleOpt = [
    {
      id: "1",
      name: "管理员"
    },
    {
      id: "2",
      name: "用户"
    }
  ];
  private tableData = [];
  private pagination = {
    PageIndex: 1,
    PageSize: 10,
    TotalCount: 0
  };

  // methods
  private doSearch() {}
  private getDataByPage(pageIndex: number = 1) {
    service
      .get("http://192.168.3.9:5001/api/v1/Accounts", {
        params: {
          pageSize: this.pagination.PageSize,
          pageIndex
        }
      })
      .then(response => {
        if (response.data.Code === 200) {
          this.pagination.PageIndex = response.data.Result.PageIndex;
          this.pagination.PageSize = response.data.Result.PageSize;
          this.pagination.TotalCount = response.data.Result.TotalCount;
          this.tableData = response.data.Result.Result;
        }
      });
  }
  private sizeChange(pageSize: number) {
    this.pagination.PageSize = pageSize;
    this.getDataByPage();
  }

  // mounted
  mounted() {
    this.getDataByPage();
  }
}
</script>

<style></style>
