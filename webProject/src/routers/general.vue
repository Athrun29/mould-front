<template>
  <div class="general">
    <Button @click="handleSelectAll(true)">全选</Button>
    <Button @click="handleSelectAll(false)">全不选</Button>
    <Table border ref="selection" height="300" :columns="tableHead" :data="tableBody"></Table>

    <Page :total="pager.total" :current="pager.page" :page-size="pager.pageSize" show-total show-sizer show-elevator
     ref="change" @on-change="handlePage"  @on-page-size-change='handlePage'/>
  </div>
</template>

<script>
  export default {
    name: "general",
    data() {
      return {
        pager: {
          total: 100,
          pageSize: 20,
          page: 1
        },
        tableHead: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'Name',
            key: 'name'
          },
          {
            title: 'Age',
            key: 'age'
          },
          {
            title: 'Address',
            key: 'address'
          }
        ],
        tableBody: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          },
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park',
            date: '2016-10-01'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park',
            date: '2016-10-02'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04'
          }
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
