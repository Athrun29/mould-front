<template>
  <div class="generalCutter">
    <Button @click="handleSelectAll(true)">全选</Button>
    <Button @click="handleSelectAll(false)">全不选</Button>
    <Table border ref="selection" height="300" :columns="tableHead" :data="tableBody"></Table>

    <Page :total="pager.total" :current="pager.page" :page-size="pager.pageSize" show-total show-sizer show-elevator
     ref="change" @on-change="handlePage"  @on-page-size-change='handlePage'/>
  </div>
</template>

<script>
  export default {
    name: "generalCutter",
    data() {
      return {
        reqPager : {
          pager: {
            pageNum: 1, 
            pageSize: 20, 
            totalNum: 0
          }, 
          queryModel: {
            code: '', 
            name: ''
          }
        },
        tableHead: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '直径',
            key: 'dia'
          },
          {
            title: '半径',
            key: 'rad'
          },
          {
            title: '长度',
            key: 'len'
          }
        ],
        tableBody: [
        ]
      }
    },
    methods: {
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
      },
      handlePage() {
        this.pager.total = this.$refs.change.total;
        this.pager.pageSize = this.$refs.change.currentPageSize;
        this.pager.page = this.$refs.change.currentPage;
        console.log(this.pager)
      }
    },
    computed: {
    }
  }
</script>

<style>

</style>
