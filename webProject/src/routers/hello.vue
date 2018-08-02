<template>
  <div>
    <input type="text" v-model="dataOne" v-on:keydown.enter="postData"><br/>
    <input type="text" v-model="dataTwo" v-on:keydown.enter="postData"><br/>
    <button v-on:click="postData">postOne</button>
    <button v-on:click="postDataTwo">postTwo</button>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "hello",
    data() {
      return {
        dataOne: "",
        dataTwo: ""
      }
    },
    computed: {
      ...mapState([
        "testUrl"
      ])
    },
    methods: {
      postData() {
        this.$http.post("app/test/home",
          {inputPath: this.dataOne, outputPath: this.dataTwo})
          .then(function (res) {
            if (res.success == 1) {
              this.dataTwo = res.msg
              alert("获取成功");
            } else {
              alert("获取失败")
            }
          })
      },
      postDataTwo() {
        this.$http.post("app/jobExecute/ncJob",
          {inputPath: this.dataOne, outputPath: this.dataTwo})
          .then(function (res) {
            if (res.success == 1) {
              this.dataTwo = res.msg
              alert("获取成功");
            } else {
              alert("获取失败")
            }
          })
      }

    }
  }
</script>

<style>

</style>
