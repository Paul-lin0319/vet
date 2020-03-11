<template>
  <div class="platform-management">
    <div>
      <div class="search-form-wrap">
        <el-form
          :inline="true"
          size="mini"
          :model="searchFormModel"
          class="search-form"
          @submit.native.prevent
        >
          <el-form-item label="类型：">
            <el-select
              v-model="searchFormModel.type"
              placeholder="请选择"
              clearable
            >
              <el-option
                label="平台"
                value="0"
              >
              </el-option>
              <el-option
                label="账户"
                value="10"
              >
              </el-option>
              <el-option
                label="站点"
                value="20"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input
              v-model="searchFormModel.keyword"
              :placeholder="searchFormModel.type === ''?'请先选择类型':'请输入类型对应的关键字'"
              :disabled="searchFormModel.type === ''"
              clearable
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
      <div class="data-table">
        <el-table
          :data="tableData"
          border
          size="mini"
          style="width: 100%"
        >
          <el-table-column
            label="序号"
            type="index"
            :index="indexMethod"
          >
          </el-table-column>
          <el-table-column
            prop="Name"
            label="平台名称"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            label="相关站点"
            min-width="120"
          >
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="(item, index) in scope.row.Sites"
                  :key="index"
                >
                  <div>{{ '站点名：'+item.Name }}<br>{{ '站点备注：'+item.Remark }}</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            label="相关平台账号"
            min-width="120"
          >
            <template slot-scope="scope">
              <ul>
                <li
                  v-for="(item, index) in scope.row.PlatformAccounts"
                  :key="index"
                >
                  <div>{{ '账号名：'+item.Name }}<br>{{ '备注：'+item.Remark }}</div>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column
            prop="Remark"
            label="备注"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          :hide-on-single-page="tableSeting.hideOnSinglePage"
          @size-change="doSizeChange"
          @current-change="doCurChange"
          :current-page="tableSeting.currentPage"
          :page-sizes="tableSeting.pageSizesArr"
          :page-size="tableSeting.pageSize"
          :layout="tableSeting.layout"
          :total="tableSeting.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import service from "@/request/http";

// 接口
interface ITableSeting {
  hideOnSinglePage: boolean;
  currentPage: number;
  pageSizesArr: Array<number>;
  pageSize: number;
  layout: string;
  total: number;
}

@Component({
  name: "applicationManagement",
  components: {}
})
export default class ApplicationManagement extends Vue {
  // data()
  private searchFormModel = {
    // 搜索表单数据模型
    type: "",
    keyword: ""
  };
  private tableSeting: ITableSeting = {
    hideOnSinglePage: true,
    currentPage: 1,
    pageSizesArr: [10, 20, 50, 100],
    pageSize: 20,
    layout: "total, sizes, prev, pager, next, jumper",
    total: 0
  };
  private allTableData = []; // 缓存所有表格数据
  private tableData = []; // 表格列表数据

  // methods
  private doSearch() {
    service
      .get("/basedata/api/v1/Platforms", { params: this.searchFormModel })
      .then(response => {
        if (response.data.Code === 200) {
          this.allTableData = response.data.Result;
          this.tableSeting.total = this.allTableData.length;
          this.doPaginationChange(1);
        }
      });
  }
  private doPaginationChange(curPage: number) {
    const pageSize = this.tableSeting.pageSize;
    this.tableData = this.allTableData.slice(
      (curPage - 1) * this.tableSeting.pageSize,
      curPage * this.tableSeting.pageSize
    );
  }
  private doSizeChange(pageSize: number) {
    this.tableSeting.pageSize = pageSize;
    this.doPaginationChange(this.tableSeting.currentPage);
  }
  private doCurChange(curPage: number) {
    this.tableSeting.currentPage = curPage;
    this.doPaginationChange(curPage);
  }
  private indexMethod(index: number) {
    let newIndex =
      (this.tableSeting.currentPage - 1) * this.tableSeting.pageSize +
      index +
      1;
    return newIndex;
  }

  // mounted
  mounted() {
    this.doSearch();
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
