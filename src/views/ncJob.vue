<template>
  <div class="ncJob">
    <div class="search">
      <label style="padding:5px 0">
        <span><strong>*</strong>输入目录: </span>
        <Input v-model="param.input" placeholder="输入目录" style="width: 500px" clearable/>
      </label><br/>
      <label style="padding:5px 0">
        <span><strong>*</strong>输出目录: </span>
        <Input v-model="param.output" placeholder="输出目录" style="width: 500px" clearable/>
      </label><br/>
      <label style="padding:5px 0">
        <span>处理结果: </span>
        <p>{{res}}</p>
      </label><br/>
    </div>
    <Button type="success" icon="ios-trash-outline" @click="clearModel"> 清空</Button>
    <Button type="primary" icon="ios-hammer" @click="postData" v-bind:disabled="btnDis"> 确定</Button>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "ncJob",
    data() {
      return {
        param: {
          input: "",
          output: ""
        },
        res: "",
        btnDis: false
      }
    },
    computed: {
      ...mapState([
        "testUrl"
      ])
    },
    methods: {
      postData() {
        if (this.param.input == "") {
          this.$Message.info('输入目录不能为空');
          return false
        }
        if (this.param.output == "") {
          this.$Message.info('输出目录不能为空');
          return false
        }
        this.btnDis = true;
        this.$http.post(this.testUrl.url + "/job/ncJob",
          this.param)
          .then(function (res) {
            if (res.body.success == 1) {
              this.res = res.body.data;
            } else {
              this.res = "处理失败"
            }
            this.btnDis = false;
          },function () {
            this.res = "处理失败";
            this.btnDis = false;
          })
      },
      clearModel() {
        this.param.input = "";
        this.param.output = "";
        this.res = "";
      }
    },
    created: function () {

    }
  }
</script>

<style>
  .search label {
    line-height: 40px;
    display: inline-block;
    vertical-align: top;
  }

  .search label strong {
    color: red;
    line-height: 40px;
  }

  .search label p {
    display: inline-block;
    line-height: 24px;
    font-size: 14px;
  }

  .ivu-btn {
    font-size: 14px;
  }

  .ivu-btn .ivu-icon {
    font-size: 16px;
  }
</style>
