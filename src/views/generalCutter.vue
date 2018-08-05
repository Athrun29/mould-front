<template>
  <div class="generalCutter">
    <div class="search">
      <label>
        <span>编号: </span>
        <Input v-model="queryModel.code" placeholder="编号" style="width: 200px" clearable/>
      </label>
      <label>
        <span>名称: </span>
        <Input v-model="queryModel.name" placeholder="名称" style="width: 200px" clearable/>
      </label>
      <Button type="primary" icon="ios-search" style="margin-left: 70px" @click="postData">查询</Button>

    </div>

    <div style="padding-bottom: 15px;">
      <Button type="success" icon="md-add" @click="clearModel"> 新增</Button>
      <Button type="error" icon="ios-trash-outline" @click="delData">删除</Button>
    </div>

    <div class="table">
      <Table border ref="selection" :columns="tableHead" :data="tableBody" @on-selection-change="handleSelected"></Table>
    </div>

    <div style="padding-top:10px">
      <Page :total="pager.totalNum" :current="pager.pageNum" :page-size="pager.pageSize" show-total show-sizer show-elevator
            ref="change" @on-change="handlePage" @on-page-size-change='handlePage'/>
    </div>

    <Modal
      v-model="modal"
      title="数据编辑/新增"
      @on-ok="add"
      @on-cancel="cancel">
      <div class="search" style="text-align: center">
        <label style="padding:5px 0">
          <span>编号: </span>
          <Input v-model="addModel.code" placeholder="编号" style="width: 300px" clearable/>
        </label><br/>
        <label style="padding:5px 0">
          <span>名称: </span>
          <Input v-model="addModel.name" placeholder="名称" style="width: 300px" clearable/>
        </label><br/>
        <label style="padding:5px 0">
          <span>直径: </span>
          <Input v-model="addModel.dia" placeholder="直径" style="width: 300px" clearable/>
        </label><br/>
        <label style="padding:5px 0">
          <span>半径: </span>
          <Input v-model="addModel.rad" placeholder="半径" style="width: 300px" clearable/>
        </label><br/>
        <label style="padding:5px 0">
          <span>长度: </span>
          <Input v-model="addModel.len" placeholder="长度" style="width: 300px" clearable/>
        </label><br/>
        <label style="padding:5px 0">
          <span>备注: </span>
          <Input v-model="addModel.remark" placeholder="备注" style="width: 300px" clearable/>
        </label>
      </div>
    </Modal>
  </div>
</template>

<script>

  import {mapState} from 'vuex'

  export default {
    name: "glassCutter",
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
            title: '编号',
            key: 'code'
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
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        tableBody: [],
        queryModel: {
          code: "",
          name: ""
        },
        selected: [],
        addModel: {
          id: null,
          code: '',
          name: '',
          dia: '',
          rad: '',
          len: '',
          remark: ''
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
        this.$http.post(this.testUrl.url + "/cutter/list",
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
              this.addModel.code = res.body.data.code;
              this.addModel.name = res.body.data.name;
              this.addModel.dia = res.body.data.dia;
              this.addModel.rad = res.body.data.rad;
              this.addModel.len = res.body.data.len;
              this.addModel.remark = res.body.data.remark;
            } else {
              alert(res.body.msg)
            }
          })

      },
      clearModel() {
        this.addModel.id = null;
        this.addModel.code = '';
        this.addModel.name = '';
        this.addModel.dia = '';
        this.addModel.rad = '';
        this.addModel.len = '';
        this.addModel.remark = '';
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
