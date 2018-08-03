<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"></div>
            <div class="layout-nav">
              <h4 style="color:#fff">苏州悌铭模具程序文件处理系统</h4>
            </div>
          </Menu>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  菜单
                </template>
                <MenuItem name="1-1" :style="{padding: 0,height:'50px',lineHeight:'50px',textIndent:'43px'}">
                  <div v-on:click="changeTit">
                    <router-link to="/glassCutter">钻刀前缀</router-link>
                  </div>
                </MenuItem>
                <MenuItem name="1-2" :style="{padding: 0,height:'50px',lineHeight:'50px',textIndent:'43px'}">
                  <div v-on:click="changeTit">
                    <router-link to="/generalCutter">刀具信息</router-link>
                  </div>
                </MenuItem>
                <MenuItem name="1-3" :style="{padding: 0,height:'50px',lineHeight:'50px',textIndent:'43px'}">
                  <div v-on:click="changeTit">
                    <router-link to="/ncJob">文件处理</router-link>
                  </div>
                </MenuItem>
                <MenuItem name="1-4" :style="{padding: 0,height:'50px',lineHeight:'50px',textIndent:'43px'}">
                  <div v-on:click="changeTit">
                    <router-link to="/record">替换记录</router-link>
                  </div>
                </MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  接口测试
                </template>
                <MenuItem name="2-1" :style="{padding: 0,height:'50px',lineHeight:'50px',textIndent:'43px'}">
                  <div v-on:click="changeTit">
                    <router-link to="/hello">接口测试</router-link>
                  </div>
                </MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
              <BreadcrumbItem>{{navTit.title}}</BreadcrumbItem>
              <BreadcrumbItem>{{navTit.page}}</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
              <router-view/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        title: ["文件处理", "普通刀具库", "特殊刀具库", "接口测试"],
        page: ["文件处理", "普通刀具库", "特殊刀具库", "接口测试"],
        navTit: {
          title: "",
          page: ""
        },
        sendDataOne: "",
        sendDataTwo: ""
      }
    },
    methods: {
      changeTit: function () {
        let url = this.$route.path;
        if (url == '/special') {
          this.navTit.title = this.title[2];
          this.navTit.page = this.page[2];
        } else if (url == '/home') {
          this.navTit.title = this.title[0];
          this.navTit.page = this.page[0];
        } else if (url == '/general') {
          this.navTit.title = this.title[1];
          this.navTit.page = this.page[1];
        } else if (url == '/hello') {
          this.navTit.title = this.title[3];
          this.navTit.page = this.page[3];
        }
      }
    },
    computed: {
      mapState([
        "testUrl"
      ])
    },
    created: function () {
      this.changeTit()
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%
  }

  .layout {
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    /*overflow: hidden;*/
  }

  .ivu-layout {
    height: 100%;
    min-height: 516px;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  a {
    display: block;
  }


</style>
