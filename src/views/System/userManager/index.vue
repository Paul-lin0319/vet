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
          <el-select v-model="searchFormModel.role" placeholder="请选择角色">
            <el-option
              v-for="(item, index) in searchFormRoleOpt"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="data-table">
      <el-table :data="tableData" border size="mini" style="width: 100%">
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="user" label="账号"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <!-- <template slot-scope="scope"> -->
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { ISearchFormModel } from './declare';
@Component({
  name: 'userManager'
})
export default class userManager extends Vue {
  // data()
  private searchFormModel: ISearchFormModel = {
    user: '',
    role: ''
  };
  private searchFormRoleOpt = [
    {
      id: '1',
      name: '管理员'
    },
    {
      id: '2',
      name: '用户'
    }
  ];
  private tableData = [
    {
      id: '1',
      user: '11111',
      role: '管理员'
    },
    {
      id: '2',
      user: '22222',
      role: '用户'
    }
  ];

  // methods
  private doSearch() {}
}
</script>

<style></style>
