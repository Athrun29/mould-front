<template>
  <div class="searchInput">
    <Input style="width: 200px" clearable/>
    <div>
      <Table border :columns="tableHead" :data="tableBody" @on-row-dblclick="dbClickTable"></Table>
    </div>
    <div>
      <Page :total="pager.totalNum" :current="pager.pageNum" :page-size="pager.pageSize" show-total size="small" show-sizer
            ref="change" @on-change="handlePage" @on-page-size-change='handlePage'/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'searchInput',
    data() {
      return {
        pager: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 99999
        },
        tableBody: [
          {
            code: "1",
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            code: "2",
            name: ' Brown',
            age: 30,
            address: 'New York ',
            date: '2016-10-03'
          },
        ]
      }
    },
    props: {
      tableHead: {
        type: Array,
        default: function () {
          return [
            {
              title: "编号",
              key: "code"
            },
            {
              title: "名称",
              key: "name"
            }
          ]
        }
      },
      queryModel: {
        type: Object,
        default: function () {
          return {
            code: "",
            name: ""
          }
        }

      },
      searchUrl: {
        type: String,
        default: ""
      }

    },
    methods: {
      searchModel() {
        this.$http.post(this.searchUrl,
          {
            pager: this.pager,
            queryModel: this.queryModel
          })
          .then(function (res) {
            if (res.body.success == 1) {
              this.tableBody = res.body.data.datas;
              this.pager = res.body.data.pager;
              // alert("获取成功");
            } else {
              alert(res.body.msg)
            }
          })
      },
      handlePage() {
        this.pager.totalNum = this.$refs.change.total;
        this.pager.pageSize = this.$refs.change.currentPageSize;
        this.pager.pageNum = this.$refs.change.currentPage;
        this.searchModel();
      },
    //  选中数据
      dbClickTable(index){
        console.log(index)
      }
    },
    components: {}
  }
</script>

<style>
  .searchInput {
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
</style>
