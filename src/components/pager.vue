<template>
  <div class="myPager">
    <Page :total="pager.totalNum" :current="pager.pageNum" :page-size="pager.pageSize" show-total show-sizer show-elevator
          ref="change" @on-change="handlePage" @on-page-size-change='handlePage'/>
  </div>
</template>

<script>
  export default {
    name: "pager",
    data() {
      return {}
    },
    props: {
      pager: {
        type: Object,
        default: function () {
          return {
            pageNum: 1,
            pageSize: 10,
            totalNum: 0
          }

        }
      },
      fun: {
        type: Function,
        default: function () {
          return this.defaultFun();
        }
      }
    },
    methods: {
      defaultFun() {
        //没有参数时默认执行操作
      },
      //分页改变
      handlePage() {
        this.pager.totalNum = this.$refs.change.total;
        this.pager.pageSize = this.$refs.change.currentPageSize;
        this.pager.pageNum = this.$refs.change.currentPage;
        this.fun();
      }
    }
  }
</script>

<style>

</style>
