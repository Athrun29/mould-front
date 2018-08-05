<template>
  <div class="record">
    <div class="search">
      <label>
        <span>原名称: </span>
        <Input v-model="queryModel.srcName" placeholder="原名称" style="width: 200px" clearable/>
      </label>
      <label>
        <span>新名称: </span>
        <Input v-model="queryModel.tarName" placeholder="新名称" style="width: 200px" clearable/>
      </label>
      <Button type="primary" icon="ios-search" style="margin-left: 70px" @click="postData">查询</Button>

    </div>

    <!--<div style="padding-bottom: 15px;">-->
      <!--<Button type="success" icon="md-add" @click="clearModel"> 新增</Button>-->
      <!--<Button type="error" icon="ios-trash-outline" @click="delData">删除</Button>-->
    <!--</div>-->

    <div class="table">
      <Table border ref="selection" :columns="tableHead" :data="tableBody" :width="1373"  @on-selection-change="handleSelected"></Table>
    </div>

    <div style="padding-top:10px">
      <Page :total="pager.totalNum" :current="pager.pageNum" :page-size="pager.pageSize" show-total show-sizer show-elevator
            ref="change" @on-change="handlePage" @on-page-size-change='handlePage'/>
    </div>

    <!--<Modal-->
      <!--v-model="modal"-->
      <!--title="数据查看"-->
      <!--@on-ok="add"-->
      <!--@on-cancel="cancel">-->
      <!--<div class="search" style="text-align: center">-->
        <!--<label style="padding:5px 0">-->
          <!--<span>编号: </span>-->
          <!--<Input v-model="addModel.code" placeholder="编号" style="width: 300px" disabled/>-->
        <!--</label><br/>-->
        <!--<label style="padding:5px 0">-->
          <!--<span>名称: </span>-->
          <!--<Input v-model="addModel.name" placeholder="名称" style="width: 300px" disabled/>-->
        <!--</label><br/>-->
        <!--<label style="padding:5px 0">-->
          <!--<span>直径: </span>-->
          <!--<Input v-model="addModel.dia" placeholder="直径" style="width: 300px" disabled/>-->
        <!--</label><br/>-->
        <!--<label style="padding:5px 0">-->
          <!--<span>半径: </span>-->
          <!--<Input v-model="addModel.rad" placeholder="半径" style="width: 300px" disabled/>-->
        <!--</label><br/>-->
        <!--<label style="padding:5px 0">-->
          <!--<span>长度: </span>-->
          <!--<Input v-model="addModel.len" placeholder="长度" style="width: 300px" disabled/>-->
        <!--</label><br/>-->
        <!--<label style="padding:5px 0">-->
          <!--<span>备注: </span>-->
          <!--<Input v-model="addModel.remark" placeholder="备注" style="width: 300px" disabled/>-->
        <!--</label>-->
      <!--</div>-->
    <!--</Modal>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "record",
    data() {
      return {
        modal: false,
        pager: {
          pageNum: 1,
          pageSize: 10,
          totalNum: 0
        },
        tableHead: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '原名称',
            key: 'srcName',
            width: 200
          },
          {
            title: '原直径',
            key: 'srcDia',
            width: 100
          },
          {
            title: '原半径',
            key: 'srcRad',
            width: 100
          },
          {
            title: '原长度',
            key: 'srcLen',
            width: 100
          },
          {
            title: '新名称',
            key: 'tarName',
            width: 200
          },
          {
            title: '新直径',
            key: 'tarDia',
            width: 100
          },
          {
            title: '新半径',
            key: 'tarRad',
            width: 100
          },
          {
            title: '新长度',
            key: 'tarLen',
            width: 100
          },
          {
            title: '备注',
            key: 'remark',
            width: 150
          },
          {
            title: '创建时间',
            key: 'createTimeStr',
            width: 160
          }
          // {
          //   title: '操作',
          //   key: 'action',
          //   width: 150,
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'success',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px'
          //         },
          //         on: {
          //           click: () => {
          //             this.edit(params.index)
          //           }
          //         }
          //       }, '查看')
          //     ]);
          //   }
          // }
        ],
        tableBody: [],
        queryModel: {
          srcName: "",
          tarName: ""
        },
        selected: [],
        addModel: {
          id: null,
          srcName: '',
          srcDia: '',
          srcRad: '',
          srcLen: '',
          tarName: '',
          tarDia: '',
          tarRad: '',
          tarLen: '',
          remark: '',
          createTimeStr:""
        }
      }
    },
    computed: {
      ...mapState([
        "testUrl"
      ])
    },
    methods: {
      //获取表格数据
      postData() {
        this.$http.post(this.testUrl.url + "/record/list",
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
      //全选
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
      },
      handleSelected(selection, row) {
        this.selected = [];
        for (var i = 0; i < selection.length; i++) {
          this.selected.push(selection[i].id)
        }
      },
      //分页改变
      handlePage() {
        this.pager.total = this.$refs.change.total;
        this.pager.pageSize = this.$refs.change.currentPageSize;
        this.pager.page = this.$refs.change.currentPage;
        this.postData();
      },
      // 表格操作

      //删除
      delData() {
        if (this.selected.length == 0) {
          this.$Message.info('请至少选择一条数据');
          return false
        }
        this.$http.post(this.testUrl.url + "/cutter/del",
          this.selected)
          .then(function (res) {
            if (res.body.success == 1) {
              this.$Message.info('删除成功');
              this.postData();
            } else {
              alert(res.body.msg)
            }
          })
      },
      remove(index) {
        this.selected = [];
        this.selected.push(this.tableBody[index].id);
        this.delData();
      },
      edit(index) {
        this.clearModel();
        this.$http.get(this.testUrl.url + "/cutter/get/"+encodeURI(this.tableBody[index].id))
          .then(function (res) {
            if (res.body.success == 1) {
              this.addModel.id = res.body.data.id;
              this.addModel.srcName = res.body.data.srcName;
              this.addModel.srcDia = res.body.data.srcDia;
              this.addModel.srcRad = res.body.data.srcRad;
              this.addModel.srcLen = res.body.data.srcLen;
              this.addModel.tarName = res.body.data.tarName;
              this.addModel.tarDia = res.body.data.tarDia;
              this.addModel.tarRad = res.body.data.tarRad;
              this.addModel.tarLen = res.body.data.tarLen;
              this.addModel.remark = res.body.data.remark;
              this.addModel.createTimeStr = res.body.data.createTimeStr;
            } else {
              alert(res.body.msg)
            }
          })

      },
      clearModel() {
        this.addModel.id = null;
        this.addModel.srcName = '';
        this.addModel.srcDia = '';
        this.addModel.srcRad = '';
        this.addModel.srcLen = '';
        this.addModel.tarName = '';
        this.addModel.tarDia = '';
        this.addModel.tarRad = '';
        this.addModel.tarLen = '';
        this.addModel.remark = '';
        this.addModel.createTimeStr = '';
        this.modal = true;
      },
      //  模态框
      add() {
        // this.$Message.info('Clicked ok');
        if (!this.addModel.code) {
          this.$Message.info('编号不能为空');
          return false
        }
        this.$http.post(this.testUrl.url + "/cutter/save",
          this.addModel)
          .then(function (res) {
            if (res.body.success == 1) {
              this.$Message.info('编辑成功');
              this.postData();
            } else {
              alert(res.body.msg)
            }
          })
      },
      cancel() {
        // this.
        // this.$Message.info('Clicked cancel');
      }
    },
    created: function () {
      this.postData();
    }
  }
</script>

<style>
  .search {
    padding-bottom: 15px
  }

  .search label {
    display: inline-block;
  }

  .search label span {
    display: inline-block;
    width: 100px;
    padding-right: 8px;
    text-align: right;
    font-size: 16px;
  }

  .ivu-btn {
    font-size: 14px;
  }

  .ivu-btn .ivu-icon {
    font-size: 16px;
  }

  td {
    white-space: nowrap;
  }

  .table {
    width: 100%;
    overflow: auto;
  }
</style>
