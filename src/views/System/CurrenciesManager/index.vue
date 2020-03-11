<template>
  <div class="currencies-manager">
    <div>
      <!-- <div class="search-form-wrap">
        <el-form
          :inline="true"
          size="mini"
          :model="searchFormModel"
          class="search-form"
          @submit.native.prevent
        >
          <el-form-item label="国家：">
            <el-input
              v-model="searchFormModel.keyword"
              placeholder="二字码、国家名字(用,分开)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="doSearch"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div> -->
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
            prop="Code"
            label="货币编码"
          >
          </el-table-column>
          <el-table-column
            prop="NameCN"
            label="中文货币名"
            min-width="100"
          >
          </el-table-column>
          <el-table-column
            prop="NameEN"
            label="英文货币名"
            min-width="120"
          >
          </el-table-column>
          <el-table-column
            prop="Symbol"
            label="货币符号"
          >
          </el-table-column>
          <el-table-column
            prop="DecimalCount"
            label="小数点位数"
          >
          </el-table-column>
          <el-table-column
            prop="Rate"
            label="汇率"
          >
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
  // private searchFormModel = {
  //   // 搜索表单数据模型
  //   keyword: ""
  // };
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
    service.get("/basedata/api/v1/Basic/currencies").then(response => {
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
