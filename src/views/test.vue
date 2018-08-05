<template>
  <div>
    <div>
      <search-input :table-head="tableHead"></search-input>
    </div>
    <div>
      <!--<my-pager :pager="pager" :fun="testFun"></my-pager>-->
    </div>
  </div>

</template>

<script>
  import myPager from "../components/pager"
  import searchInput from "../components/searchInput"

  export default {
    name: 'test',
    data() {
      return {
        pager: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 100
        },
        tableHead: [
          {
            title: "编号",
            key: "code"
          },
          {
            title: "名称",
            key: "name"
          },
          {
            title: "年龄",
            key: "age"
          }
        ]
      }
    },
    methods: {
      testFun() {
        console.log(1111)
      }
    },
    components: {
      myPager,
      searchInput
    }
  }
</script>

<style>

</style>
