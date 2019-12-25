<template>
  <div class="application-management">
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
          <el-button type="primary" @click="doSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-table">
      <el-table :data="tableData" border size="mini" style="width: 100%">
        <el-table-column prop="ClientId" label="应用标识"> </el-table-column>
        <el-table-column
          prop="AbsoluteRefreshTokenLifetime"
          label="令牌刷新间隔(秒)"
        >
        </el-table-column>
        <el-table-column prop="AccessTokenLifetime" label="令牌有效期(秒)">
        </el-table-column>
        <el-table-column label="回调地址">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.RedirectUris"
              placement="left"
              trigger="click"
            >
              <ul>
                <li
                  v-for="(item, index) in scope.row.RedirectUris"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
              <el-button
                slot="reference"
                @click="showAddr(scope.row.RedirectUris)"
                type="text"
                size="small"
                >{{ `共有${scope.row.RedirectUris.length}个` }}
              </el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <!-- <template slot-scope="scope"> -->
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
@Component({
  name: 'applicationManagement'
})
export default class ApplicationManagement extends Vue {
  // data()
  private searchFormModel = {
    ClientId: ''
  };
  private tableData = [
    {
      ClientId: 'app1',
      AbsoluteRefreshTokenLifetime: 30,
      AccessTokenLifetime: 30,
      RedirectUris: ['地址1', '地址2', '地址3', '地址4']
    },
    {
      ClientId: 'app2',
      AbsoluteRefreshTokenLifetime: 30,
      AccessTokenLifetime: 30,
      RedirectUris: ['地址1', '地址2', '地址3', '地址4']
    },
    {
      ClientId: 'app3',
      AbsoluteRefreshTokenLifetime: 30,
      AccessTokenLifetime: 30,
      RedirectUris: ['地址1', '地址2', '地址3', '地址4']
    },
    {
      ClientId: 'app4',
      AbsoluteRefreshTokenLifetime: 30,
      AccessTokenLifetime: 30,
      RedirectUris: ['地址1', '地址2', '地址3', '地址4']
    }
  ];

  // methods
  private doSearch() {}
  private showAddr(RedirectUris: string[]) {}
}
</script>

<style></style>
